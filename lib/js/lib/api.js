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

exports.getDailyIssues = getDailyIssues;
exports.getWeeklyIssues = getWeeklyIssues;
exports.getMonthlyIssues = getMonthlyIssues;
exports.getNoneIssues = getNoneIssues;
exports.getPullsAssigned = getPullsAssigned;
exports.getPullsAuthored = getPullsAuthored;
