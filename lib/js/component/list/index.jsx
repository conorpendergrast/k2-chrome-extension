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

module.exports = React.createClass({

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
        case 'issue': return (<ListItemIssue key={item.id} data={item} options={options} />); break;
        case 'pull': return (<ListItemPull key={item.id} data={item} options={options} />); break;
        case 'form': return (<ListItemForm key={item.id} data={item} options={options} />); break;
      }
    });
  },

  render: function() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    }

    if (!this.props.data.length) {
      return (
        <div className="blankslate capped clean-background">
          <span className="mega-octicon octicon-thumbsup"></span>
          <h3>{this.props.emptyTitle}</h3>
          <p>{this.props.emptyText}</p>
        </div>
      );
    }

    return (
      <div>
        {this._getItems()}
      </div>
    );
  }
});
