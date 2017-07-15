import React, { Component } from 'react';

class SortDropdown extends Component {
  handleSortByUser(e) {
    e.preventDefault();
    this.props.handleSortByUser();
  }

  handleSortByTime(e) {
    e.preventDefault();
    this.props.handleSortByTime();
  }

  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-default dropdown-toggle sort-button" type="button" id="sortdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          Sort&nbsp;
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="sortdownMenu1">
          <li><a href="#" onClick={this.handleSortByUser.bind(this)}>User</a></li>
          <li><a href="#" onClick={this.handleSortByTime.bind(this)}>Time</a></li>
        </ul>
      </div>
    );
  }

}

export default SortDropdown;
