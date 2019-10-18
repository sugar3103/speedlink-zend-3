import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
class ItemPerPage extends Component {

  changePageSize = (e) => {
    const value = e.target.value;
    this.props.changePageSize(value);
  }

  showPageOption = () => {
    const { optionPage } = this.props;
    const pageSize = optionPage ? optionPage : PAGE_SIZE;
    return pageSize.map((size, index) => {
      return (
        <option value={size} key={index}>{size}</option>
      )
    });
  }

  render() {
    const { messages } = this.props.intl;

    return (
      <p className="master-data-perpage">{messages['show']}
        <select className="select-options" value={this.props.selectedPageSize} onChange={this.changePageSize}>
          {this.showPageOption()}
        </select>
        {messages['entries']}
      </p>
    );
  }
}

ItemPerPage.propTypes = {
  selectedPageSize: PropTypes.number.isRequired,
  changePageSize: PropTypes.func.isRequired
}

export default injectIntl(connect(null)(ItemPerPage));
