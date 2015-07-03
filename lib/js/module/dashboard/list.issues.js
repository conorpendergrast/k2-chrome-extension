'use strict';
/*global console */

let React = require('react');
let _ = require('underscore');
let PanelList = require('../../component/panel/list');

let DailyIssueStore = require('../../store/issue.daily');
let WeeklyIssueStore = require('../../store/issue.weekly');
let MonthlyIssueStore = require('../../store/issue.monthly');
let NoneIssueStore = require('../../store/issue.none');
let PullAssignedStore = require('../../store/pull.assigned');
let PullAuthoredStore = require('../../store/pull.authored');

let DailyIssueActions = require('../../action/issue.daily');
let WeeklyIssueActions = require('../../action/issue.weekly');
let MonthlyIssueActions = require('../../action/issue.monthly');
let NoneIssueActions = require('../../action/issue.none');
let PullAssignedActions = require('../../action/pull.assigned');
let PullAuthoredActions = require('../../action/pull.authored');

module.exports = React.createClass({
  propTypes: {
    pollInterval: React.PropTypes.number
  },

  /**
   * Loops through each reference and calls their fetch method
   *
   * @author Tim Golen <tim@golen.net>
   *
   * @date 2015-07-03
   */
  loadData() {
    _(this.refs).each(ref => {
      if (_.isFunction(ref.fetch)) {
        ref.fetch();
      }
    });
  },

  componentDidMount() {
    this.loadData();
    this.interval = setInterval(this.loadData, this.props.pollInterval);
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

  render() {
    let listOptions = {
      emptyTitle: 'No Issues Here',
      emptyText: 'You completed all issues'
    };
    return (
      <div>
        <button onClick={this.loadData} className="btn right tooltipped tooltipped-sw" aria-label="Refresh Data"><span className="octicon octicon-sync"></span></button>
        <div className="issue reviewing"><span className="octicon octicon-check"></span> Under Review</div>
        <div className="issue overdue"><span className="octicon octicon-alert"></span> Overdue</div>
        <br />
        <div className="columns">
          <div className="one-fourth column">
            <PanelList ref="listdailyissues" title="Daily" extraClass="daily" action={DailyIssueActions} store={DailyIssueStore} item="issue"
              listOptions={listOptions} />
          </div>
          <div className="one-fourth column">
            <PanelList ref="listweeklyissues" title="Weekly" extraClass="weekly" action={WeeklyIssueActions} store={WeeklyIssueStore} item="issue"
              listOptions={listOptions} />
          </div>
          <div className="one-fourth column">
            <PanelList ref="listmonthlyissues" title="Monthly" extraClass="monthly" action={MonthlyIssueActions} store={MonthlyIssueStore} item="issue"
              listOptions={listOptions} />
          </div>
          <div className="one-fourth column">
            <PanelList ref="listnoneissues" title="None" extraClass="none" action={NoneIssueActions} store={NoneIssueStore} item="issue"
              listOptions={listOptions} />
          </div>
        </div>
        <br />
        <div>
          <PanelList ref="listassignedpulls" title="Pull Requests - Assigned to You" action={PullAssignedActions} store={PullAssignedStore} options={{showAssignee: false}} item="pull" />
        </div>
        <br />
        <div>
          <PanelList ref="listauthoredpulls" title="Pull Requests - You Created" action={PullAuthoredActions} store={PullAuthoredStore} options={{showAssignee: true}} item="pull" />
        </div>
      </div>
    );
  }
});
