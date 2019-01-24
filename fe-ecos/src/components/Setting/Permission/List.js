/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { ButtonToolbar, Card, CardBody, Col, Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Item from './Item';
import Pagination from '../../../containers/Shared/pagination/Pagination';
import ItemPerPage from '../../../containers/Shared/pagination/ItemPerPage';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';

import {
  getPermissionList,
  togglePermissionModal
} from "../../../redux/actions";


const PermissionFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

PermissionFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
      total: 20
    };
  }

  onChangePageSize = (size) => {
    size = parseInt(size, 10);
    let params = {
      offset: {
        start: 1,
        limit: size
      }
    }

    if (this.props.permisson.paramSearch) {
      Object.assign(params, { "query": this.props.permisson.paramSearch})
    };
    this.props.getPermissionList(params, this.props.history);

    this.setState({
      selectedPageSize: size
    });
  }

  toggleModal = () => {
    this.props.togglePermissionModal();
  }

  onChangePage = (page) => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    if (this.props.permisson.paramSearch) {
      Object.assign(params, { "query": this.props.permisson.paramSearch })
    };
    this.props.getPermissionList(params);

    this.setState({
      currentPage: page
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.permisson && nextProps.permisson.total) {
      this.setState({
        total: nextProps.permisson.total
      });
    }
  }

  componentDidMount() {
    this.props.getPermissionList();
  }

  showPermissionItem = (items) => {
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item 
            key={index}
            permisson={item}
          />
        )
      })
    }
    return result;
  }

  render() {
    const { items, loading, modalOpen,total } = this.props.permission;
    const { messages } = this.props.intl;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <div className="card__title">
              <h5 className="bold-text">{messages['permisson.list-title']}</h5>
              <ButtonToolbar className="master-data-list__btn-toolbar-top">
                <Button 
                  color="success" 
                  className="master-data-list__btn-add"
                  onClick={this.toggleModal}
                >{messages['permisson.add-new']}</Button>
              </ButtonToolbar>
              <Action modalOpen={modalOpen} />
            </div>
            <ItemPerPage selectedPageSize={this.state.selectedPageSize} changePageSize={this.onChangePageSize} />
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{messages['permisson.name']}</th>
                  <th>{messages['permisson.fullname']}</th>
                  <th>{messages['permisson.created-at']}</th>
                  <th className="text-center">{messages['permisson.action']}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="text-center"><div className="loading-table" /></td></tr>
                ) : (
                    this.showPermissionItem(items)
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
  permission: PropTypes.object.isRequired,
  getPermissionList: PropTypes.func.isRequired,
  togglePermissionModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ users }) => {
  console.log(users);
  
  const { permission } = users;
  return {
    permission,
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getPermissionList,
    togglePermissionModal,
  }
)(List));
