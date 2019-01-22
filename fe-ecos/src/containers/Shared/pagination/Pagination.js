/* eslint-disable */
import React, { PureComponent } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronDoubleLeftIcon from 'mdi-react/ChevronDoubleLeftIcon';
import ChevronDoubleRightIcon from 'mdi-react/ChevronDoubleRightIcon';
import { PAGE_LIMIT } from '../../../constants/defaultValues';

export default class PaginationComponent extends PureComponent {
  static propTypes = {
    onChangePage: PropTypes.func.isRequired,
    pagination: PropTypes.shape({
      currentPage: PropTypes.number.isRequired,
      selectedPageSize: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    }).isRequired
  };

  onChangePage = (e) => {
    this.props.onChangePage(e);
  }

  render() {
    const { pagination } = this.props;
    const { total, currentPage, selectedPageSize } = pagination;
    const totalPage = Math.ceil(total / selectedPageSize);
    const pageLimit = PAGE_LIMIT;

    let startPoint = 1;
    let endPoint = pageLimit;

    if (pageLimit > totalPage) {
      startPoint = 1;
      endPoint = totalPage;
    } else if (currentPage <= parseInt(pageLimit / 2, 10)) {
      startPoint = 1;
      endPoint = pageLimit;
    } else if (currentPage + parseInt(pageLimit / 2, 10) <= totalPage) {
      startPoint = currentPage - parseInt(pageLimit / 2, 10);
      endPoint = currentPage + parseInt(pageLimit / 2, 10);
    } else {
      startPoint = totalPage - (pageLimit - 1);
      endPoint = totalPage;
    }
    startPoint = startPoint === 0 ? 1 : startPoint;
    const points = [];
    for (var i = startPoint; i <= endPoint; i++) {
      points.push(i);
    }

    return (
      <div className="pagination__wrap">
        <Pagination className="pagination">
          <PaginationItem className="pagination__item" disabled={currentPage === 1}>
            <PaginationLink
              className="pagination__link pagination__link--arrow"
              type="button"
              onClick={() => this.onChangePage(1)}
            >
              <ChevronDoubleLeftIcon className="pagination__link-icon" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="pagination__item" disabled={currentPage === 1}>
            <PaginationLink
              className="pagination__link pagination__link--arrow"
              type="button"
              onClick={() => this.onChangePage(currentPage - 1)}
            >
              <ChevronLeftIcon className="pagination__link-icon" />
            </PaginationLink>
          </PaginationItem>
          {points.map((page, index) =>
            (<PaginationItem className="pagination__item" key={index} active={currentPage === page}>
              <PaginationLink className="pagination__link" type="button" onClick={() => this.onChangePage(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>))}
          <PaginationItem className="pagination__item" disabled={currentPage === totalPage}>
            <PaginationLink
              className="pagination__link pagination__link--arrow"
              type="button"
              onClick={() => this.onChangePage(currentPage + 1)}
            >
              <ChevronRightIcon className="pagination__link-icon" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="pagination__item" disabled={currentPage === totalPage}>
            <PaginationLink
              className="pagination__link pagination__link--arrow"
              type="button"
              onClick={() => this.onChangePage(totalPage)}
            >
              <ChevronDoubleRightIcon className="pagination__link-icon" />
            </PaginationLink>
          </PaginationItem>
        </Pagination>
        <div className="pagination-info">
          <span>Showing {`${selectedPageSize * (currentPage - 1) + 1} `}
            to {selectedPageSize * currentPage > total ? total
              : selectedPageSize * currentPage} of {total}
          </span>
        </div>
      </div>
    );
  }
}
