/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import Item from './Item';
import Table from '../../../../containers/Shared/table/Table';
import { SELECTED_PAGE_SIZE } from '../../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import MagnifyIcon from 'mdi-react/MagnifyIcon';

import { confirmAlert } from 'react-confirm-alert';
import ConfirmPicker from '../../../../containers/Shared/picker/ConfirmPicker';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  getPermissionList,
  togglePermissionModal,
  deletePermissionItem
} from "../../../../redux/actions";


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
      currentPage: 1
    };
  }

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker
            onClose={onClose}
            onDelete={() => this.props.deletePermissionItem(ids, messages)}
            messages={messages}
          />
        )
      }
    })
  }

  onChangePageSize = (size) => {
    size = parseInt(size, 10);
    let params = {
      offset: {
        start: 1,
        limit: size
      }
    }

    this.props.getPermissionList(params, this.props.history);

    this.setState({
      selectedPageSize: size
    });
  }

  toggleModal = (e, type, status) => {
    e.stopPropagation();
    this.props.togglePermissionModal(type, status);
  }

  onChangePage = (page) => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    this.props.getPermissionList(params);

    this.setState({
      currentPage: page
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.permission && nextProps.permission.total) {
      this.setState({
        total: nextProps.permission.total
      });
    }
  }

  componentDidMount() {
    // this.props.getPermissionList();
  }

  showPermissionItem = (items, messages) => {
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item
            key={index}
            permission={item}
          />
        )
      })
    } else {
      result = (
        <tr><td colSpan={8} className="text-center">{messages['no-result']}</td></tr>
      )
    }
    return result;
  }

  handleSearch = (e) => {
    e.preventDefault();

    let params = {
      offset: {
        start: 1,
        limit: this.state.selectedPageSize
      }
    }
    Object.assign(params, { "query": { "name": this.state.searchPermission } });
    this.props.getPermissionList(params);
  }

  handleChange = (e) => {
    this.setState({ searchPermission: e.target.value });
  }

  renderHeader = (selected) => {
    const { modalOpen } = this.props.permission;
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Button
          color="success"
          onClick={(e) => this.toggleModal(e, 'add', null)}
          className="master-data-btn"
          size="sm"
        >{messages['permission.add-new']}</Button>
        <Action modalOpen={modalOpen} />
        {selected.length > 0 &&
          <Button
            color="danger"
            onClick={(e) => this.onDelete(e, selected)}
            className="master-data-btn"
            size="sm"
          >{messages['permission.delete']}</Button>
        }
      </Fragment>
    )
  }
  render() {
    const { items, loading, total } = this.props.permission;
    const { messages, locale } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
          Header: messages['name'],
          accessor: "name",
          width: 150,
          sortable: false,
        },
        {
          Header: messages['description'],
          accessor: "description",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.description_en : original.description
            )
          },
          sortable: false,
        },
        {
          Header: messages['created-at'],
          accessor: "created_at",
          sortable: false,
        },
        {
          Header: messages['action'],
          accessor: "",
          className: "text-center",
          Cell: ({ original }) => {
            return (
              <Fragment>
                <Button color="info" size="sm" onClick={(e) => this.toggleModal(e, 'edit', original)}><span className="lnr lnr-pencil" /></Button> &nbsp;
                <Button color="danger" size="sm" onClick={(e) => this.onDelete(e, [original.id])}><span className="lnr lnr-trash" /></Button>
              </Fragment>
            );
          },
          sortable: false,
        }
      ]
    };
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="permission-list">
            <Table
              renderHeader={this.renderHeader}
              loading={loading}
              columnTable={columnTable}
              pages={{
                pagination: this.state,
                total: total,
                onChangePage: this.onChangePage
              }}
              size={{
                selectedPageSize: this.state.selectedPageSize,
                changePageSize: this.onChangePageSize
              }}
              data={items}
              onRowClick={this.toggleModal}
            />
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
    deletePermissionItem
  }
)(List));
