import React, { Component } from 'react';

class ItemPerPage extends Component {
  render() {
    return (
      <div className="col-sm-12 col-md-6">
        <div className="dataTables_length float-right" id="datatable_length"><label>Show <select name="datatable_length" aria-controls="datatable" className="form-control form-control-sm">
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select> entries</label></div>
      </div>
    );
  }
}

export default ItemPerPage;