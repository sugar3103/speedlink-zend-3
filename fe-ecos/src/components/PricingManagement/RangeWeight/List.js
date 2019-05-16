/* eslint-disable react/no-unused-state */
import React, { Component, Fragment} from 'react';
import { Card, CardBody, Col, Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import Table from '../../../containers/Shared/table/Table';
// import Moment from 'react-moment';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';
import { getRangeWeightList, toggleRangeWeightModal, deleteRangeWeightItem } from "../../../redux/actions";
import { confirmAlert } from 'react-confirm-alert';
import ConfirmPicker from '../../../containers/Shared/picker/ConfirmPicker';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MODAL_VIEW } from '../../../constants/defaultValues';
import Can from '../../../containers/Shared/Can';

const RangeWeightFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

RangeWeightFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
    };
  }

  onChangePageSize = (size) => {
    size = parseInt(size, 10);
    let params = {
      offset: {
        start: 1,
        limit: size
      }
    };

    if (this.props.rangeWeight.paramSearch) {
      Object.assign(params, { "query": this.props.rangeWeight.paramSearch})
    }
    this.props.getRangeWeightList(params);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  };

  toggleModal = (e, type, rangeWeight) => {
    e.stopPropagation();
    this.props.toggleRangeWeightModal(type, rangeWeight);
  };

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker 
            onClose={onClose}
            onDelete={() => this.props.deleteRangeWeightItem(ids)}
            messages={messages}
          />
        )
      }
    })
  }

  onChangePage = (page) => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    };

    if (this.props.rangeWeight.paramSearch) {
      Object.assign(params, { "query": this.props.rangeWeight.paramSearch })
    }
    this.props.getRangeWeightList(params);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    this.props.getRangeWeightList();
  }

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.rangeWeight;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="rangeweight" action="edit">
        <Button
          color="success"
          onClick={(e) => this.toggleModal(e, 'add', null)}
          className="master-data-btn"
          size="sm"
        >{messages['range_weight.add-new']}</Button>
        </Can>
        <Action modalOpen={modalOpen} />
        {selected.length > 0 &&
          <Can user={this.props.authUser.user} permission="rangeweight" action="edit">
            <Button
            color="danger"
            onClick={(e) => this.onDelete(e, selected)}
            className="master-data-btn"
            size="sm"
          >{messages['range_weight.delete']}</Button>
          </Can>
        }
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.rangeWeight;
    const { messages } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
          Header: messages['range_weight.name'],
          accessor: "code",
          sortable: false,
        },
        {
          Header: messages['pri_man.carrier'],
          accessor: "carrier_code",
          sortable: false
        },
        {
            Header: messages['pri_man.category'],
            accessor: "category",
            sortable: false
        },
        {
            Header: messages['pri_man.service'],
            accessor: "service_code",
            sortable: false
        },
        {
            Header: messages['pri_man.shipment-type'],
            accessor: "shipmenttype_code",
            sortable: false
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
            sortable: false
        },
        {
            Header: messages['pri_man.customer'],
            accessor: "customer_name",
            sortable: false
        },
        {
            Header: messages['pri_man.from'],
            accessor: "from",
            sortable: false
        },
        {
            Header: messages['pri_man.to'],
            accessor: "range_weight.to",
            Cell: ({ original }) => {
              return (
                original.to === '0.00' ? 'Over' : original.to 
              )
            },
            sortable: false
        },
        {
            Header: messages['range_weight.calculate'],
            accessor: "calculate_unit",
            sortable: false
        },
        {
            Header: messages['range_weight.unit'],
            accessor: "unit",
            sortable: false
        },
        {
            Header: messages['range_weight.roundup'],
            accessor: "round_up",
            sortable: false
        },
        {
            Header: messages['action'], 
            Cell: ({ original }) => {
              return (
                <Fragment>
                  <Can user={this.props.authUser.user} permission="rangeweight" action="edit" own={original.created_by}>
                  <Button color="info" size="sm" onClick={(e) => this.toggleModal(e, MODAL_VIEW , original)}><span className="lnr lnr-pencil" /></Button> &nbsp;
                  </Can>
                  <Can user={this.props.authUser.user} permission="rangeweight" action="edit" own={original.created_by}>
                  <Button color="danger" size="sm" onClick={(e) => this.onDelete(e, [original.id])}><span className="lnr lnr-trash" /></Button>
                  </Can>
                </Fragment>
              );
            },
            sortable: false
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
              onRowClick={this.toggleModal}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  rangeWeight: PropTypes.object.isRequired,
  modal: PropTypes.object,
  getRangeWeightList: PropTypes.func.isRequired,
  toggleRangeWeightModal: PropTypes.func.isRequired
};

const mapStateToProps = ({ rangeWeight, authUser }) => {
  return {
    rangeWeight,
    authUser
  };
};

export default injectIntl(connect(mapStateToProps, {
  getRangeWeightList,
  toggleRangeWeightModal,
  deleteRangeWeightItem
})(List));
