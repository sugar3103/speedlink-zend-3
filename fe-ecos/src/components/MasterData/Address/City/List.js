/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import Table from '../../../../containers/Shared/table/Table';
import Can from '../../../../containers/Shared/Can';
import { SELECTED_PAGE_SIZE } from '../../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  getCityList,
  toggleCityModal,
  deleteCityItem
} from "../../../../redux/actions";
import ConfirmPicker from '../../../../containers/Shared/picker/ConfirmPicker';
import Moment from 'react-moment';

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.props.getCityList();
  }

  toggleModal = (e, type, status) => {
    e.stopPropagation();
    this.props.toggleCityModal(type, status);
  }

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker
            onClose={onClose}
            onDelete={() => this.props.deleteCityItem(ids)}
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

    if (this.props.city.paramSearch) {
      Object.assign(params, { "query": this.props.city.paramSearch })
    };
    this.props.getCityList(params);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  }

  onChangePage = (page) => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    if (this.props.city.paramSearch) {
      Object.assign(params, { "query": this.props.city.paramSearch })
    };
    this.props.getCityList(params);

    this.setState({
      currentPage: page
    });
  };

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.city;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="masterdata_city" action="add">
          <Button
            color="success"
            onClick={(e) => this.toggleModal(e, 'add', null)}
            className="master-data-btn"
            size="sm"
          >{messages['city.add-new']}</Button>
        </Can>
        <Action modalOpen={modalOpen} />
        <Can user={this.props.authUser.user} permission="masterdata_city" action="delete">
          {selected.length > 0 &&
            <Button
              color="danger"
              onClick={(e) => this.onDelete(e, selected)}
              className="master-data-btn"
              size="sm"
            >{messages['delete']}</Button>
          }
        </Can>
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.city;
    const { messages, locale } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
          Header: messages['name'],
          accessor: "name",
          width: 150,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.name_en : original.name
            )
          },
          sortable: false,
        },
        {
          Header: messages['city.zip-code'],
          accessor: "zip_code",
          sortable: false,
          width: 100,
          className: "text-center"
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
          Header: messages['status'],
          accessor: "status",

          Cell: ({ original }) => {
            return (
              original.status === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>
            )
          },
          className: "text-center",
          sortable: false,          
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
          accessor: "",
          width: 100,
          className: "text-center",
          Cell: ({ original }) => {
            return (
              <Fragment>
                <Can user={this.props.authUser.user} permission="masterdata_city" action="edit" own={original.created_at}>
                  <Button color="info" size="sm" onClick={(e) => this.toggleModal(e, 'edit', original)}><span className="lnr lnr-pencil" /></Button> &nbsp;
                </Can>
                <Can user={this.props.authUser.user} permission="masterdata_city" action="delete" own={original.created_at}>
                  <Button color="danger" size="sm" onClick={(e) => this.onDelete(e, [original.id])}><span className="lnr lnr-trash" /></Button>
                </Can>
              </Fragment>
            );
          },
          sortable: false,
        }
      ]
    };
    return(
      <Col md={12} lg={12}>
      <Card>
        <CardBody className="master-data-list">
          <Search pageSize={this.state.selectedPageSize} />
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
  city: PropTypes.object.isRequired,
  getCityList: PropTypes.func.isRequired,
  toggleCityModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ address,authUser }) => {
  const { city } = address;
  return {
    city,
    authUser
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getCityList,
    toggleCityModal,
    deleteCityItem
  }
)(List));
