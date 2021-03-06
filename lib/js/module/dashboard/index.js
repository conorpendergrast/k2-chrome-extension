'use strict';

/**
 * Dashboard
 *
 * Displays our home page with the list of issues and pull requests
 */

const $ = require('jquery');
const prefs = require('../../lib/prefs');
const React = require('react');
const ReactDOM = require('react-dom');
const ListIssues = require('./list.issues');
const FormPassword = require('./form.password');

/**
 * Display our dashboard with the list of issues
 *
 * @author Tim Golen <tim@golen.net>
 *
 * @date 2015-06-14
 */
function showDashboard() {
  $('.repository-content').empty();
  ReactDOM.render(
    <ListIssues pollInterval={60000} />,
    $('.repository-content')[0]
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
  $('.repository-content').empty();
  ReactDOM.render(
    <FormPassword onFinished={showDashboard} />,
    $('.repository-content')[0]
  );
}

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
