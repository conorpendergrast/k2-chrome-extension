'use strict';

/**
 * List Item - Issue variant
 *
 * Displays an issue
 *
 * @param {object} data the data being returned from GH for an issue
 * @param {string} data.type daily|weekly|monthly|none identifies the type of issue
 */

let React = require('react');
let _ = require('underscore');
let moment = require('moment');
let daysLookup = {
  daily: 1,
  weekly: 7,
  monthly: 30
};


module.exports = React.createClass({displayName: "exports",
  getClassName: function() {
    let className = 'panel-item issue';
    let today = moment();
    let days = daysLookup[this.props.data.type];
    let isUnderReview;
    let isOverdue;

    // See if it's under review
    isUnderReview = _(this.props.data.labels).find(function(label) {
      return label.name.toLowerCase() === 'reviewing';
    });

    if (isUnderReview) {
      className += ' reviewing';
    }

    // See if it's overdue
    isOverdue = moment(this.props.data.updated_at).isBefore(today.subtract(days, 'days'), 'day');

    if (isOverdue) {
      className += ' overdue';
    }

    return className;
  },
  render: function() {
    return (
      React.createElement("a", {href: this.props.data.html_url, className: this.getClassName(), target: "_blank"}, 
        React.createElement("span", {className: "octicon octicon-check"}), 
        React.createElement("span", {className: "octicon octicon-alert"}), 
        this.props.data.title
      )
    );
  }
});
