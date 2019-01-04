import React, { Component } from 'react';
import Pagination from "react-js-pagination";

class PaginationTable extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      itemsCountPerPage: 1,
      totalItemsCount: 1,
      activePage: 1,
      from: 1,
      to: 1,
    };
  }

  componentDidMount() {
    const { pagination } = this.props;
    this.setState({
      itemsCountPerPage: pagination.perpage,
      totalItemsCount: pagination.total,
      activePage: pagination.page,
      from: pagination.from,
      to: pagination.to
    });
  }
  

  handlePageChange = (pageNumber) => {
    this.props.handlePageChange(pageNumber);
  }

  render() {
    const { itemsCountPerPage, totalItemsCount, activePage, from , to } = this.state;
    return (
      <React.Fragment>
        <div className="col-sm-12 col-md-5">
          <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">{`Showing ${from} to ${to} of ${totalItemsCount} entries`}</div>
        </div>
        <div className="col-sm-12 col-md-7">
          <div className="dataTables_paginate" id="datatable_paginate">
            <Pagination
              activePage={activePage}
              itemsCountPerPage={itemsCountPerPage}
              totalItemsCount={totalItemsCount}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              prevPageText="Previous"
              firstPageText="First"
              lastPageText="Last"
              nextPageText="Next"
              itemClass="paginate_button page-item"
              linkClass="page-link"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
    
export default PaginationTable;