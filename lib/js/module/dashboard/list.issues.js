'use strict';
/* global console */

const React = require('react');
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
const StoreIssueWeb = require('../../store/issue.web');
const StoreIssueCore = require('../../store/issue.core');
const StoreIssueIntegrations = require('../../store/issue.integrations');
const StoreIssueScrapers = require('../../store/issue.scrapers');

const ActionsIssueHourly = require('../../action/issue.hourly');
const ActionsIssueDaily = require('../../action/issue.daily');
const ActionsIssueWeekly = require('../../action/issue.weekly');
const ActionsIssueMonthly = require('../../action/issue.monthly');
const ActionsIssueNone = require('../../action/issue.none');
const ActionsPullAssigned = require('../../action/pull.assigned');
const ActionsPullAuthored = require('../../action/pull.authored');
const ActionsIssueWeb = require('../../action/issue.web');
const ActionsIssueCore = require('../../action/issue.core');
const ActionsIssueIntegrations = require('../../action/issue.integrations');
const ActionsIssueScrapers = require('../../action/issue.scrapers');

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
          <PanelList title="Pull Requests - Assigned to You" action={ActionsPullAssigned} store={StorePullAssigned} options={{showAssignee: false}} item="pull" pollInterval={this.props.pollInterval} />
        </div>
        <br />
        <div>
          <PanelList title="Pull Requests - You Created" action={ActionsPullAuthored} store={StorePullAuthored} options={{showAssignee: true}} item="pull" pollInterval={this.props.pollInterval} />
        </div>
        <br />
        <div>
          <Tabs
            items={[
              {
                title: 'Web',
                icon: 'octicon-globe',
                id: 'web',
                content: {
                  component: PanelList,
                  properties: {
                    title: 'Web Issues to Work On',
                    action: ActionsIssueWeb,
                    store: StoreIssueWeb,
                    item: 'issue',
                    pollInterval: this.props.pollInterval
                  }
                }
              },
              {
                title: 'Core',
                icon: 'octicon-circuit-board',
                id: 'core',
                content: {
                  component: PanelList,
                  properties: {
                    title: 'Core Issues to Work On',
                    action: ActionsIssueCore,
                    store: StoreIssueCore,
                    item: 'issue',
                    pollInterval: this.props.pollInterval
                  }
                }
              },
              {
                title: 'Integrations',
                icon: 'octicon-plug',
                id: 'integrations',
                content: {
                  component: PanelList,
                  properties: {
                    title: 'Integration Issues to Work On',
                    action: ActionsIssueIntegrations,
                    store: StoreIssueIntegrations,
                    item: 'issue',
                    pollInterval: this.props.pollInterval
                  }
                }
              },
              {
                title: 'Scrapers',
                icon: 'octicon-credit-card',
                id: 'scrapers',
                content: {
                  component: PanelList,
                  properties: {
                    title: 'Scraper Issues to Work On',
                    action: ActionsIssueScrapers,
                    store: StoreIssueScrapers,
                    item: 'issue',
                    pollInterval: this.props.pollInterval
                  }
                }
              }
            ]}
          />
        </div>
      </div>
    );
  }
});
