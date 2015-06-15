'use strict';

/**
 * Dashboard
 *
 * Displays our home page with the list of issues and pull requests
 */

let $ = require('jquery');
let prefs = require('../../lib/prefs');
let React = require('react');
let ListIssues = require('./_list.issues');
let FormPassword = require('./_form.password');

module.exports = function() {
  return {
    draw: function() {
      // Make sure they have entered their password
      prefs.get('ghPassword', function(ghPassword) {
        if (ghPassword) {
          showDashboard();
        } else {
          showPasswordForm();
        }
      });
    }
  };
};

/**
 * Display our dashboard with the list of issues
 *
 * @author Tim Golen <tim@golen.net>
 *
 * @date 2015-06-14
 */
function showDashboard() {
  React.render(
    React.createElement(ListIssues, {pollInterval: 60000}),
    $('#js-repo-pjax-container')[0]
  );
}

/**
 * Prompt them for their password, then show the dashboard
 *
 * @author Tim Golen <tim@golen.net>
 *
 * @date 2015-06-14
 */
function showPasswordForm() {
  React.render(
    React.createElement(FormPassword, {onFinished: showDashboard}),
    $('#js-repo-pjax-container')[0]
  );
}
