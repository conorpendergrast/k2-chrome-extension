'use strict';

/**
 * This pages manages the issue page
 */

const $ = require('jquery');
const Base = require('./_base');
const K2picker = require('../../../module/k2picker/index');

module.exports = function () {
  const IssuePage = new Base();

  /**
   * Add buttons to the page and setup the event handler
   */
  IssuePage.urlPath = '^(/[\\w-]+/[\\w-]+/issues/[0-9]+)$';

  /**
   * Add buttons to the page and setup the event handler
   */
  IssuePage.setup = function() {
    if (!$('.k2picker-wrapper').length) {
      $('.sidebar-assignee').after('<div class="discussion-sidebar-item js-discussion-sidebar-item k2picker-wrapper"></div>');
      new K2picker().draw();
    }
  };

  return IssuePage;
};
