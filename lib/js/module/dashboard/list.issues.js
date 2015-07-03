'use strict';
/*global console */

let React = require('react');
let API = require('../../lib/api');
let PanelList = require('../../component/panel/list');
let DailyIssueStore = require('../../store/issue.daily');
let WeeklyIssueStore = require('../../store/issue.weekly');
let DailyActions = require('../../action/issue.daily');
let WeeklyActions = require('../../action/issue.weekly');

module.exports = React.createClass({
  propTypes: {
    pollInterval: React.PropTypes.number
  },
  getInitialState() {
    return {
      daily: DailyIssueStore.getState(),
      weekly: WeeklyIssueStore.getState(),
      monthly: [],
      none: [],
      pullsAssigned: [],
      pullsAuthored: []
    };
  },
  /**
   * Loads all of our data from the API and updates our state with it
   *
   * @author Tim Golen <tim@golen.net>
   *
   * @date 2015-06-07
   */
  loadData() {
    let _this = this;

    DailyActions.fetch();
    WeeklyActions.fetch();

    /*/ Get issues with monthly label
    API.getMonthlyIssues(function(err, data) {
      if (err) {
        return;
      }

      _this.setState({monthly: data});
    });

    // Get issues with no k2 labels
    API.getNoneIssues(function(err, data) {
      if (err) {
        return;
      }

      _this.setState({none: data});
    });

    // Get assigned pull requests
    API.getPullsAssigned(function(err, data) {
      if (err) {
        return;
      }

      _this.setState({pullsAssigned: data});
    });

    // Get authored pull requests
    API.getPullsAuthored(function(err, data) {
      if (err) {
        return;
      }

      _this.setState({pullsAuthored: data});
    });*/
  },
  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, this.props.pollInterval);

    // Listen to our stores
    DailyIssueStore.listen(this.onDailyChange);
    WeeklyIssueStore.listen(this.onWeeklyChange);
  },

  componentWillUnmount() {
    // Stop listening to our stores
    DailyIssueStore.unlisten(this.onDailyChange);
    WeeklyIssueStore.unlisten(this.onWeeklyChange);
  },

  onDailyChange() {
    this.setState({daily: DailyIssueStore.getState()});
  },
  onWeeklyChange() {
    this.setState({weekly: WeeklyIssueStore.getState()});
  },
  onMonthlyChange(state) {
    this.setState({monthly: state});
  },
  onNoneChange(state) {
    this.setState({none: state});
  },
  render() {
    let listOptions = {
      emptyTitle: 'No Issues',
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
            <PanelList title="Daily" extraClass="daily" list={this.state.daily} item="issue"
              listOptions={listOptions} />
          </div>
          <div className="one-fourth column">
            <PanelList title="Weekly" extraClass="weekly" list={this.state.weekly} item="issue"
              listOptions={listOptions} />
          </div>
        </div>
        <br />
      </div>
    );
  }
});
