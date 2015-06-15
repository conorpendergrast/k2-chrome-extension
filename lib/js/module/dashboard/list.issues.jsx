'use strict';
/*global console */

let React = require('react');
let API = require('../../lib/api');
let PanelList = require('../../component/panel/_list');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      daily: [],
      weekly: [],
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
  loadData: function() {
    let _this = this;

    // Get issues with daily label
    API.getDailyIssues(function(err, data) {
      if (err) {
        return console.error(err);
      }

      _this.setState({daily: data});
    });

    // Get issues with weekly label
    API.getWeeklyIssues(function(err, data) {
      if (err) {
        return console.error(err);
      }

      _this.setState({weekly: data});
    });

    // Get issues with monthly label
    API.getMonthlyIssues(function(err, data) {
      if (err) {
        return console.error(err);
      }

      _this.setState({monthly: data});
    });

    // Get issues with no k2 labels
    API.getNoneIssues(function(err, data) {
      if (err) {
        return console.error(err);
      }

      _this.setState({none: data});
    });

    // Get assigned pull requests
    API.getPullsAssigned(function(err, data) {
      if (err) {
        return console.error(err);
      }

      _this.setState({pullsAssigned: data});
    });

    // Get authored pull requests
    API.getPullsAuthored(function(err, data) {
      if (err) {
        return console.error(err);
      }

      _this.setState({pullsAuthored: data});
    });
  },
  componentDidMount: function() {
    this.loadData();
    setInterval(this.loadData, this.props.pollInterval);
  },
  render: function() {
    return (
      <div>
        <button onClick={this.loadData} className="btn right tooltipped tooltipped-sw" aria-label="Refresh Data"><span className="octicon octicon-sync"></span></button>
        <div className="issue reviewing"><span className="octicon octicon-check"></span> Under Review</div>
        <div className="issue overdue"><span className="octicon octicon-alert"></span> Overdue</div>
        <br />
        <div className="columns">
          <div className="one-fourth column">
            <PanelList title="Daily" extraClass="daily" list={this.state.daily} item="issue" />
          </div>
          <div className="one-fourth column">
            <PanelList title="Weekly" extraClass="weekly" list={this.state.weekly} item="issue" />
          </div>
          <div className="one-fourth column">
            <PanelList title="Monthly" extraClass="monthly" list={this.state.monthly} item="issue" />
          </div>
          <div className="one-fourth column">
            <PanelList title="None" extraClass="none" list={this.state.none} item="issue" />
          </div>
        </div>
        <br />
        <div>
          <PanelList title="Pull Requests - Assigned to You" list={this.state.pullsAssigned} options={{showAssignee: false}} item="pull" />
        </div>
        <br />
        <div>
          <PanelList title="Pull Requests - Created by You" list={this.state.pullsAuthored} options={{showAssignee: true}} item="pull" />
        </div>
      </div>
    );
  }
});
