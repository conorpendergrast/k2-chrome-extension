'use strict';

/**
 * This pages manages the pull requests page
 */

let $ = require('jquery');
let Base = require('./_base');
let Dashboard = require('../../../module/dashboard/index');

module.exports = function() {
  let MainPage = new Base();

  /**
   * Add buttons to the page and setup the event handler
   */
  MainPage.urlPath = '^(/[\\w-]+/[\\w-]+/?)$';

  /**
   * Add buttons to the page and setup the event handler
   */
  MainPage.setup = function() {
    // Only do stuff if we are on the kernal page
    if (window.location.hash === '#k2') {
      let issues = new Dashboard();
      //$('body').addClass('dark');

      // Deselect the code button
      $('.sunken-menu-group li[aria-label="Code"] a').removeClass('selected');

      // Select our k2 button
      $('.sunken-menu-group .k2-extension a').addClass('selected');

      // make a skinny sidebar
      $('.repository-with-sidebar').removeClass('with-full-navigation');

      document.title = 'K2';

      issues.draw();
    }
  };

  return MainPage;
};
