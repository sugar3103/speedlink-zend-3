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
  getPricingDomesticList,
  deletePricingDomesticItem
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
    this.props.getPricingDomesticList();
  }

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker
            onClose={onClose}
            onDelete={() => this.props.deletePricingDomesticItem(ids)}
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
    this.props.getPricingDomesticList(params);

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
    this.props.getPricingDomesticList(params);

    this.setState({
      currentPage: page
    });
  };

  onEditPricing = (e, id) => {
    e.stopPropagation();
    this.props.history.push(`/pricing-domestic/pricing/edit/${id}`);
  }

  onViewPricing = (e, type, pricing) => {
    e.stopPropagation();
    this.props.history.push(`/pricing-domestic/pricing/view/${pricing.id}`);
  }

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="pricing_domestic" action="add">
          <Link to="/pricing-domestic/pricing/add" className="btn btn-success btn-sm master-data-btn">
            {messages['pri_dom.add-new-pricing']}
          </Link>
        </Can>
        <Can user={this.props.authUser.user} permission="pricing_domestic" action="delete">
          {selected.length > 0 &&
            <Button
              color="danger"
              onClick={(e) => this.onDelete(e, selected)}
              className="master-data-btn"
              size="sm"
            >{messages['pri_dom.delete-pricing']}</Button>
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
          Header: messages['pri_dom.type'],
          accessor: "is_private",
          width: 100,
          Cell: ({ original }) => {
            return (
              original.is_private ? messages['pri_dom.customer'] : messages['pri_dom.public']
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
          Header: messages['pri_dom.status'],
          accessor: "status",
          width: 100,
          Cell: ({ original }) => {
            return (
              original.status ? <Badge color="success">{messages['pri_dom.active']}</Badge> : <Badge color="dark">{messages['pri_dom.inactive']}</Badge>
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_dom.approved-status'],
          accessor: "zone",
          width: 120,
          Cell: ({ original }) => {
            let status = messages['pri_dom.new'];
            switch (original.approval_status) {
              case 1:
                status = messages['pri_dom.approved'];
                break;
              case 2:
                status = messages['pri_dom.draft'];
                break;
              default:
                status = messages['pri_dom.new'];
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
                <Can user={this.props.authUser.user} permission="pricing_domestic" action="edit" own={original.created_at}>
                  <Button
                    color="info"
                    onClick={(e) => this.onEditPricing(e, original.id)}
                    className="master-data-btn"
                    size="sm"
                  ><span className="lnr lnr-pencil" /></Button>
                </Can>
                &nbsp;
                <Can user={this.props.authUser.user} permission="pricing_domestic" action="delete" own={original.created_at}>
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
  getPricingDomesticList: PropTypes.func.isRequired,
  deletePricingDomesticItem: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingDomestic, authUser }) => {
  const { pricing } = pricingDomestic;
  return {
    pricing,
    authUser
  };
};

export default withRouter(injectIntl(connect(
  mapStateToProps,
  {
    getPricingDomesticList,
    deletePricingDomesticItem
  }
)(List)));
