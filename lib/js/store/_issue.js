'use strict';
let alreadyFetched = false;

class BaseStore {
  constructor() {
    this.loading = false;
    this.data = [];
    this.errorMessage = null;
  }
  handleFetch() {
    if (!alreadyFetched) {
      this.loading = true;
      this.data = [];
      alreadyFetched = true;
    }
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
