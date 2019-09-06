/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from '../../../containers/Shared/table/Table';
import Can from '../../../containers/Shared/Can';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  getAreaDomesticList,
  toggleAreaDomesticModal,
  deleteAreaDomesticItem
} from "../../../redux/actions";
import ConfirmPicker from '../../../containers/Shared/picker/ConfirmPicker';
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
    this.props.getAreaDomesticList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.area.items.length !== this.props.area.items.length) {
      this.setState({ selectedPageSize: nextProps.area.items.length < SELECTED_PAGE_SIZE ? SELECTED_PAGE_SIZE : nextProps.area.items.length })
    }
  }

  toggleModal = (e, type, status) => {
    e.stopPropagation();
    this.props.toggleAreaDomesticModal(type, status);
  }

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker
            onClose={onClose}
            onDelete={() => this.props.deleteAreaDomesticItem(ids)}
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

    if (this.props.area.paramSearch) {
      Object.assign(params, { "query": this.props.area.paramSearch })
    };
    this.props.getAreaDomesticList(params);

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

    if (this.props.area.paramSearch) {
      Object.assign(params, { "query": this.props.area.paramSearch })
    };
    this.props.getAreaDomesticList(params);

    this.setState({
      currentPage: page
    });
  };

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.area;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="area_domestic" action="add">
          <Button
            color="success"
            onClick={(e) => this.toggleModal(e, 'add', null)}
            className="master-data-btn"
            size="sm"
          >{messages['pri_dom.add-new-area']}</Button>
        </Can>
        <Action modalOpen={modalOpen} />
        <Can user={this.props.authUser.user} permission="area_domestic" action="delete">
          {selected.length > 0 &&
            <Button
              color="danger"
              onClick={(e) => this.onDelete(e, selected)}
              className="master-data-btn"
              size="sm"
            >{messages['pri_dom.delete-area']}</Button>
          }
        </Can>
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.area;
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
          Header: messages['created-at'],
          accessor: "created_at",
          className: "text-center",
          Cell: ({ original }) => { return (<Moment fromNow format="DD/MM/YYYY" locale={locale}>{new Date(original.created_at)}</Moment>) },
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
                <Can user={this.props.authUser.user} permission="area_domestic" action="edit" own={original.created_at}>
                  <Button color="info" size="sm" onClick={(e) => this.toggleModal(e, 'edit', original)}><span className="lnr lnr-pencil" /></Button> &nbsp;
                </Can>
                <Can user={this.props.authUser.user} permission="area_domestic" action="delete" own={original.created_at}>
                  <Button color="danger" size="sm" onClick={(e) => this.onDelete(e, [original.id])}><span className="lnr lnr-trash" /></Button>
                </Can>
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
    );
  }
}

List.propTypes = {
  area: PropTypes.object.isRequired,
  getAreaDomesticList: PropTypes.func.isRequired,
  toggleAreaDomesticModal: PropTypes.func.isRequired,
  deleteAreaDomesticItem: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingDomestic, authUser }) => {
  const { area } = pricingDomestic;
  return {
    area,
    authUser
  };
};

export default withRouter(injectIntl(connect(
  mapStateToProps,
  {
    getAreaDomesticList,
    toggleAreaDomesticModal,
    deleteAreaDomesticItem
  }
)(List)));
