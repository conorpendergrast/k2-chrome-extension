'use strict';

/**
 * This pages manages the pull requests page
 */

let $ = require('jquery');
let Base = require('./_base');

module.exports = function () {
  let PrPage = new Base();

  /**
   * Add buttons to the page and setup the event handler
   */
  PrPage.urlPath = '^(/[\\w-]+/[\\w-]+/pull/[0-9]+(?:/commits)?(?:/files)?)$';

  /**
   * Add buttons to the page and setup the event handler
   */
  PrPage.setup = function() {
    let prTitle = $('.js-issue-title').text();
    if (prTitle.toLowerCase().indexOf('hold') > -1) {
      $('.merge-message .js-details-target')
        .addClass('tooltipped')
        .addClass('tooltipped-n')
        .removeClass('btn-primary')
        .attr('disabled', 'disabled')
        .attr('aria-label', 'Remove the word "hold" from the title of the PR to make it mergable');
      $('.branch-action')
        .removeClass('branch-action-state-clean')
        .addClass('branch-action-state-dirty');
      $('.merge-branch-heading').text('This pull request has a hold on it and cannot be merged');
    }
  };

  return PrPage;
};
