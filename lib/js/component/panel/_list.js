'use strict';

/**
 * Panel - List variant
 *
 * This panel contains a title and a list of items.
 *
 * @param {array} list the data that will be displayed in the list
 * @param {string} item the type of item that will be displayed in the list
 *                      will correspond to something in component/list-item
 * @param {object} options various options passed to the list as well
 * @param {string} extraClass gets appended to the panels class for styling purposes
 */

let React = require('react');
let Title = require('../panel-title/_index');
let List = require('../list/_index');

module.exports = React.createClass({displayName: "exports",
  getPanelClass: function() {
    return 'panel ' + this.props.extraClass;
  },
  render: function() {
    return (
      React.createElement("div", {className: this.getPanelClass()}, 
        React.createElement(Title, {text: this.props.title}), 
        React.createElement(List, {data: this.props.list, type: this.props.item, options: this.props.options}), 
        this.props.children
      )
    );
  }
});
