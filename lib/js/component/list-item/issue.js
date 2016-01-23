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


module.exports = React.createClass({
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
    const isBug = _(this.props.data.labels).findWhere({name: 'Bug'}) ? <span className="octicon octicon-bug"></span> : '';
    const isTask = _(this.props.data.labels).findWhere({name: 'Task'}) ? <span className="octicon octicon-checklist"></span> : '';
    const isFeature = _(this.props.data.labels).findWhere({name: 'Feature'}) ? <span className="octicon octicon-gift"></span> : '';
    const isHourly = _(this.props.data.labels).findWhere({name: 'Hourly'}) ? 'hourly' : '';
    const isDaily = _(this.props.data.labels).findWhere({name: 'Daily'}) ? 'daily' : '';
    const isWeekly = _(this.props.data.labels).findWhere({name: 'Weekly'}) ? 'weekly' : '';
    const isMonthly = _(this.props.data.labels).findWhere({name: 'Feature'}) ? 'feature' : '';

    return (
      <a href={this.props.data.html_url} className={this.getClassName()} target="_blank">
        <span className="octicon octicon-check"></span>
        <span className="octicon octicon-alert"></span>
        {isBug}
        {isTask}
        {isFeature}
        {isHourly}
        {isDaily}
        {isWeekly}
        {isMonthly}
        {this.props.data.title}
      </a>
    );
  }
});
