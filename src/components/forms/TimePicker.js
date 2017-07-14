import React, { Component } from 'react';
import { getTimeRange } from '../../constants/TimeRange';

class TimeRangeLi extends Component {

  handleClick(e) {
    e.preventDefault();
    this.props.handleClick(this.props.text);
  }

  render() {
    return (
      <li><a href="#" onClick={this.handleClick.bind(this)}>{this.props.text}</a></li>
    )
  }
}


class TimePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.defaultValue
    };
  }

  getTime() {
    return this.state.time;
  }

  handleClick(text) {
    this.setState({
      time : text
    });
  }

  render() {
    const timeRange = getTimeRange().map((time) => {
      return (
        <TimeRangeLi text={time} handleClick={this.handleClick.bind(this)}></TimeRangeLi>
      )
    })
    return (
      <div className="dropdown">
        <input type="text" defaultValue={this.state.time} value={this.state.time} className="form-control dropdown-toggle add-task-input" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
        <ul className="dropdown-menu time-picker">
          {timeRange}
        </ul>
      </div>
    );
  }

}

export default TimePicker;
