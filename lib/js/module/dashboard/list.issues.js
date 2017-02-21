'use strict';
/* global console */

const React = require('react');
const prefs = require('../../lib/prefs');
const Tabs = require('../../component/tabs/tabs');
const PanelList = require('../../component/panel/list');

const StoreIssueHourly = require('../../store/issue.hourly');
const StoreIssueDaily = require('../../store/issue.daily');
const StoreIssueWeekly = require('../../store/issue.weekly');
const StoreIssueMonthly = require('../../store/issue.monthly');
const StoreIssueNone = require('../../store/issue.none');
const StorePullAssigned = require('../../store/pull.assigned');
const StorePullReviewing = require('../../store/pull.reviewing');
const StoreIssueWeb = require('../../store/issue.web');
const StoreIssueCore = require('../../store/issue.core');
const StoreIssueIntegrations = require('../../store/issue.integrations');
const StoreIssueScrapers = require('../../store/issue.scrapers');
const StoreIssueArea51 = require('../../store/issue.area51');
const StoreIssueMobile = require('../../store/issue.mobile');

const ActionsIssueHourly = require('../../action/issue.hourly');
const ActionsIssueDaily = require('../../action/issue.daily');
const ActionsIssueWeekly = require('../../action/issue.weekly');
const ActionsIssueMonthly = require('../../action/issue.monthly');
const ActionsIssueNone = require('../../action/issue.none');
const ActionsPullAssigned = require('../../action/pull.assigned');
const ActionsPullReviewing = require('../../action/pull.reviewing');
const ActionsIssueWeb = require('../../action/issue.web');
const ActionsIssueCore = require('../../action/issue.core');
const ActionsIssueIntegrations = require('../../action/issue.integrations');
const ActionsIssueScrapers = require('../../action/issue.scrapers');
const ActionsIssueArea51 = require('../../action/issue.area51');
const ActionsIssueMobile = require('../../action/issue.mobile');

module.exports = React.createClass({
  propTypes: {
    pollInterval: React.PropTypes.number
  },

  /**
   * Sign out the user so they are prompted for their password again
   */
  signOut() {
    prefs.clear('ghPassword');
    window.location.reload(true);
  },

  render() {
    let listOptions = {
      emptyTitle: 'No Issues Here',
      emptyText: 'You completed all issues'
    };
    return (
      <div className="issueList">

        <div className="legend">
          <button onClick={this.signOut} className="btn tooltipped tooltipped-sw" aria-label="Sign Out">Sign Out</button>

          <br />
          <div className="issue reviewing">Under Review</div>
          <div className="issue overdue">Overdue</div>
          <div className="issue"><sup>B</sup> Bug</div>
          <div className="issue"><sup>T</sup> Task</div>
          <div className="issue"><sup>F</sup> Feature</div>
        </div>

        <div className="columns">
          <div className="one-fifth column">
            <PanelList title="Hourly" extraClass="hourly" action={ActionsIssueHourly} store={StoreIssueHourly} item="issue"
              listOptions={listOptions} pollInterval={this.props.pollInterval} />
          </div>
          <div className="one-fifth column">
            <PanelList title="Daily" extraClass="daily" action={ActionsIssueDaily} store={StoreIssueDaily} item="issue"
              listOptions={listOptions} pollInterval={this.props.pollInterval} />
          </div>
          <div className="one-fifth column">
            <PanelList title="Weekly" extraClass="weekly" action={ActionsIssueWeekly} store={StoreIssueWeekly} item="issue"
              listOptions={listOptions} pollInterval={this.props.pollInterval} />
          </div>
          <div className="one-fifth column">
            <PanelList title="Monthly" extraClass="monthly" action={ActionsIssueMonthly} store={StoreIssueMonthly} item="issue"
              listOptions={listOptions} pollInterval={this.props.pollInterval} />
          </div>
          <div className="one-fifth column">
            <PanelList title="None" extraClass="none" action={ActionsIssueNone} store={StoreIssueNone} item="issue"
              listOptions={listOptions} pollInterval={this.props.pollInterval} />
          </div>
        </div>
        <br />
        <div>
          <PanelList title="Your Pull Requests" action={ActionsPullAssigned} store={StorePullAssigned} options={{showAssignee: false, showReviews: true}} item="pull" pollInterval={this.props.pollInterval} />
        </div>
        <br />
        <div>
          <PanelList title="Pull Requests - You need to review" action={ActionsPullReviewing} store={StorePullReviewing} options={{showAssignee: false, showReviews: true}} item="pull" pollInterval={this.props.pollInterval} />
        </div>
        <br />
        <div>
          <Tabs
            items={[
              {
                title: 'Web',
                id: 'web',
                content: {
                  action: ActionsIssueWeb,
                  store: StoreIssueWeb,
                  item: 'issue',
                  pollInterval: this.props.pollInterval
                }
              },
              {
                title: 'Core',
                id: 'core',
                content: {
                  action: ActionsIssueCore,
                  store: StoreIssueCore,
                  item: 'issue',
                  pollInterval: this.props.pollInterval
                }
              },
              {
                title: 'Integrations',
                id: 'integrations',
                content: {
                  action: ActionsIssueIntegrations,
                  store: StoreIssueIntegrations,
                  item: 'issue',
                  pollInterval: this.props.pollInterval
                }
              },
              {
                title: 'Scrapers',
                id: 'scrapers',
                content: {
                  action: ActionsIssueScrapers,
                  store: StoreIssueScrapers,
                  item: 'issue',
                  pollInterval: this.props.pollInterval
                }
              },
              {
                title: 'Area51',
                id: 'area51',
                content: {
                  action: ActionsIssueArea51,
                  store: StoreIssueArea51,
                  item: 'issue',
                  pollInterval: this.props.pollInterval
                }
              },
              {
                title: 'Mobile',
                id: 'mobile',
                content: {
                  action: ActionsIssueMobile,
                  store: StoreIssueMobile,
                  item: 'issue',
                  pollInterval: this.props.pollInterval
                }
              }
            ]}
          />
        </div>
      </div>
    );
  }
});
