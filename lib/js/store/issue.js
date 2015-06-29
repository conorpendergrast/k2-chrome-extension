'use strict';

let alt = require('../alt');
let IssueAction = require('../action/issue');

let IssueStore = {
  constructor() {
    this.loading = false;
    this.data = [];
    this.errorMessage = null;

    this.bindListeners({
      handleUpdate: IssueAction.UPDATE,
      handleFetch: IssueAction.FETCH,
      handleFailed: IssueAction.FAILED
    });
  },
  handleFetch() {
    this.loading = true;
    this.data = [];
  },
  handleUpdate(data) {
    this.loading = false;
    this.data = data;
  },
  handleFailed(msg) {
    this.loading = false;
    this.errorMessage = msg;
  }
};

module.exports = alt.createStore(IssueStore, 'IssueStore');
