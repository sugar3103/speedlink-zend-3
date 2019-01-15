import React from "react";
import PropTypes from 'prop-types';
import { Colxx } from "./CustomBootstrap";
import { Nav, NavItem, NavLink } from "reactstrap";
class Pagination extends React.Component {

  onChangePage = (e) => {
    this.props.onChangePage(e);
  }

  render() {
    const { meta } = this.props;
    const totalPage = meta.totalPage;
    const currentPage = meta.page;
    const numberLimit = 5;
    const lastIsActive = true;
    const firstIsActive = true;

    let startPoint = 1;
    let endPoint = numberLimit;

    if (numberLimit > totalPage) {
      startPoint = 1;
      endPoint = totalPage;
    } else if (currentPage <= parseInt(numberLimit / 2, 10)) {
      startPoint = 1;
      endPoint = numberLimit;
    } else if (currentPage + parseInt(numberLimit / 2, 10) <= totalPage) {
      startPoint = currentPage - parseInt(numberLimit / 2, 10);
      endPoint = currentPage + parseInt(numberLimit / 2, 10);
    } else {
      startPoint = totalPage - (numberLimit - 1);
      endPoint = totalPage;
    }
    startPoint = startPoint === 0 ? 1 : startPoint;
    const points = [];
    for (var i = startPoint; i <= endPoint; i++) {
      points.push(i);
    }

    let firstPageButtonClassName = currentPage <= 1 ? "disabled" : "";
    let lastPageButtonClassName = currentPage >= totalPage ? "disabled" : "";
    let prevPageButtonClassName = currentPage <= 1 ? "disabled" : "";
    let nextPageButtonClassName = currentPage >= totalPage ? "disabled" : "";
    return totalPage > 1 ? (
      <div className="mb-2">
        <span className="page-info">{`Show ${meta.from} to ${meta.to} of ${meta.totalItems} entries`}</span>
        <Nav className="pagination justify-content-center float-sm-right">
          {firstIsActive && (
            <NavItem className={`page-item ${firstPageButtonClassName}`}>
              <NavLink
                className="page-link first"
                onClick={() => this.onChangePage(1)}
              >
                <i className="simple-icon-control-start" />
              </NavLink>
            </NavItem>
          )}

          <NavItem className={`page-item ${prevPageButtonClassName}`}>
            <NavLink
              className="page-link prev"
              onClick={() => this.onChangePage(currentPage - 1)}
            >
              <i className="simple-icon-arrow-left" />
            </NavLink>
          </NavItem>
          {points.map(i => {
            return (
              <NavItem
                key={i}
                className={`page-item ${currentPage === i && "active"}`}
              >
                <NavLink
                  className="page-link"
                  onClick={() => this.onChangePage(i)}
                >
                  {i}
                </NavLink>
              </NavItem>
            );
          })}
          <NavItem className={`page-item ${nextPageButtonClassName}`}>
            <NavLink
              className="page-link next"
              onClick={() => this.onChangePage(currentPage + 1)}
            >
              <i className="simple-icon-arrow-right" />
            </NavLink>
          </NavItem>
          {lastIsActive && (
            <NavItem className={`page-item ${lastPageButtonClassName}`}>
              <NavLink
                className="page-link last"
                onClick={() => this.onChangePage(totalPage)}
              >
                <i className="simple-icon-control-end" />
              </NavLink>
            </NavItem>
          )}
        </Nav>
        <div className="clearfix"></div>
      </div>
    ) : (
        <Colxx xxs="12" className="mt-2" />
      );
  }
}

Pagination.propTypes = {
  meta: PropTypes.shape({
      from: PropTypes.number.isRequired,
      to: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired,
      totalItems: PropTypes.number.isRequired,
      totalPage: PropTypes.number.isRequired,
    }).isRequired,
  onChangePage: PropTypes.func.isRequired
}

export default Pagination;
