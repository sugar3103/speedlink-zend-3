/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, CardBody, Col,Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import Table from '../../../containers/Shared/table/Table';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Search from './Search';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  getPricingList,
  // deletePricingItem
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

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker 
            onClose={onClose}
            onDelete={() => this.props.deletePricingItem(ids, messages)}
            messages ={messages}
          />
        )
      }
    })
  }

  onEdit = (e, id) => {
    e.stopPropagation();
    this.props.history.push('/app/master-data/address/country');
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

    if (this.props.pricing.paramSearch) {
      Object.assign(params, { "query": this.props.pricing.paramSearch })
    };
    this.props.getPricingList(params, messages);

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

    if (this.props.pricing.paramSearch) {
      Object.assign(params, { "query": this.props.pricing.paramSearch })
    };
    this.props.getPricingList(params, messages);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    const { messages } = this.props.intl;
    this.props.getPricingList(null, messages);
  }

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Button
          color="success"
          onClick={() => this.props.history.push('/app/pricing-management/pricing/add')}
          className="master-data-btn"
          size="sm"
        >{messages['pricing.add-new']}</Button>
        {selected.length > 0 &&
            <Button
            color="danger"
            onClick={(e) => this.onDelete(e, selected)}
            className="master-data-btn"
            size="sm"
          >{messages['pricing.delete']}</Button>
        }
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.pricing;
    const { messages } = this.props.intl;
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
          Header: messages['pricing.name'],
          accessor: "name",
          sortable: false,
        },
        {
          Header: messages['pri_man.carrier'],
          accessor: "carrier_code",
          width: 110,
          sortable: false,
        },
        {
          Header: messages['pri_man.category'],
          accessor: "category_code",
          width: 110,
          sortable: false,
        },
        {
          Header: messages['status'],
          accessor: "status",
          width: 110,
          Cell: ({ original }) => {
            return (
              original.status === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>
            )
          },
          className: "text-center",
          sortable: false,
        },
        {
          Header: messages['pri_man.customer'],
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
                <Button color="info" size="sm" onClick={(e) => this.onEdit(e, original.id)}><span className="lnr lnr-pencil" /></Button> &nbsp;
                <Button color="danger" size="sm" onClick={(e) => this.onDelete(e, [original.id])}><span className="lnr lnr-trash" /></Button>
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
              onRowClick={() => {this.props.history.push('/app/master-data/status')}}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  pricing: PropTypes.object.isRequired,
  getPricingList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ pricing }) => {
  return {
    pricing
  };
};

export default withRouter(injectIntl(connect(
  mapStateToProps,
  {
    getPricingList,
    // deletePricingItem
  }
)(List)));
