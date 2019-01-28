/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Card, CardBody, Col, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import Item from './Item';
import Pagination from '../../../../containers/Shared/pagination/Pagination';
import ItemPerPage from '../../../../containers/Shared/pagination/ItemPerPage';
import { SELECTED_PAGE_SIZE } from '../../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Search from './Search';

import {
  getCodeList,
} from "../../../../redux/actions";

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
    };
  }

  onChangePageSize = (size) => {
    const { messages } = this.props.intl;
    size = parseInt(size, 10);
    let params = {
      offset: {
        start: 1,
        limit: size
      }
    }

    if (this.props.code.paramSearch) {
      Object.assign(params, { "query": this.props.code.paramSearch})
    };
    this.props.getCodeList(params, messages);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  }

  onChangePage = (page) => {
    const { messages } = this.props.intl;
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    if (this.props.code.paramSearch) {
      Object.assign(params, { "query": this.props.code.paramSearch })
    };
    this.props.getCodeList(params, messages);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    const { messages } = this.props.intl;
    this.props.getCodeList(null, messages);
  }

  showCodeItem = (items) => {
    const { messages } = this.props.intl;
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item 
            key={index}
            code={item}
          />
        )
      })
    } else {
      result = (
        <tr><td colSpan={8} className="text-center">{messages['code.no-result']}</td></tr>
      )
    }
    return result;
  }

  render() {
    const { items, loading, total } = this.props.code;
    const { messages } = this.props.intl;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <Search />
            <div className="mb-2">
              <ItemPerPage selectedPageSize={this.state.selectedPageSize} changePageSize={this.onChangePageSize} />
            </div>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{messages['code.code']}</th>
                  <th>{messages['code.country']}</th>
                  <th>{messages['code.city']}</th>
                  <th>{messages['code.district']}</th>
                  <th>{messages['code.ward']}</th>
                  <th>{messages['code.created-at']}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="text-center"><div className="loading-table" /></td></tr>
                ) : (
                    this.showCodeItem(items)
                  )}
              </tbody>
            </Table>
            <Pagination pagination={this.state} total={total} onChangePage={this.onChangePage} />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  code: PropTypes.object.isRequired,
  getCodeList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ address }) => {
  const { code } = address;
  return {
    code
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getCodeList
  }
)(List));
