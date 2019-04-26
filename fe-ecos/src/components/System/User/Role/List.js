/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import Table from '../../../../containers/Shared/table/Table';
import Can from '../../../../containers/Shared/Can';
import { SELECTED_PAGE_SIZE } from '../../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import Moment from 'react-moment';

import { confirmAlert } from 'react-confirm-alert';
import ConfirmPicker from '../../../../containers/Shared/picker/ConfirmPicker';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  getRoleList,
  toggleRoleModal,
  deleteRoleItem
} from "../../../../redux/actions";
import Action from './Action';


const RoleFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

RoleFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
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
            onDelete={() => this.props.deleteRoleItem(ids, messages)}
            messages ={messages}
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

    if (this.props.role.paramSearch) {
      Object.assign(params, { "query": this.props.role.paramSearch })
    };
    this.props.getRoleList(params, this.props.history);

    this.setState({
      selectedPageSize: size
    });
  }

  toggleModal = (e, type, status) => {
    e.stopPropagation();
    this.props.toggleRoleModal(type, status);
  }

  onChangePage = (page) => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    if (this.props.role.paramSearch) {
      Object.assign(params, { "query": this.props.role.paramSearch })
    };
    this.props.getRoleList(params);

    this.setState({
      currentPage: page
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.role && nextProps.role.total) {
      this.setState({
        total: nextProps.role.total
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
    Object.assign(params, { "query": { "name": this.state.searchRole } });
    this.props.getRoleList(params);
  }

  handleChange = (e) => {
    this.setState({ searchRole: e.target.value });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSearch(e);
    }
  }

  renderHeader = (selected) => {
    const { modalOpen } = this.props.role;
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <ButtonToolbar className="master-data-list__btn-toolbar-top">
          <Can user={this.props.authUser.user} permission="role" action="add">
            <Button
              color="success"
              onClick={(e) => this.toggleModal(e, 'add', null)}
              className="master-data-btn"
              size="sm"
            >{messages['role.add-new']}</Button>
          </Can>
          <Action modalOpen={modalOpen} />
          <form className="form">
            <div className="form__form-group products-list__search">
              <input placeholder="Search..." name="search" onKeyPress={this.handleKeyPress} onChange={event => { this.setState({ searchRole: event.target.value }) }} />
              <MagnifyIcon />
            </div>
          </form>
          <Can user={this.props.authUser.user} permission="role" action="delete">
            {selected.length > 0 &&
              <Button
                color="danger"
                onClick={(e) => this.onDelete(e, selected)}
                className="master-data-btn"
                size="sm"
              >{messages['role.delete']}</Button>
            }
          </Can>

        </ButtonToolbar>
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.role;
    const { messages, locale } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
          Header: messages['name'],
          accessor: "name",
          width: 150,
          Cell: ({ original }) => {
            return(
              locale === 'en-US' ? original.name_en : original.name
            )
          },
          sortable: false,
        }, {
          Header: messages['description'],
          accessor: "description",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.description_en : original.description
            )
          },
          
          sortable: false,
        }, {
          Header: messages['status'],
          accessor: "status",
          width: 120,
          Cell: ({ original }) => {
            return (
              original.status === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>
            )
          },
          className: "text-center",
          sortable: false,
        }, {
          Header: messages['created-at'],
          accessor: "created_at",
          width: 120,
          className: "text-center",
          Cell: ({ original }) => { return (<Moment fromNow format="D/MM/YYYY" locale={locale}>{new Date(original.created_at)}</Moment>) },
          sortable: false,
        },
        {
          Header: messages['action'],
          accessor: "",
          width: 120,
          className: "text-center",
          Cell: ({ original }) => {
            return (
              <Fragment>
                <Can user={this.props.authUser.user} permission="role" action="view" own={original.created_by}><Button color="info" size="sm" onClick={(e) => this.toggleModal(e, 'view', original)}><span className="lnr lnr-eye" /></Button> &nbsp;</Can>
                <Can user={this.props.authUser.user} permission="role" action="edit" own={original.created_by}><Button color="info" size="sm" onClick={(e) => this.toggleModal(e, 'edit', original)}><span className="lnr lnr-pencil" /></Button> &nbsp;</Can>
                <Can user={this.props.authUser.user} permission="role" action="delete" own={original.created_by}><Button color="danger" size="sm" onClick={(e) => this.onDelete(e, [original.id])}><span className="lnr lnr-trash" /></Button></Can>
              </Fragment>
            );
          },
          sortable: false,
        }
      ]
    }
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
  getRoleList: PropTypes.func.isRequired,
  toggleRoleModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ users, authUser }) => {
  const { role } = users;
  return {
    role,
    authUser
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getRoleList,
    toggleRoleModal,
    deleteRoleItem
  }
)(List));
