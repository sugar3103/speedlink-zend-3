/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import Table from '../../../../containers/Shared/table/Table';
import Can from '../../../../containers/Shared/Can';

import { SELECTED_PAGE_SIZE } from '../../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import Moment from 'react-moment';

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

    this.handleKeyPress = this.handleKeyPress.bind(this)
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

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSearch(e);
    }
  }

  renderHeader = (selected) => {
    const { modalOpen } = this.props.permission;
    const { messages } = this.props.intl;
    const { user } = this.props.authUser;
    return (
      <Fragment>
        <ButtonToolbar className="master-data-list__btn-toolbar-top">
          <Can user={user} permission="permission" action="add">
            <Button
              color="success"
              onClick={(e) => this.toggleModal(e, 'add', null)}
              className="master-data-btn"
              size="sm"
            >{messages['permission.add-new']}</Button>
          </Can>
          <Action modalOpen={modalOpen} />
          <form className="form">
            <div className="form__form-group products-list__search">
              <input placeholder={messages['search']} name="search" onKeyPress={this.handleKeyPress} onChange={event => { this.setState({ searchPermission: event.target.value }) }} />
              <MagnifyIcon />
            </div>
          </form>
          <Can user={user} permission="permission" action="delete">
            {selected.length > 0 &&
              <Button
                color="danger"
                onClick={(e) => this.onDelete(e, selected)}
                className="master-data-btn"
                size="sm"
              >{messages['permission.delete']}</Button>
            }
          </Can>

        </ButtonToolbar>
      </Fragment>
    )
  }
  render() {
    const { items, loading, total } = this.props.permission;
    const { messages, locale } = this.props.intl;
    const { user } = this.props.authUser;

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
          Cell: ({ original }) => {
            return (
              <Moment fromNow format="D/MM/YYYY" locale={locale}>{new Date(original.created_at)}</Moment>
            )
          },
          className: 'text-center',
          sortable: false,
        },
        {
          Header: messages['action'],
          accessor: "",
          className: "text-center",
          Cell: ({ original }) => {
            return (
              <Fragment>
                <Can user={user} permission="permission" action="view"><Button color="info" size="sm" onClick={(e) => this.toggleModal(e, 'view', original)}><span className="lnr lnr-eye" /></Button>&nbsp;&nbsp;</Can>
                <Can user={user} permission="permission" action="edit"><Button color="info" size="sm" onClick={(e) => this.toggleModal(e, 'edit', original)}><span className="lnr lnr-pencil" /></Button>&nbsp;</Can>
                <Can user={user} permission="permission" action="delete"> <Button color="danger" size="sm" onClick={(e) => this.onDelete(e, [original.id])}><span className="lnr lnr-trash" /></Button>&nbsp;</Can>                
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
          <CardBody className="master-data-list">
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
  togglePermissionModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ users, authUser }) => {
  const { permission } = users;
  return {
    permission,
    authUser
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
