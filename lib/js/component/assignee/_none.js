'use strict';

let React = require('react');

module.exports = React.createClass({displayName: "exports",
  render: function() {
    return (
      React.createElement("span", {className: "assignee"}, "(no one)")
    );
  }
});
