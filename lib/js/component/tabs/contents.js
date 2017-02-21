'use strict';

/**
 * A component for tabs to show the selected tab and the corresponding content
 */

let React = require('react');
const _ = require('underscore');

module.exports = React.createClass({
  getInitialState() {
    return {
      loading: false,
      retrying: false,
      retryingIn: null,
      data: []
    };
  },

  render: function() {
    console.log(1, this.props)
    return (
      <div>
        test
      </div>
    );
  }
});
