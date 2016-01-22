'use strict';
/* global console */

const React = require('react');
const _ = require('underscore');
const prefs = require('../../lib/prefs');
const Tabs = require('../../component/tabs/tabs');
const PanelList = require('../../component/panel/list');
const BtnGroup = require('../../component/btngroup/index');

const StoreIssueHourly = require('../../store/issue.hourly');
const StoreIssueDaily = require('../../store/issue.daily');
const StoreIssueWeekly = require('../../store/issue.weekly');
const StoreIssueMonthly = require('../../store/issue.monthly');
const StoreIssueNone = require('../../store/issue.none');
const StorePullAssigned = require('../../store/pull.assigned');
const StorePullAuthored = require('../../store/pull.authored');

const ActionsIssueHourly = require('../../action/issue.daily');
const ActionsIssueDaily = require('../../action/issue.daily');
const ActionsIssueWeekly = require('../../action/issue.weekly');
const ActionsIssueMonthly = require('../../action/issue.monthly');
const ActionsIssueNone = require('../../action/issue.none');
const ActionsPullAssigned = require('../../action/pull.assigned');
const ActionsPullAuthored = require('../../action/pull.authored');

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
          <div className="one-fifth column">
            <PanelList ref="listdailyissues" title="Hourly" extraClass="hourly" action={ActionsIssueHourly} store={StoreIssueHourly} item="issue"
              listOptions={listOptions} />
          </div>
          <div className="one-fifth column">
            <PanelList ref="listdailyissues" title="Daily" extraClass="daily" action={ActionsIssueDaily} store={StoreIssueDaily} item="issue"
              listOptions={listOptions} />
          </div>
          <div className="one-fifth column">
            <PanelList ref="listweeklyissues" title="Weekly" extraClass="weekly" action={ActionsIssueWeekly} store={StoreIssueWeekly} item="issue"
              listOptions={listOptions} />
          </div>
          <div className="one-fifth column">
            <PanelList ref="listmonthlyissues" title="Monthly" extraClass="monthly" action={ActionsIssueMonthly} store={StoreIssueMonthly} item="issue"
              listOptions={listOptions} />
          </div>
          <div className="one-fifth column">
            <PanelList ref="listnoneissues" title="None" extraClass="none" action={ActionsIssueNone} store={StoreIssueNone} item="issue"
              listOptions={listOptions} />
          </div>
        </div>
        <br />
        <div>
          <PanelList ref="listassignedpulls" title="Pull Requests - Assigned to You" action={ActionsPullAssigned} store={StorePullAssigned} options={{showAssignee: false}} item="pull" />
        </div>
        <br />
        <div>
          <PanelList ref="listauthoredpulls" title="Pull Requests - You Created" action={ActionsPullAuthored} store={StorePullAuthored} options={{showAssignee: true}} item="pull" />
        </div>
        <br />
        <div>
          <Tabs
            items={[
              {
                title: 'Web',
                icon: 'octicon-globe',
                id: 'web',
                content: <div>web</div>
              },
              {
                title: 'Core',
                icon: 'octicon-circuit-board',
                id: 'core',
                content: <div>core</div>
              },
              {
                title: 'Integrations',
                icon: 'octicon-credit-card',
                id: 'integrations',
                content: <div>integrations</div>
              },
              {
                title: 'Scrapers',
                icon: 'octicon-credit-card',
                id: 'scrapers',
                content: <div>scrapers</div>
              }
            ]}
          />
        </div>
      </div>
    );
  }
});
