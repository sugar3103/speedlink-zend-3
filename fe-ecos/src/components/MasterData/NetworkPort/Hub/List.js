/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import Table from '../../../../containers/Shared/table/Table';
import Can from '../../../../containers/Shared/Can';
import Moment from 'react-moment';
import { SELECTED_PAGE_SIZE } from '../../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';
import { confirmAlert } from 'react-confirm-alert';
import ConfirmPicker from '../../../../containers/Shared/picker/ConfirmPicker';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MODAL_EDIT } from '../../../../constants/defaultValues';

import {
  getHubList,
  toggleHubModal,
  deleteHubItem
} from "../../../../redux/actions";


const HubFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

HubFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
    };
  }

  toggleModal = (e, type, hub) => {
    e.stopPropagation();
    this.props.toggleHubModal(type, hub);
  }

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker 
            onClose={onClose}
            onDelete={() => this.props.deleteHubItem(ids, messages)}
            messages ={messages}
          />
        )
      }
    })
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

    if (this.props.hub.paramSearch) {
      Object.assign(params, { "query": this.props.hub.paramSearch})
    };
    this.props.getHubList(params, messages);

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

    if (this.props.hub.paramSearch) {
      Object.assign(params, { "query": this.props.hub.paramSearch })
    };
    this.props.getHubList(params, messages);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    const { messages } = this.props.intl;
    // this.props.change('hub','');
    this.props.getHubList(null, messages);
  }

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.hub;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="hub" action="manage">
        <Button
          color="success"
          onClick={(e) => this.toggleModal(e, 'add', null)}
          className="master-data-btn"
          size="sm"
        >{messages['hub.add-new']}</Button>
        </Can>
        <Action modalOpen={modalOpen} />
        <Can user={this.props.authUser.user} permission="hub" action="manage">
        {selected.length > 0 &&
            <Button
            color="danger"
            onClick={(e) => this.onDelete(e, selected)}
            className="master-data-btn"
            size="sm"
          >{messages['hub.delete']}</Button>
        }
        </Can>
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.hub;
    const { messages, locale } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
          Header: messages['hub.code'],
          accessor: "code",
          sortable: false
        },
        {
          Header: messages['name'],
          accessor: "name",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.name_en : original.name
            )
          },
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
            Header: messages['hub.city'],
            accessor: "city",
            Cell: ({ original }) => {
              return (
                locale === 'en-US' ? original.city_en : original.city
              )
            },
            sortable: false
        },
        {
            Header: messages['status'],
            accessor: "status",
            Cell: ({ original }) => {
              return (
                original.status === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>
              )
            },
            className: "text-center",
            sortable: false
        },
        {
          Header: messages['created-at'],
          accessor: "created_at",
          className: "text-center", 
          Cell: ({ original }) => { return (<Moment fromNow format="D/MM/YYYY" locale={locale}>{new Date(original.created_at)}</Moment>) },
          sortable: false,
        },
        {
            Header: messages['action'], 
            className: "text-center", 
            Cell: ({ original }) => {
              return (
                <Fragment>
                   <Can user={this.props.authUser.user} permission="hub" action="edit" own={original.created_by}>
                  <Button color="info" size="sm" onClick={(e) => this.toggleModal(e, MODAL_EDIT , original)}><span className="lnr lnr-pencil" /></Button> &nbsp;
                  </Can>
                  <Can user={this.props.authUser.user} permission="hub" action="edit" own={original.created_by}>
                  <Button color="danger" size="sm" onClick={(e) => this.onDelete(e, [original.id])}><span className="lnr lnr-trash" /></Button>
                  </Can>
                </Fragment>
              );
            },
            sortable: false
        }
      ]
    };

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <Search />
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
  hub: PropTypes.object.isRequired,
  getHubList: PropTypes.func.isRequired,
  toggleHubModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ hub,  authUser }) => {
  return {
    hub,
    authUser
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getHubList,
    toggleHubModal,
    deleteHubItem
  }
)(List));
