'use strict';

let $ = require('jquery');
let _ = require('underscore');
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
      cb(null, data.items);
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
  query += '+user:expensify';
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
  query += '+user:expensify';
  query += '+label:' + area;

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
      _(data.items).map(function(item) {
        item.type = area;
      });
      cb(null, data.items);
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
  let repo = $('.entry-title .author .url > span').text();
  let owner = $('.entry-title > strong a').text();
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
  let repo = $('.entry-title .author .url > span').text();
  let owner = $('.entry-title > strong a').text();
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
  getIssuesByArea('integration+server', cb);
}

/**
 * Gets the issues for scrapers that are open and should be worked on
 *
 * @param {Function} cb
 */
function getScrapersIssues(cb) {
  getIssuesByArea('scrapers', cb);
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
exports.getHourlyIssues = getHourlyIssues;
exports.getDailyIssues = getDailyIssues;
exports.getWeeklyIssues = getWeeklyIssues;
exports.getMonthlyIssues = getMonthlyIssues;
exports.getNoneIssues = getNoneIssues;
exports.getPullsAssigned = getPullsAssigned;
exports.getPullsAuthored = getPullsAuthored;
exports.addLabels = addLabels;
exports.removeLabel = removeLabel;
