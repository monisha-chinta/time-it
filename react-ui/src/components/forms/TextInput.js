import React, { Component } from 'react';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
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
        value: value
      })
    }
  }

  onChange(e) {
    this.checkStatus(e);
  }

  onBlur(e) {
    this.checkStatus(e);
  }

  getValue() {
    return this.state.value;
  }

  resetValue() {
    this.setState({
      value: ''
    });
  }

  render() {
    const { defaultValue, width, text } = this.props;
    let name = text.toLowerCase();
    return (
      <div className={'form-group ' + width + this.state.errorClass}>
        <label className="sr-only" for="task">{text}</label>
        <input type="text" ref="inputField" defaultValue={this.state.value}
               className="form-control add-task-input"
               placeholder={text}
               onChange={this.onChange.bind(this)}
               onBlur={this.onBlur.bind(this)} />
        <span class="glyphicon glyphicon-warning-sign form-control-feedback" aria-hidden="true"></span>
      </div>
    );
  }

}

export default TextInput;
