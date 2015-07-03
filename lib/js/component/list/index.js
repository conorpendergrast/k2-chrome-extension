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
let ListItemIssue = require('../list-item/issue');
let ListItemPull = require('../list-item/pull');
let ListItemForm = require('../list-item/form');

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
      let result;
      switch (type) {
        case 'issue': result = (<ListItemIssue key={item.id} data={item} options={options} />); break;
        case 'pull': result = (<ListItemPull key={item.id} data={item} options={options} />); break;
        case 'form': result = (<ListItemForm key={item.id} data={item} options={options} />); break;
      }
      return result;
    });
  },

  render: function() {
    console.log('list render', this.props);
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
