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
    const isPlanning = _(this.props.data.labels).findWhere({name: 'Planning'}) ? ' planning' : '';
    const isWaitingOnCustomer = _(this.props.data.labels).findWhere({name: 'Waiting for customer'}) ? ' waiting-for-customer' : '';
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

    return className + isPlanning + isWaitingOnCustomer;
  },
  render: function() {
    const isBug = _(this.props.data.labels).findWhere({name: 'Bug'}) ? <sup>B</sup> : null;
    const isTask = _(this.props.data.labels).findWhere({name: 'Task'}) ? <sup>T</sup> : null;
    const isFeature = _(this.props.data.labels).findWhere({name: 'Feature'}) ? <sup>F</sup> : null;
    const isHourly = _(this.props.data.labels).findWhere({name: 'Hourly'}) ? <span className="label hourly">H</span> : null;
    const isDaily = _(this.props.data.labels).findWhere({name: 'Daily'}) ? <span className="label daily">D</span> : null;
    const isWeekly = _(this.props.data.labels).findWhere({name: 'Weekly'}) ? <span className="label weekly">W</span> : null;
    const isMonthly = _(this.props.data.labels).findWhere({name: 'Monthly'}) ? <span className="label monthly">M</span> : null;
    const isNewhire = _(this.props.data.labels).findWhere({name: 'FirstPick'}) ? <span className="label newhire">FP</span> : '';
    const isWaitingForCustomer = _(this.props.data.labels).findWhere({name: 'Waiting for customer'}) ? <span className="label waiting">Waiting</span> : '';

    return (
      <a href={this.props.data.html_url} className={this.getClassName()} target="_blank">
        {isHourly}
        {isDaily}
        {isWeekly}
        {isMonthly}
        {isNewhire}
        {isWaitingForCustomer}
        {isBug}
        {isTask}
        {isFeature}
        {this.props.data.title}
      </a>
    );
  }
});
