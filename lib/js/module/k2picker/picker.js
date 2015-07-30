'use strict';
/*global console */

const React = require('react');
const BtnGroup = require('../../component/btngroup/index');
const defaultBtnClass = 'btn btn-sm tooltipped tooltipped-n';

module.exports = React.createClass({
  getInitialState() {
    return {
      hourly: defaultBtnClass + ' k2-hourly',
      daily: defaultBtnClass + ' k2-daily',
      weekly: defaultBtnClass + ' k2-weekly',
      monthly: defaultBtnClass + ' k2-monthly'
    };
  },
  setHourly() {
    if (this.state.hourly.indexOf(' active') > -1) {
      this.setState(this.getInitialState());
      return;
    }
    this.setState({
      hourly: defaultBtnClass + ' k2-hourly active',
      daily: defaultBtnClass + ' k2-daily inactive',
      weekly: defaultBtnClass + ' k2-weekly inactive',
      monthly: defaultBtnClass + ' k2-monthly inactive'
    });
  },
  setDaily() {
    console.log(this.state.daily);
    if (this.state.daily.indexOf(' active') > -1) {
      this.setState(this.getInitialState());
      return;
    }
    this.setState({
      hourly: defaultBtnClass + ' k2-hourly inactive',
      daily: defaultBtnClass + ' k2-daily active',
      weekly: defaultBtnClass + ' k2-weekly inactive',
      monthly: defaultBtnClass + ' k2-monthly inactive'
    });
  },
  setWeekly() {
    if (this.state.weekly.indexOf(' active') > -1) {
      this.setState(this.getInitialState());
      return;
    }
    this.setState({
      hourly: defaultBtnClass + ' k2-hourly inactive',
      daily: defaultBtnClass + ' k2-daily inactive',
      weekly: defaultBtnClass + ' k2-weekly active',
      monthly: defaultBtnClass + ' k2-monthly inactive'
    });
  },
  setMonthly() {
    if (this.state.monthly.indexOf(' active') > -1) {
      this.setState(this.getInitialState());
      return;
    }
    this.setState({
      hourly: defaultBtnClass + ' k2-hourly inactive',
      daily: defaultBtnClass + ' k2-daily inactive',
      weekly: defaultBtnClass + ' k2-weekly inactive',
      monthly: defaultBtnClass + ' k2-monthly active'
    });
  },
  render() {
    return (
      <BtnGroup>
        <button className={this.state.hourly} aria-label="Hourly" onClick={this.setHourly}>H</button>
        <button className={this.state.daily} aria-label="Daily" onClick={this.setDaily}>D</button>
        <button className={this.state.weekly} aria-label="Weekly" onClick={this.setWeekly}>W</button>
        <button className={this.state.monthly} aria-label="Monthly" onClick={this.setMonthly}>M</button>
      </BtnGroup>
    );
  }
});
