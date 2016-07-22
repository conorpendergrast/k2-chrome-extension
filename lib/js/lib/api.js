'use strict';

let $ = require('jquery');
let _ = require('underscore');
let moment = require('moment');
let prefs = require('./prefs');
let baseUrl = 'https://api.github.com';

/**
 * Get all the pull requests where the current user is either assigned
 * or the author
 *
 * @author Tim Golen <tim@golen.net>
 *
 * @date 2015-06-07
 * @private
 *
 * @param {string} type 'assignee' or 'author'
 * @param {Function} cb [description]
 */
function getPullsByType(type, cb) {
  let query = '?q=';
  let currentUser = $('.header-nav-link.name img').attr('alt').replace('@', '');
  let url;

  // Get the PRs assigned to me
  query += '+state:open';
  query += '+is:pr';
  query += '+user:expensify';
  // query += '+repo:expensify/expensify';
  query += '+' + type + ':' + currentUser;

  query += '&sort=updated';

  url = baseUrl + '/search/issues' + query;

  prefs.get('ghPassword', function(ghPassword) {
    $.ajax({
      url: url,
      headers: {
        Authorization: 'Basic ' + btoa(currentUser + ':' + ghPassword)
      }
    })
    .done(function(data) {
      var done;
      if (!data.items || !data.items.length) {
        return cb(null, []);
      }

      done = _.after(data.items.length, function() {
        cb(null, data.items);
      });

      // Get the detailed PR info for each PR
      _.each(data.items, function(item) {
        var repoArray = item.repository_url.split('/');
        var repo = repoArray[repoArray.length - 2];
        var owner = repoArray[repoArray.length - 1];
        var url2 = baseUrl + '/repos/' + repo + '/' + owner + '/pulls/' + item.number;
        $.ajax({
          url: url2,
          headers: {
            Authorization: 'Basic ' + btoa(currentUser + ':' + ghPassword)
          }
        }).done(function(data2) {
          item.pr = data2;

          // Now get the PR status
          $.ajax({
            url: data2._links.statuses.href,
            headers: {
              Authorization: 'Basic ' + btoa(currentUser + ':' + ghPassword)
            }
          }).done(function(data3) {
            item.pr.status = data3;
            done();
          });
        });
      });
    })
    .fail(function(err) {
      cb(err);
    });
  });
}

/**
 * Get all issues with a certain label
 *
 * @author Tim Golen <tim@golen.net>
 *
 * @date 2015-06-07
 * @private
 *
 * @param {string} label
 * @param {Function} cb [description]
 */
function getIssuesByLabel(label, cb) {
  let filterLabels = ['daily', 'weekly', 'monthly'];
  let query = '?q=';
  let currentUser = $('.header-nav-link.name img').attr('alt').replace('@', '');
  let url;

  // Get the PRs assigned to me
  query += '+state:open';
  query += '+is:issue';
  // query += '+user:expensify';
  query += '+repo:expensify/expensify';
  query += '+assignee:' + currentUser;

  // We need to exclude our other filter labels if we are searching
  // for no priority
  if (label === 'none') {
    for (let i = filterLabels.length - 1; i >= 0; i--) {
      query += '+-label:' + filterLabels[i];
    }
  } else {
    query += '+label:' + label;
  }

  url = baseUrl + '/search/issues' + query;
  prefs.get('ghPassword', function(ghPassword) {
    $.ajax({
      url: url,
      headers: {
        Authorization: 'Basic ' + btoa(currentUser + ':' + ghPassword)
      }
    })
    .done(function(data) {
      // Set the type of the item to be the label we are lookign for
      _(data.items).map(function(item) {
        item.type = label;
      });
      cb(null, data.items);
    })
    .fail(function(err) {
      cb(err);
    });
  });
}

/**
 * Get all open issue for a particular area
 * @private
 *
 * @param {string} area
 * @param {Function} cb [description]
 */
function getIssuesByArea(area, cb) {
  let query = '?per_page=300&q=';
  let currentUser = $('.header-nav-link.name img').attr('alt').replace('@', '');
  let url;

  // Get the PRs assigned to me
  query += '+state:open';
  query += '+is:issue';
  // query += '+user:expensify';
  query += '+label:' + area;
  query += '+no:assignee';
  query += '+repo:expensify/expensify';

  url = baseUrl + '/search/issues' + query;
  prefs.get('ghPassword', function(ghPassword) {
    $.ajax({
      url: url,
      headers: {
        Authorization: 'Basic ' + btoa(currentUser + ':' + ghPassword)
      }
    })
    .done(function(data) {
      // Set the type of the item to be the label we are looking for
      const sortedData = _.chain(data.items)
        .each(i => {
          i.type = area;

          const age = moment().diff(i.created_at, 'days');
          const isBug = _(i.labels).findWhere({name: 'Bug'});
          const isTask = _(i.labels).findWhere({name: 'Task'});
          const isFeature = _(i.labels).findWhere({name: 'Feature'});
          const isHourly = _(i.labels).findWhere({name: 'Hourly'});
          const isDaily = _(i.labels).findWhere({name: 'Daily'});
          const isWeekly = _(i.labels).findWhere({name: 'Weekly'});
          const isMonthly = _(i.labels).findWhere({name: 'Monthly'});
          let score = 0;

          // Sort by K2
          score += isHourly ? 10000000 : 0;
          score += isDaily ? 1000000 : 0;
          score += isWeekly ? 100000 : 0;
          score += isMonthly ? 10000 : 0;

          // All bugs are at the top, followed by tasks, followed by features
          score += isBug ? 1000 : 0;
          score += isTask ? 700 : 0;
          score += isFeature ? 400 : 0;


          // Sort by age too
          score += age / 100;

          i.score = score;
          i.age = age;
        })
        .sortBy('score')
        .value();
      cb(null, sortedData.reverse());
    })
    .fail(function(err) {
      cb(err);
    });
  });
}

