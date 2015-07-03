'use strict';

class BaseStore {
  constructor() {
    this.loading = false;
    this.data = [];
    this.errorMessage = null;
  }
  handleFetch() {
    this.loading = true;
    this.data = [];
  }
  handleUpdate(data) {
    this.loading = false;
    this.data = data;
  }
  handleFailed(msg) {
    this.loading = false;
    this.errorMessage = msg;
  }
}

module.exports = BaseStore;
