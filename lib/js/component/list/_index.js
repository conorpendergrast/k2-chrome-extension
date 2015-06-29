'use strict';

/**
 * List
 *
 * Display a list of items depending on the type
 *
 * @param {array} data which will be displayed as items
 * @param {object} options
 */

let React = require('react');
let ListItemIssue = require('../list-item/_issue');
let ListItemPull = require('../list-item/_pull');
let ListItemForm = require('../list-item/_form');

module.exports = React.createClass({displayName: "exports",

  /**
   * Gets the items to display using the proper item
   * component
   *
   * @author Tim Golen <tim@golen.net>
   *
   * @date 2015-06-10
   *
   * @return {array}
   */
  _getItems: function() {
    let type = this.props.type;
    let options = this.props.options;

    return this.props.data.map(function(item) {
      switch (type) {
        case 'issue': return (React.createElement(ListItemIssue, {key: item.id, data: item, options: options})); break;
        case 'pull': return (React.createElement(ListItemPull, {key: item.id, data: item, options: options})); break;
        case 'form': return (React.createElement(ListItemForm, {key: item.id, data: item, options: options})); break;
      }
    });
  },

  render: function() {
    if (this.props.loading) {
      return React.createElement("div", null, "Loading...");
    }

    if (!this.props.data.length) {
      return (
        React.createElement("div", {className: "blankslate capped clean-background"}, 
          React.createElement("span", {className: "mega-octicon octicon-thumbsup"}), 
          React.createElement("h3", null, this.props.emptyTitle), 
          React.createElement("p", null, this.props.emptyText)
        )
      );
    }

    return (
      React.createElement("div", null, 
        this._getItems()
      )
    );
  }
});
