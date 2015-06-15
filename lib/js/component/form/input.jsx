'use strict';

/**
 * Form Element - Input
 *
 * Displays an HTML input
 *
 * @param {object} data about the element being shown
 */

let React = require('react');

module.exports = React.createClass({
  componentDidMount: function() {
    if (this.props.data.focus) {
      this.getDOMNode().focus();
    }
  },
  render: function() {
    return (
      <input
        type="text"
        htmlId={this.props.data.id}
        name={this.props.data.id}
        required={this.props.data.required}
        className={this.props.data.className} />
    );
  }
});
