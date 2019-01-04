import React, { Component } from 'react';
import { PAGE_LIMIT_OPTION } from '../../constants/config';

class ItemPerPage extends Component {

  handleChangePerPage = (e) =>{
    const value = e.target.value;
    this.props.handleChangePerPage(value);
  }

  showPageOption = () => {
    return PAGE_LIMIT_OPTION.map((limit, index) => {
      return (
        <option key={index} value={limit}>{limit}</option>
      )
    });
  }

  render() {
    return (
      <div className="col-sm-12 col-md-6">
        <div className="dataTables_length float-right" id="datatable_length"><label>Show &nbsp;
          <select 
            name="datatable_length" 
            aria-controls="datatable" 
            className="form-control form-control-sm"
            onChange={this.handleChangePerPage}
          >
          {this.showPageOption()}
        </select> entries</label></div>
      </div>
    );
  }
}

export default ItemPerPage;