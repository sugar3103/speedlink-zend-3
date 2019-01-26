import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PAGE_SIZE } from '../../../constants/defaultValues';

class ItemPerPage extends Component {

  changePageSize = (e) => {
    const value = e.target.value;
    this.props.changePageSize(value);
  }

  showPageOption = () => {
    return PAGE_SIZE.map((size, index) => {
      return (
        <option value={size} key={index}>{size}</option>
      )
    });
  }

  render() {
    return (
      <p className={'float-right'}>Show
        <select className="select-options" value={this.props.selectedPageSize} onChange={this.changePageSize}>
          {this.showPageOption()}
        </select>
        entries
      </p>
    );
  }
}

ItemPerPage.propTypes = {
  selectedPageSize: PropTypes.number.isRequired,
  changePageSize: PropTypes.func.isRequired
}

export default ItemPerPage;