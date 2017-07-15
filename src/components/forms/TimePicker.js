import React, { Component } from 'react';
import { getTimeRange } from '../../constants/TimeRange';
import { formatTime } from '../../utils/TimeUtils';

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
      time: props.defaultValue ? formatTime(props.defaultValue) : '',
      errorClass: ''
    };
  }

  checkStatus(e) {
    let value = e.target.value.trim();
    if(value.length == 0) {
      this.setState({
        errorClass: ' has-error had-feedback'
      })
    } else {
      this.setState({
        errorClass: '',
        time: value
      })
    }
  }

  onChange(e) {
    this.checkStatus(e);
  }

  onBlur(e) {
    this.checkStatus(e);
  }

  getTime() {
    return this.state.time;
  }

  resetTime() {
    this.setState({
      time: ''
    })
  }

  handleClick(text) {
    if(text.length == 0) {
      this.setState({
        errorClass: ' has-error had-feedback'
      })
    } else {
      this.setState({
        errorClass: '',
        time: text
      })
    }
  }

  render() {
    const timeRange = getTimeRange().map((time) => {
      return (
        <TimeRangeLi text={time} handleClick={this.handleClick.bind(this)}></TimeRangeLi>
      )
    })
    return (
      <div className={'form-group col-md-1 add-task-time ' + this.state.errorClass}>
        <label className="sr-only" for="to">To</label>
        <div className="dropdown">
          <input type="text" defaultValue={this.state.time}
                 value={this.state.time} placeholder={this.props.text}
                 className="form-control dropdown-toggle add-task-input"
                 data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                 onChange={this.onChange.bind(this)}
                 onBlur={this.onBlur.bind(this)} />
          <ul className="dropdown-menu time-picker">
            {timeRange}
          </ul>
        </div>
      </div>
    );
  }

}

export default TimePicker;
