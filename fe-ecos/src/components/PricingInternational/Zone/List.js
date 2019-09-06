/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Button, Badge } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from '../../../containers/Shared/table/Table';
import Can from '../../../containers/Shared/Can';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Search from './Search';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  getZoneInternationalList,
  deleteZoneInternationalItem
} from "../../../redux/actions";
import ConfirmPicker from '../../../containers/Shared/picker/ConfirmPicker';

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.props.getZoneInternationalList();
  }

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker
            onClose={onClose}
            onDelete={() => this.props.deleteZoneInternationalItem(ids)}
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

    if (this.props.zone.paramSearch) {
      Object.assign(params, { "query": this.props.zone.paramSearch })
    };
    this.props.getZoneInternationalList(params);

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

    if (this.props.zone.paramSearch) {
      Object.assign(params, { "query": this.props.zone.paramSearch })
    };
    this.props.getZoneInternationalList(params);

    this.setState({
      currentPage: page
    });
  };

  onEditZone = (e, id) => {
    e.stopPropagation();
    this.props.history.push(`/pricing-international/zone/edit/${id}`);
  }

  viewZone = (e, type, zone) => {
    e.stopPropagation();
    this.props.history.push(`/pricing-international/zone/view/${zone.id}`);
  }

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="zone_international" action="add">
          <Link to="/pricing-international/zone/add" className="btn btn-success btn-sm master-data-btn">
            {messages['pri_int.add-new-zone']}
          </Link>
        </Can>
        <Can user={this.props.authUser.user} permission="zone_international" action="delete">
          {selected.length > 0 &&
            <Button
              color="danger"
              onClick={(e) => this.onDelete(e, selected)}
              className="master-data-btn"
              size="sm"
            >{messages['pri_int.delete-zone']}</Button>
          }
        </Can>
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.zone;
    const { messages, locale } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
          Header: messages['name'],
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.name_en : original.name
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_int.category'],
          width: 100,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.category_name_en : original.category_name
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_int.carrier'],
          width: 100,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.carrier_name_en : original.carrier_name
            )
          },
          sortable: false
        },
        {
          Header: messages['pri_int.service'],
          width: 100,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.service_name_en : original.service_name
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_int.shipment-type'],
          width: 120,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.shipment_type_name_en : original.shipment_type_name
            )
          },
          sortable: false,
        },
        {
          Header: messages['status'],
          width: 100,
          Cell: ({ original }) => {
            return (
              original.status ? <Badge color="success">{messages['pri_dom.active']}</Badge> : <Badge color="dark">{messages['pri_dom.inactive']}</Badge>
            )
          },
          className: "text-center",
          sortable: false,
        },
        {
          Header: messages['pri_int.origin-country'],
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.origin_country_name_en : original.origin_country_name
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_int.dest-country'],
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.destination_country_name_en : original.destination_country_name
            )
          },
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
                <Can user={this.props.authUser.user} permission="zone_international" action="edit" own={original.created_at}>
                  <Button
                    color="info"
                    onClick={(e) => this.onEditZone(e, original.id)}
                    size="sm"
                  ><span className="lnr lnr-pencil" /></Button>
                </Can>
                &nbsp;
                <Can user={this.props.authUser.user} permission="zone_international" action="delete" own={original.created_at}>
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
              onRowClick={this.viewZone}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  zone: PropTypes.object.isRequired,
  getZoneInternationalList: PropTypes.func.isRequired,
  deleteZoneInternationalItem: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingInternational, authUser }) => {
  const { zone } = pricingInternational;
  return {
    zone,
    authUser
  };
};

export default withRouter(injectIntl(connect(
  mapStateToProps,
  {
    getZoneInternationalList,
    deleteZoneInternationalItem
  }
)(List)));
