'use strict';

/**
 * This pages manages the branch pages
 */

let $ = require('jquery');
let Base = require('./_base');
let tplButton = require('../../../template/button.github.all.html');

module.exports = function() {
  let AllPages = new Base();

  AllPages.init = function() {
    this.setup();
  };

  /**
   * Add buttons to the page and setup the event handler
   */
  AllPages.setup = function() {
    let button;

    // Insert the kernel button right after the code button in the navigation
    // if it's there
    // We also make sure to not show it multiple times
    if (!$('.js-repo-nav .k2-extension').length) {
      button = tplButton({
        url: '#'
      });
      $('.js-repo-nav [data-hotkey="g w"]')
        .after(button)
        .end()
        .find('.js-repo-nav .k2-extension')
          .click(function(e) {
            let url = $('.pagehead .container h1 strong a').first().attr('href');
            // When the link is clicked, we need to take them to the homepage
            // of the repo with something in the hash.
            e.preventDefault();

            window.location = url + '#k2';

            // If we are staying on the same page, but adding the hash, then
            // we need to do a full reload
            if (url === window.location.pathname) {
              window.location.reload(true);
            }

            return false;
          });
    }
  };

  return AllPages;
};
