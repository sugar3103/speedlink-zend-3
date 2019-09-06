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
  getPricingSpecialList,
  deletePricingSpecialItem
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
    this.props.getPricingSpecialList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pricing.items.length !== this.props.pricing.items.length) {
      this.setState({ selectedPageSize: nextProps.pricing.items.length < SELECTED_PAGE_SIZE ? SELECTED_PAGE_SIZE : nextProps.pricing.items.length })
    }
  }

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker
            onClose={onClose}
            onDelete={() => this.props.deletePricingSpecialItem(ids)}
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

    if (this.props.pricing.paramSearch) {
      Object.assign(params, { "query": this.props.pricing.paramSearch })
    };
    this.props.getPricingSpecialList(params);

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

    if (this.props.pricing.paramSearch) {
      Object.assign(params, { "query": this.props.pricing.paramSearch })
    };
    this.props.getPricingSpecialList(params);

    this.setState({
      currentPage: page
    });
  };

  onEditPricing = (e, id) => {
    e.stopPropagation();
    this.props.history.push(`/pricing-special/pricing/edit/${id}`);
  }

  onViewPricing = (e, type, pricing) => {
    e.stopPropagation();
    this.props.history.push(`/pricing-special/pricing/view/${pricing.id}`);
  }

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="pricing_special" action="add">
          <Link to="/pricing-special/pricing/add" className="btn btn-success btn-sm master-data-btn">
            {messages['pri_special.add-new-pricing']}
          </Link>
        </Can>
        <Can user={this.props.authUser.user} permission="pricing_special" action="delete">
          {selected.length > 0 &&
            <Button
              color="danger"
              onClick={(e) => this.onDelete(e, selected)}
              className="master-data-btn"
              size="sm"
            >{messages['pri_special.delete-pricing']}</Button>
          }
        </Can>
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.pricing;
    const { messages, locale } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
          Header: messages['name'],
          accessor: "name",
          sortable: false,
        },
        {
          Header: messages['pri_special.customer'],
          accessor: "customer",
          width: 120,
          sortable: false,
        },
        {
          Header: messages['pri_special.carrier'],
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
          Header: messages['pri_special.service'],
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
          Header: messages['pri_special.approved-status'],
          accessor: "zone",
          width: 120,
          Cell: ({ original }) => {
            let status = messages['pri_special.new'];
            switch (original.approval_status) {
              case 1:
                status = messages['pri_special.approved'];
                break;
              case 2:
                status = messages['pri_special.draft'];
                break;
              default:
                status = messages['pri_special.new'];
            }
            return status;
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
                <Can user={this.props.authUser.user} permission="pricing_special" action="edit" own={original.created_at}>
                  <Button
                    color="info"
                    onClick={(e) => this.onEditPricing(e, original.id)}
                    className="master-data-btn"
                    size="sm"
                  ><span className="lnr lnr-pencil" /></Button>
                </Can>
                &nbsp;
                <Can user={this.props.authUser.user} permission="pricing_special" action="delete" own={original.created_at}>
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
              onRowClick={this.onViewPricing}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  pricing: PropTypes.object.isRequired,
  getPricingSpecialList: PropTypes.func.isRequired,
  deletePricingSpecialItem: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingSpecial, authUser }) => {
  const { pricing } = pricingSpecial;
  return {
    pricing,
    authUser
  };
};

export default withRouter(injectIntl(connect(
  mapStateToProps,
  {
    getPricingSpecialList,
    deletePricingSpecialItem
  }
)(List)));
