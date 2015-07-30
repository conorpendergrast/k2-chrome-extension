'use strict';

/**
 * Dashboard
 *
 * Displays our home page with the list of issues and pull requests
 */

const $ = require('jquery');
const React = require('react');
const Picker = require('./picker');

module.exports = function() {
  return {
    draw: function() {
      React.render(
        <Picker />,
        $('.k2picker-wrapper')[0]
      );
    }
  };
};
