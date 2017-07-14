import React, { Component } from 'react';
import { FormGroup, Radio } from 'react-bootstrap';

class SortToggle extends Component {
  toggle() {

  }

  render() {
    return (
      <FormGroup>
        <Radio name="sort">Time</Radio>
        <Radio name ="sort">Name</Radio>
      </FormGroup>
    );
  }

}

export default SortToggle;
