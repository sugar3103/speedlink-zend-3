import React, { Component } from 'react';
import Pagination from "react-js-pagination";

class PaginationTable extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      itemsCountPerPage: 1,
      totalItemsCount: 1,
      activePage: 1,
      total: 1
    };
  }

  componentDidMount() {
    const { pagination } = this.props;
    this.setState({
      itemsCountPerPage: pagination.per_page,
      totalItemsCount: pagination.total,
      activePage: pagination.page
    });
  }
  

  handlePageChange = (pageNumber) => {
    this.props.handlePageChange(pageNumber);
  }

  render() {
    const { itemsCountPerPage, totalItemsCount, activePage, total } = this.state;
    return (
      <React.Fragment>
        <div className="col-sm-12 col-md-5">
          <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">{`Showing 1 to 10 of ${total} entries`}</div>
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