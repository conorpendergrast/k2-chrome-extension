'use strict';

/**
 * List Item - Form Element variant
 *
 * Displays a form element
 *
 * @param {object} data about the element being shown
 * @param {object} options
 */

let React = require('react');
let FormInput = require('../form/_input');

module.exports = React.createClass({displayName: "exports",

  render: function() {
    let element;
    let hint;

    switch (this.props.data.type) {
      case 'password': element = React.createElement(FormInput, {data: this.props.data}); break;
    }

    if (this.props.data.hint) {
      hint = React.createElement("p", null, this.props.data.hint);
    }


    return (
      React.createElement("div", {className: "panel-item"}, 
        React.createElement("label", {htmlFor: this.props.data.id}, this.props.data.label), 
        element, 
        hint
      )
    );
  }
});
