'use strict';
/* global console */

const React = require('react');
const _ = require('underscore');
const prefs = require('../../lib/prefs');
const PanelList = require('../../component/panel/list');
const BtnGroup = require('../../component/btngroup/index');

const DailyIssueStore = require('../../store/issue.daily');
const WeeklyIssueStore = require('../../store/issue.weekly');
const MonthlyIssueStore = require('../../store/issue.monthly');
const NoneIssueStore = require('../../store/issue.none');
const PullAssignedStore = require('../../store/pull.assigned');
const PullAuthoredStore = require('../../store/pull.authored');

const DailyIssueActions = require('../../action/issue.daily');
const WeeklyIssueActions = require('../../action/issue.weekly');
const MonthlyIssueActions = require('../../action/issue.monthly');
const NoneIssueActions = require('../../action/issue.none');
const PullAssignedActions = require('../../action/pull.assigned');
const PullAuthoredActions = require('../../action/pull.authored');

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

  /**
   * Sign out the user so they are prompted for their password again
   */
  signOut() {
    prefs.clear('ghPassword');
    window.location.reload(true);
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

        <div className="right">
          <BtnGroup>
            <button onClick={this.loadData} className="btn tooltipped tooltipped-sw" aria-label="Refresh Data"><span className="octicon octicon-sync"></span></button>
            <button onClick={this.signOut} className="btn tooltipped tooltipped-sw" aria-label="Sign Out">Sign Out</button>
          </BtnGroup>
        </div>

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
