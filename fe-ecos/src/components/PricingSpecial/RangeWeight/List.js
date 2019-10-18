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
  getRangeWeightSpecialList,
  deleteRangeWeightSpecialItem
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
    this.props.getRangeWeightSpecialList();
  }

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker
            onClose={onClose}
            onDelete={() => this.props.deleteRangeWeightSpecialItem(ids)}
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
    this.props.getRangeWeightSpecialList(params);

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
    this.props.getRangeWeightSpecialList(params);

    this.setState({
      currentPage: page
    });
  };

  onEditRangeWeight = (e, id) => {
    e.stopPropagation();
    this.props.history.push(`/pricing-special/range-weight/edit/${id}`);
  }

  viewRangeWeight = (e, type, rangeWeight) => {
    e.stopPropagation();
    this.props.history.push(`/pricing-special/range-weight/view/${rangeWeight.id}`);
  }

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="range_weight_special" action="add">
          <Link to="/pricing-special/range-weight/add" className="btn btn-success btn-sm master-data-btn">
            {messages['pri_special.add-new-range-weight']}
          </Link>
        </Can>
        <Can user={this.props.authUser.user} permission="range_weight_special" action="import">
          <Button
            color="primary"
            onClick={() => this.props.history.push('/pricing-special/range-weight/import')}
            className="master-data-btn"
            size="sm"
          >{messages['pri_special.import']}</Button>
        </Can>
        <Can user={this.props.authUser.user} permission="range_weight_special" action="delete">
          {selected.length > 0 &&
            <Button
              color="danger"
              onClick={(e) => this.onDelete(e, selected)}
              className="master-data-btn"
              size="sm"
            >{messages['pri_special.delete-range-weight']}</Button>
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
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.name_en : original.name
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_special.carrier'],
          accessor: "carrier",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.carrier_en : original.carrier
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_special.service'],
          accessor: "service",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.service_en : original.service
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_special.shipment-type'],
          accessor: "shipment_type",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.shipment_type_en : original.shipment_type
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_special.area'],
          accessor: "special_area_name",
          sortable: false,
        },
        {
          Header: messages['pri_special.from'],
          accessor: "from",
          width: 70,
          sortable: false,
        },
        {
          Header: messages['pri_special.to'],
          accessor: "to",
          width: 70,
          sortable: false,
        },
        {
          Header: messages['pri_special.status'],
          accessor: "status",
          width: 100,
          Cell: ({ original }) => {
            return (
              original.status ? <Badge color="success">{messages['pri_special.active']}</Badge> : <Badge color="dark">{messages['pri_special.inactive']}</Badge>
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
                <Can user={this.props.authUser.user} permission="range_weight_special" action="edit" own={original.created_at}>
                  <Button
                    color="info"
                    onClick={(e) => this.onEditRangeWeight(e, original.id)}
                    size="sm"
                  ><span className="lnr lnr-pencil" /></Button>
                </Can>
                &nbsp;
                <Can user={this.props.authUser.user} permission="range_weight_special" action="delete" own={original.created_at}>
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
              onRowClick={this.viewRangeWeight}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  rangeWeight: PropTypes.object.isRequired,
  getRangeWeightSpecialList: PropTypes.func.isRequired,
  deleteRangeWeightSpecialItem: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingSpecial, authUser }) => {
  const { rangeWeight } = pricingSpecial;
  return {
    rangeWeight,
    authUser
  };
};

export default withRouter(injectIntl(connect(
  mapStateToProps,
  {
    getRangeWeightSpecialList,
    deleteRangeWeightSpecialItem
  }
)(List)));
