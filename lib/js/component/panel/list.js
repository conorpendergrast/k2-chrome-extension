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
let Title = require('../panel-title/index');
let List = require('../list/index');

module.exports = React.createClass({
  getPanelClass: function() {
    return 'panel ' + this.props.extraClass;
  },
  render: function() {
    return (
      <div className={this.getPanelClass()}>
        <Title text={this.props.title} />
        <List type={this.props.item} options={this.props.options}
          {...this.props.list}
          {...this.props.listOptions} />
        {this.props.children}
      </div>
    );
  }
});
