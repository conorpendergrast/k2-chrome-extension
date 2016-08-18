'use strict';
/* global console */

const $ = require('jquery');
const _ = require('underscore');
const React = require('react');
const API = require('../../lib/api');
const BtnGroup = require('../../component/btngroup/index');
const defaultBtnClass = 'btn btn-sm tooltipped tooltipped-n typepicker';

module.exports = React.createClass({
  /**
   * Sets the initial class names for all of our buttons
   *
   * @author Tim Golen <tim@golen.net>
   *
   * @date 2015-07-30
   *
   * @return {Object}
   */
  getInitialState() {
    return {
      web: defaultBtnClass + ' k2-web',
      core: defaultBtnClass + ' k2-core',
      'area-51': defaultBtnClass + ' k2-area51',
      design: defaultBtnClass + ' k2-design',
      'integration server': defaultBtnClass + ' k2-is',
      ops: defaultBtnClass + ' k2-ops',
      scraper: defaultBtnClass + ' k2-scraper'
    };
  },

  /**
   * When the component has renered, we need to see if there
   * is an existing label, and if so, make that button enabled
   *
   * @author Tim Golen <tim@golen.net>
   *
   * @date 2015-07-30
   */
  componentDidMount() {
    let _this = this;
    $('.labels .label').each(function() {
      const label = $(this).text().toLowerCase();
      if (_(_this.state).keys().indexOf(label) > -1) {
        _this._setActiveLabel(label);
      }
    });
  },

  _saveNewLabel(label) {
    let previousLabel = null;
    _(this.state).each((val, key) => {
      if (val.search('active') > -1 && val.search('inactive') === -1) {
        previousLabel = key;
      }
    });
    if (label !== previousLabel) {
      API.addLabels([label], () => {
        if (previousLabel) {
          API.removeLabel(previousLabel);
        }
      });
    } else {
      API.removeLabel(label);
    }
  },

  clickNSave(label) {
    this._saveNewLabel(label);
    this._setActiveLabel(label);
  },

  /**
   * Sets a single label to be active (or if already active, then turns all of them off)
   *
   * @author Tim Golen <tim@golen.net>
   *
   * @date 2015-07-30
   *
   * @param {String} label
   */
  _setActiveLabel(label) {
    const initialState = this.getInitialState();
    let newState = {};

    // If that label is already active, then set everything back
    // to the default (which removes all labels)
    if (this.state[label].indexOf(' active') > -1) {
      this.setState(initialState);
      return;
    }

    // Set all the proper active/inactive classes
    newState = _(initialState).mapObject((val, key) => {
      return key === label
        ? defaultBtnClass + ' k2-' + key + ' active'
        : defaultBtnClass + ' k2-' + key + ' inactive';
    });
    this.setState(newState);
  },
  render() {
    return (
      <div>
       <label>Area</label>
       <BtnGroup>
        {_(_(this.state).keys()).map(label => <button className={this.state[label]} aria-label={label} onClick={() => this.clickNSave(label)}>{label[0].toUpperCase()}</button>)}
       </BtnGroup>
      </div>
    );
  }
});
