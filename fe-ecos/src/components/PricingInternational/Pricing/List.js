/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { withRouter , Link} from 'react-router-dom';
import { Card, CardBody, Col, Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import Table from '../../../containers/Shared/table/Table';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Search from './Search';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Can from '../../../containers/Shared/Can';

import {
  getPricingInternationalList,
  deletePricingInternationalItem
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
    this.props.getPricingInternationalList();
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
            onDelete={() => this.props.deletePricingInternationalItem(ids)}
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
    this.props.getPricingInternationalList(params);

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
    this.props.getPricingInternationalList(params);

    this.setState({
      currentPage: page
    });
  };

  onEditPricing = (e, id) => {
    e.stopPropagation();
    this.props.history.push(`/pricing-international/pricing/edit/${id}`);
  }

  onViewPricing = (e, type, pricing) => {
    e.stopPropagation();
    this.props.history.push(`/pricing-international/pricing/view/${pricing.id}`);
  }

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="pricing_international" action="add">
          <Link to="/pricing-international/pricing/add" className="btn btn-success btn-sm master-data-btn">
            {messages['pri_int.add-new-pricing']}
          </Link>
        </Can>
        <Can user={this.props.authUser.user} permission="pricing_international" action="delete">
          {selected.length > 0 &&
            <Button
              color="danger"
              onClick={(e) => this.onDelete(e, selected)}
              className="master-data-btn"
              size="sm"
            >{messages['pri_int.delete-pricing']}</Button>
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
          Header: '#',
          accessor: "id",
          width: 30,
          sortable: false,
        },
        {
          Header: messages['pri_int.name'],
          accessor: "name",
          sortable: false,
        },
        {
          Header: messages['pri_int.carrier'],
          accessor: "carrier_code",
          width: 110,
          sortable: false,
        },
        {
          Header: messages['pri_int.category'],
          accessor: "category_code",
          width: 110,
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.category_en : original.category
            )
          },
          sortable: false,
        },
        {
          Header: messages['status'],
          accessor: "status",
          width: 110,
          Cell: ({ original }) => {
            return (
              original.status ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>
            )
          },
          className: "text-center",
          sortable: false,
        },
        {
          Header: messages['pri_int.customer'],
          accessor: "customer_name",
          width: 150,
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
                <Can user={this.props.authUser.user} permission="priciing_international" action="edit" own={original.created_at}>
                  <Button
                    color="info"
                    onClick={(e) => this.onEditPricing(e, original.id)}
                    className="master-data-btn"
                    size="sm"
                  ><span className="lnr lnr-pencil" /></Button>
                </Can>
                &nbsp;
                <Can user={this.props.authUser.user} permission="priciing_international" action="delete" own={original.created_at}>
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
  getPricingInternationalList: PropTypes.func.isRequired,
  deletePricingInternationalItem: PropTypes.func.isRequired,
}

const mapStateToProps = ({ pricingInternational, authUser }) => {
  const { pricing } = pricingInternational;
  return {
    pricing,
    authUser
  };
};

export default withRouter(injectIntl(connect(
  mapStateToProps,
  {
    getPricingInternationalList,
    deletePricingInternationalItem
  }
)(List)));