/**
 * Add labels to a github issue
 * @param {String[]} labels
 * @param {Function} cb
 */
function addLabels(labels, cb) {
  let currentUser = $('.header-nav-link.name img').attr('alt').replace('@', '');
  let repo = $('.pagehead h1 strong a').text();
  let owner = $('.pagehead h1 .author a').text();
  let issueNum = $('.gh-header-number').first().text().replace('#', '');
  let url = `${baseUrl}/repos/${repo}/${owner}/issues/${issueNum}/labels`;
  prefs.get('ghPassword', function(ghPassword) {
    $.ajax({
      url: url,
      method: 'post',
      data: JSON.stringify(labels),
      headers: {
        Authorization: 'Basic ' + btoa(currentUser + ':' + ghPassword)
      }
    })
    .done(function(data) {
      if (cb) {
        cb(null, data);
      }
    })
    .fail(function(err) {
      if (cb) {
        cb(err);
      }
    });
  });
}

/**
 * Remove a label from a github issue
 * @param {String[]} label
 * @param {Function} cb
 */
function removeLabel(label, cb) {
  let currentUser = $('.header-nav-link.name img').attr('alt').replace('@', '');
  let repo = $('.pagehead h1 strong a').text();
  let owner = $('.pagehead h1 .author a').text();
  let issueNum = $('.gh-header-number').first().text().replace('#', '');
  let url = `${baseUrl}/repos/${repo}/${owner}/issues/${issueNum}/labels/${label}`;
  prefs.get('ghPassword', function(ghPassword) {
    $.ajax({
      url: url,
      method: 'delete',
      headers: {
        Authorization: 'Basic ' + btoa(currentUser + ':' + ghPassword)
      }
    })
    .done(function(data) {
      if (cb) {
        cb(null, data);
      }
    })
    .fail(function(err) {
      if (cb) {
        cb(err);
      }
    });
  });
}

/**
 * Gets the issues that are labeled with hourly
 *
 * @param {Function} cb
 */
function getHourlyIssues(cb) {
  getIssuesByLabel('hourly', cb);
}

/**
 * Gets the issues that are labeled with daily
 *
 * @author Tim Golen <tim@golen.net>
 *
 * @date 2015-06-05
 *
 * @param {Function} cb
 */
function getDailyIssues(cb) {
  getIssuesByLabel('daily', cb);
}

/**
 * Gets the issues that are labeled with daily
 *
 * @author Tim Golen <tim@golen.net>
 *
 * @date 2015-06-05
 *
 * @param {Function} cb
 */
function getWeeklyIssues(cb) {
  getIssuesByLabel('weekly', cb);
}

/**
 * Gets the issues that are labeled with daily
 *
 * @author Tim Golen <tim@golen.net>
 *
 * @date 2015-06-05
 *
 * @param {Function} cb
 */
function getMonthlyIssues(cb) {
  getIssuesByLabel('monthly', cb);
}

/**
 * Gets the issues that are labeled with daily
 *
 * @author Tim Golen <tim@golen.net>
 *
 * @date 2015-06-05
 *
 * @param {Function} cb
 */
function getNoneIssues(cb) {
  getIssuesByLabel('none', cb);
}

/**
 * Gets the issues for web that are open and should be worked on
 *
 * @param {Function} cb
 */
function getWebIssues(cb) {
  getIssuesByArea('web', cb);
}

/**
 * Gets the issues for core that are open and should be worked on
 *
 * @param {Function} cb
 */
function getCoreIssues(cb) {
  getIssuesByArea('core', cb);
}

/**
 * Gets the issues for integrations that are open and should be worked on
 *
 * @param {Function} cb
 */
function getIntegrationsIssues(cb) {
  getIssuesByArea('"integration+server"', cb);
}

/**
 * Gets the issues for scrapers that are open and should be worked on
 *
 * @param {Function} cb
 */
function getScrapersIssues(cb) {
  getIssuesByArea('scraper', cb);
}

/**
 * Gets the issues for area51 that are open and should be worked on
 *
 * @param {Function} cb
 */
function getArea51Issues(cb) {
  getIssuesByArea('area-51', cb);
}

/**
 * Get all the pull requests assigned to the current user
 *
 * @author Tim Golen <tim@golen.net>
 *
 * @date 2015-06-07
 *
 * @param {Function} cb [description]
 */
function getPullsAssigned(cb) {
  getPullsByType('assignee', cb);
}

/**
 * Get all the pull requests assigned to the current user
 *
 * @author Tim Golen <tim@golen.net>
 *
 * @date 2015-06-07
 *
 * @param {Function} cb [description]
 */
function getPullsAuthored(cb) {
  getPullsByType('author', cb);
}

exports.getWebIssues = getWebIssues;
exports.getCoreIssues = getCoreIssues;
exports.getIntegrationsIssues = getIntegrationsIssues;
exports.getScrapersIssues = getScrapersIssues;
exports.getArea51Issues = getArea51Issues;
exports.getHourlyIssues = getHourlyIssues;
exports.getDailyIssues = getDailyIssues;
exports.getWeeklyIssues = getWeeklyIssues;
exports.getMonthlyIssues = getMonthlyIssues;
exports.getNoneIssues = getNoneIssues;
exports.getPullsAssigned = getPullsAssigned;
exports.getPullsAuthored = getPullsAuthored;
exports.addLabels = addLabels;
exports.removeLabel = removeLabel;
