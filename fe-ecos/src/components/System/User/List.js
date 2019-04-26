/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import Table from '../../../containers/Shared/table/Table';
import Can from '../../../containers/Shared/Can';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import Moment from 'react-moment';

import {
  getUserList,
  toggleUserModal
} from "../../../redux/actions";
import Action from './Action';

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
    };
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  onChangePageSize = (size) => {
    size = parseInt(size, 10);
    let params = {
      offset: {
        start: 1,
        limit: size
      }
    }

    if (this.props.user.paramSearch) {
      Object.assign(params, { "query": this.props.user.paramSearch })
    };
    this.props.getUserList(params, this.props.history);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  }

  toggleModal = (e, type, status) => {
    e.stopPropagation();
    this.props.toggleUserModal(type, status);
  }
  onChangePage = (page) => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    if (this.props.user.paramSearch) {
      Object.assign(params, { "query": this.props.user.paramSearch })
    };
    this.props.getUserList(params);

    this.setState({
      currentPage: page
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    let params = {
      offset: {
        start: 1,
        limit: this.state.selectedPageSize
      }
    }
    Object.assign(params, { "query": { "name": this.state.searchUser } });
    this.props.getRoleList(params);
  }

  handleChange = (e) => {
    this.setState({ searchUser: e.target.value });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSearch(e);
    }
  }
  renderHeader = (selected) => {
    const { modalOpen } = this.props.user;
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <ButtonToolbar className="master-data-list__btn-toolbar-top">
          <Action modalOpen={modalOpen} />
          <form className="form">
            <div className="form__form-group products-list__search">
              <input placeholder={messages['search']} name="search" onKeyPress={this.handleKeyPress} onChange={event => { this.setState({ searchUser: event.target.value }) }} />
              <MagnifyIcon />
            </div>
          </form>

        </ButtonToolbar>
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.user;
    const { messages, locale } = this.props.intl;
    const columnTable = {
      checkbox: false,
      columns: [
        {
          Header: messages['user.avatar'],
          accessor: "avatar",
          sortable: false,
          width: 100,
          className: "text-center",
          Cell: ({ original }) => {
            return (
              // <div className="products-list__img-wrap">
              //   <img src={Ava} alt="avatar" />
              // </div>
              <i className="icon-avatar products-list__img-wrap" />
            )
          }
        },
        {
          Header: messages['user.username'],
          accessor: "username",
          sortable: false,
          Cell: ({ original }) => {
              if(this.props.authUser.user.id === original.id) {
                return (
                  <Fragment>
                    {original.username}<Badge color="danger" style={{margin: '0 0 0 12px'}}>{messages['user.you']}</Badge> 
                  </Fragment>
                )
              } else {
                return (
                  original.username
                )
              }
          }
        }, {
          Header: messages['user.fullname'],
          accessor: "full_name",
          sortable: false,
        }, {
          Header: messages['user.email'],
          accessor: "email",
          sortable: false,
        },

        {
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
          className: "text-center",
          Cell: ({ original }) => { return (<Moment fromNow format="D/MM/YYYY" locale={locale}>{new Date(original.created_at)}</Moment>) },
          sortable: false,
        },
        {
          Header: messages['action'],
          accessor: "",
          width: 100,
          className: "text-left",
          Cell: ({ original }) => {
            return (
              <Fragment>
                <Can user={this.props.authUser.user} permission="user" action="view" own={original.username}>
                  <Button color="success" size="sm" onClick={(e) => this.toggleModal(e, 'view', original)}><span className="lnr lnr-eye" /></Button> &nbsp;
                </Can>
                <Can user={this.props.authUser.user} permission="user" action="edit" own={original.username}>
                  <Button color="info" size="sm" onClick={(e) => this.toggleModal(e, 'edit', original)}><span className="lnr lnr-pencil" /></Button> &nbsp;
                </Can>
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
          <CardBody className="master-data-list products-list">
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
    )
  }
}

List.propTypes = {
  user: PropTypes.object.isRequired,
  getUserList: PropTypes.func.isRequired,
  toggleUserModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ users, authUser }) => {
  const { user } = users;
  return {
    user,
    authUser
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getUserList,
    toggleUserModal,
  }
)(List));
