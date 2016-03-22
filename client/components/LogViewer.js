import React from 'react';

export default class LogViewer extends React.Component {
  componentWillMount() {
    this.intervals = [];
  }

  setInterval() {
    this.intervals.push(setInterval.apply(null, arguments));
  }

  componentWillUnmount() {
    this.intervals.forEach(clearInterval);
  }

  componentDidMount() {
    const { interval, polling } = this.props;
    polling();
    this.setInterval(polling, interval);
  }

  render() {
    const { value } = this.props;
    return <pre>{value}</pre>
  }
}
