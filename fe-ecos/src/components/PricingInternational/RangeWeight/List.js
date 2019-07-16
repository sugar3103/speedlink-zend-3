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
  getRangeWeightInternationalList,
  deleteRangeWeightInternationalItem
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
    this.props.getRangeWeightInternationalList();
  }

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker
            onClose={onClose}
            onDelete={() => this.props.deleteRangeWeightInternationalItem(ids)}
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
    this.props.getRangeWeightInternationalList(params);

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
    this.props.getRangeWeightInternationalList(params);

    this.setState({
      currentPage: page
    });
  };

  onEditRangeWeight = (e, id) => {
    e.stopPropagation();
    this.props.history.push(`/pricing-international/range-weight/edit/${id}`);
  }

  viewRangeWeight = (e, type, rangeWeight) => {
    e.stopPropagation();
    this.props.history.push(`/pricing-international/range-weight/view/${rangeWeight.id}`);
  }

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="range_weight_international" action="add">
          <Link to="/pricing-international/range-weight/add" className="btn btn-success btn-sm master-data-btn">
            {messages['pri_int.add-new-range-weight']}
          </Link>
        </Can>
        <Can user={this.props.authUser.user} permission="range_weight_international" action="delete">
          {selected.length > 0 &&
            <Button
              color="danger"
              onClick={(e) => this.onDelete(e, selected)}
              className="master-data-btn"
              size="sm"
            >{messages['pri_int.delete-range-weight']}</Button>
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
          accessor: "carrier",
          width: 100,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.carrier_name_en : original.carrier_name
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_int.service'],
          accessor: "service",
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
          accessor: "shipment_type",
          width: 120,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.shipment_type_name_en : original.shipment_type_name
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_int.from'],
          accessor: "from",
          width: 70,
          sortable: false,
        },
        {
          Header: messages['pri_int.to'],
          accessor: "to",
          width: 70,
          sortable: false,
        },
        {
          Header: messages['pri_int.status'],
          accessor: "status",
          width: 100,
          Cell: ({ original }) => {
            return (
              original.status ? <Badge color="success">{messages['pri_int.active']}</Badge> : <Badge color="dark">{messages['pri_int.inactive']}</Badge>
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
                <Can user={this.props.authUser.user} permission="range_weight_international" action="edit" own={original.created_at}>
                  <Button
                    color="info"
                    onClick={(e) => this.onEditRangeWeight(e, original.id)}
                    size="sm"
                  ><span className="lnr lnr-pencil" /></Button>
                </Can>
                &nbsp;
                <Can user={this.props.authUser.user} permission="range_weight_international" action="delete" own={original.created_at}>
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
  getRangeWeightInternationalList: PropTypes.func.isRequired,
  deleteRangeWeightInternationalItem: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingInternational, authUser }) => {
  const { rangeWeight } = pricingInternational;
  return {
    rangeWeight,
    authUser
  };
};

export default withRouter(injectIntl(connect(
  mapStateToProps,
  {
    getRangeWeightInternationalList,
    deleteRangeWeightInternationalItem
  }
)(List)));
