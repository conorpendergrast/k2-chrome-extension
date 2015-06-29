'use strict';

let alt = require('../alt');
let API = require('../lib/api');

module.exports = alt.createActions({
  fetch() {
    let _this = this;
    this.dispatch();

    API.getDailyIssues(function(err, data) {
      if (err) {
        return _this.failed(err);
      }

      _this.update(data);
    });
  },
  update(issues) {
    this.dispatch(issues);
  },
  failed(msg) {
    this.dispatch(msg);
  }
});
