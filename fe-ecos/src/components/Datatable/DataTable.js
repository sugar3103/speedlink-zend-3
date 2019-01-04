import React, { Component } from 'react';

class DataTable extends Component {

  renderHeader = (ths) => {
    var result = null;
    if (ths.length > 0) {
      result = ths.map((th, index) => {
        var className = th.className ? th.className : '';
        var style = th.style ? th.style : '';
        return (
          <th key={index} className={`text-center ${className}`} style={style}>{th.value}</th>
        )
      });
    }
    return result;
  }

  render() {
    return (
      <div className="col-sm-12">
        <table id="datatable" className="table table-bordered dt-responsive nowrap dataTable no-footer dtr-inline" style={{ borderCollapse: 'collapse', borderSpacing: '0px', width: '100%' }} role="grid" aria-describedby="datatable_info">
          <thead>
            <tr role="row">
              {this.renderHeader(this.props.thead)}
            </tr>
          </thead>
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      </div>
    );
  }
};

export default DataTable;