/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Button } from 'reactstrap';
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
  getRangeWeightDomesticList,
  deleteRangeWeightDomesticItem
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
    this.props.getRangeWeightDomesticList();
  }

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker
            onClose={onClose}
            onDelete={() => this.props.deleteRangeWeightDomesticItem(ids)}
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

    if (this.props.rangeWeight.paramSearch) {
      Object.assign(params, { "query": this.props.rangeWeight.paramSearch })
    };
    this.props.getRangeWeightDomesticList(params);

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

    if (this.props.rangeWeight.paramSearch) {
      Object.assign(params, { "query": this.props.rangeWeight.paramSearch })
    };
    this.props.getRangeWeightDomesticList(params);

    this.setState({
      currentPage: page
    });
  };

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="range_weight_domestic" action="add">
          <Link to="/pricing-domestic/range-weight/add" className="btn btn-success btn-sm master-data-btn">
            {messages['pri_dom.add-new-range-weight']}
          </Link>
        </Can>
        <Can user={this.props.authUser.user} permission="range_weight_domestic" action="delete">
          {selected.length > 0 &&
            <Button
              color="danger"
              onClick={(e) => this.onDelete(e, selected)}
              className="master-data-btn"
              size="sm"
            >{messages['pri_dom.delete-range-weight']}</Button>
          }
        </Can>
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.rangeWeight;
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
          Header: messages['pri_dom.carrier'],
          accessor: "carrier",
          width: 100,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.carrier_en : original.carrier
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_dom.category'],
          accessor: "category",
          width: 100,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.category_en : original.category
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_dom.service'],
          accessor: "service",
          width: 100,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.service_en : original.service
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_dom.shipment-type'],
          accessor: "shipment_type",
          width: 120,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.shipment_type_en : original.shipment_type
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_dom.from'],
          accessor: "from",
          width: 50,
          sortable: false,
        },
        {
          Header: messages['pri_dom.to'],
          accessor: "to",
          width: 50,
          sortable: false,
        },
        {
          Header: messages['pri_dom.calculate-unit'],
          accessor: "calculate_unit",
          width: 120,
          Cell: ({ original }) => {
            return (
              original.calculate_unit ? messages['pri_dom.yes'] : messages['pri_dom.no']
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_dom.unit'],
          accessor: "unit",
          width: 50,
          sortable: false,
        },
        {
          Header: messages['pri_dom.round-up'],
          accessor: "round_up",
          width: 120,
          sortable: false,
        },
        {
          Header: messages['pri_dom.status'],
          accessor: "status",
          width: 100,
          Cell: ({ original }) => {
            return (
              original.status ? messages['pri_dom.active'] : messages['pri_dom.inactive']
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_dom.zone'],
          accessor: "zone",
          width: 100,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.zone_en : original.zone
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_dom.ras'],
          accessor: "is_ras",
          width: 50,
          Cell: ({ original }) => {
            return (
              original.is_ras ? messages['pri_dom.on'] : messages['pri_dom.off']
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
                <Can user={this.props.authUser.user} permission="range_weight_domestic" action="edit" own={original.created_at}>
                  <Link to={`/pricing-domestic/range-weight/edit/${original.id}`} className="btn btn-info btn-sm">
                    <span className="lnr lnr-pencil" />
                  </Link>
                </Can>
                &nbsp;
                <Can user={this.props.authUser.user} permission="range_weight_domestic" action="delete" own={original.created_at}>
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
              onRowClick={(e) => e.stopPropagation()}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  rangeWeight: PropTypes.object.isRequired,
  getRangeWeightDomesticList: PropTypes.func.isRequired,
  deleteRangeWeightDomesticItem: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingDomestic, authUser }) => {
  const { rangeWeight } = pricingDomestic;
  return {
    rangeWeight,
    authUser
  };
};

export default withRouter(injectIntl(connect(
  mapStateToProps,
  {
    getRangeWeightDomesticList,
    deleteRangeWeightDomesticItem
  }
)(List)));
