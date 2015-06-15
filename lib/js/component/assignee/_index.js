'use strict';

let React = require('react');

module.exports = React.createClass({displayName: "exports",
  render: function() {
    return (
      React.createElement("a", {className: "assignee", href: this.props.data.html_url, target: "_blank"}, 
        React.createElement("span", {className: "octicon octicon-person"}), 
        this.props.data.login
      )
    );
  }
});
