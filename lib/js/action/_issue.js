'use strict';

class BaseAction {
  update(data) {
    this.dispatch(data);
  }
  failed(msg) {
    this.dispatch(msg);
  }
}

module.exports = BaseAction;
