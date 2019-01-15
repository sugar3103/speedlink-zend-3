import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  DropdownMenu, 
  DropdownItem, 
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { PAGE_SIZE } from '../../constants/defaultValues';

class ItemPerPage extends Component {

  changePageSize = (e) => {
    this.props.changePageSize(e);
  }

  showPageOption = () => {
    return PAGE_SIZE.map((size, index) => {
      return (
        <DropdownItem key={index} onClick={() => this.changePageSize(size)}>{size}</DropdownItem>
      )
    });
  }

  render() {
    return (
      <div className="float-sm-right">
        <UncontrolledDropdown className="d-inline-block">
          <DropdownToggle caret color="outline-dark" size="sm">
            {this.props.selectedPageSize}
          </DropdownToggle>
          <DropdownMenu right>
            {this.showPageOption()}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}

ItemPerPage.propTypes = {
  selectedPageSize: PropTypes.number.isRequired,
  changePageSize: PropTypes.func.isRequired
}

export default ItemPerPage;