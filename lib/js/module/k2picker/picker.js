'use strict';
/*global console */

const React = require('react');
const BtnGroup = require('../../component/btngroup/index');

module.exports = React.createClass({
  render() {
    return (
      <BtnGroup>
        <button className="btn btn-sm tooltipped tooltipped-n k2-hourly inactive" aria-label="Hourly">H</button>
        <button className="btn btn-sm tooltipped tooltipped-n k2-daily inactive" aria-label="Daily">D</button>
        <button className="btn btn-sm tooltipped tooltipped-n k2-weekly inactive" aria-label="Weekly">W</button>
        <button className="btn btn-sm tooltipped tooltipped-n k2-monthly active" aria-label="Monthly">M</button>
      </BtnGroup>
    );
  }
});
