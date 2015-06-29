'use strict';
/*global console */

let React = require('react');
let API = require('../../lib/api');
let PanelList = require('../../component/panel/_list');
let IssueStore = require('../../store/issue');

module.exports = React.createClass({displayName: "exports",
  getInitialState() {
    return {
      daily: IssueStore.getState(),
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
  loadData() {
    let _this = this;

    /*/ Get issues with daily label
    API.getDailyIssues(function(err, data) {
      if (err) {
        return;
      }

      _this.setState({daily: data});
    });*/

    // Get issues with weekly label
    API.getWeeklyIssues(function(err, data) {
      if (err) {
        return;
      }

      _this.setState({weekly: data});
    });

    // Get issues with monthly label
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
    });
  },
  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, this.props.pollInterval);

    IssueStore.listen(this.onChange);
  },

  componentWillUnmount() {
    IssueStore.unlisten(this.onChange);
  },

  onChange(state) {
    this.setState({daily: state});
  },
  render() {
    let listOptions = {
      emptyTitle: 'No Issues',
      emptyText: 'You completed all issues'
    };
    return (
      React.createElement("div", null, 
        React.createElement("button", {onClick: this.loadData, className: "btn right tooltipped tooltipped-sw", "aria-label": "Refresh Data"}, React.createElement("span", {className: "octicon octicon-sync"})), 
        React.createElement("div", {className: "issue reviewing"}, React.createElement("span", {className: "octicon octicon-check"}), " Under Review"), 
        React.createElement("div", {className: "issue overdue"}, React.createElement("span", {className: "octicon octicon-alert"}), " Overdue"), 
        React.createElement("br", null), 
        React.createElement("div", {className: "columns"}, 
          React.createElement("div", {className: "one-fourth column"}, 
            React.createElement(PanelList, {title: "Daily", extraClass: "daily", list: this.state.daily, item: "issue", 
              listOptions: listOptions})
          ), 
          React.createElement("div", {className: "one-fourth column"}, 
            React.createElement(PanelList, {title: "Weekly", extraClass: "weekly", list: this.state.weekly, item: "issue", 
              listOptions: listOptions})
          ), 
          React.createElement("div", {className: "one-fourth column"}, 
            React.createElement(PanelList, {title: "Monthly", extraClass: "monthly", list: this.state.monthly, item: "issue", 
              listOptions: listOptions})
          ), 
          React.createElement("div", {className: "one-fourth column"}, 
            React.createElement(PanelList, {title: "None", extraClass: "none", list: this.state.none, item: "issue", 
              listOptions: listOptions})
          )
        ), 
        React.createElement("br", null), 
        React.createElement("div", null, 
          React.createElement(PanelList, {title: "Pull Requests - Assigned to You", list: this.state.pullsAssigned, options: {showAssignee: false}, item: "pull"})
        ), 
        React.createElement("br", null), 
        React.createElement("div", null, 
          React.createElement(PanelList, {title: "Pull Requests - Created by You", list: this.state.pullsAuthored, options: {showAssignee: true}, item: "pull"})
        )
      )
    );
  }
});
