'use strict';

/**
 * List Item - Pull Request variant
 *
 * Displays a pull request item
 *
 * @param {object} data the data returned from GitHub for a pull request
 * @param {object} options
 * @param {boolean} options.showAssignee whether or not to show the assignee
 */

let React = require('react');
let moment = require('moment');
let Assignee = require('../assignee/_index');
let NotAssigned = require('../assignee/_none');

module.exports = React.createClass({displayName: "exports",

  /**
   * Gets the class name for the item
   *
   * @author Tim Golen <tim@golen.net>
   *
   * @date 2015-06-10
   *
   * @return {string}
   */
  getClassName: function() {
    let className = 'issue';
    let today = moment();
    let days = 7;
    let isOverdue;

    // See if it's overdue
    isOverdue = moment(this.props.data.updated_at).isBefore(today.subtract(days, 'days'), 'day');

    if (isOverdue) {
      className += ' overdue';
    }

    return className;
  },

  render: function() {
    let person = '';

    // If we are showing the assignee, we need to figure which template to display
    if (this.props.options.showAssignee) {
      if (this.props.data.assignee) {
        person = React.createElement(Assignee, {data: this.props.data.assignee});
      } else {
        person = React.createElement(NotAssigned, null);
      }
    }

    return (
      React.createElement("div", {className: "panel-item"}, 
        React.createElement("a", {href: this.props.data.html_url, className: this.getClassName(), target: "_blank"}, 
          React.createElement("span", {className: "octicon octicon-alert"}), 
          this.props.data.title
        ), 
        React.createElement("span", {className: "panel-item-meta"}, 
          person, 
          React.createElement("span", {className: "age"}, moment(this.props.data.updated_at).fromNow()), 
          React.createElement("span", {className: "comments"}, 
            React.createElement("span", {className: "octicon octicon-comment"}), 
            this.props.data.comments
          )
        )
      )
    );
  }
});
