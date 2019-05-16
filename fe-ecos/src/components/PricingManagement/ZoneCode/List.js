/* eslint-disable react/no-unused-state */
import React, { Component, Fragment} from 'react';
import { Card, CardBody, Col, Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
// import Moment from 'react-moment';
import Table from '../../../containers/Shared/table/Table';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';
import { getZoneCodeList, toggleZoneCodeModal, deleteZoneCodeItem, removeState } from "../../../redux/actions";
import { confirmAlert } from 'react-confirm-alert';
import ConfirmPicker from '../../../containers/Shared/picker/ConfirmPicker';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MODAL_EDIT } from '../../../constants/defaultValues';
import { CITY_RESET_STATE, DISTRICT_RESET_STATE, WARD_RESET_STATE } from '../../../constants/actionTypes';
import Can from '../../../containers/Shared/Can';

const ZoneCodeFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

ZoneCodeFormatter.propTypes = {
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

    if (this.props.zoneCode.paramSearch) {
      Object.assign(params, { "query": this.props.zoneCode.paramSearch})
    }
    this.props.getZoneCodeList(params);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  };

  toggleModal = (e, type, zoneCode) => {
    e.stopPropagation();
    this.props.removeState(CITY_RESET_STATE);
    this.props.removeState(DISTRICT_RESET_STATE);
    this.props.removeState(WARD_RESET_STATE);
    this.props.toggleZoneCodeModal(type, zoneCode);
  };

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker 
            onClose={onClose}
            onDelete={() => this.props.deleteZoneCodeItem(ids)}
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

    if (this.props.zoneCode.paramSearch) {
      Object.assign(params, { "query": this.props.zoneCode.paramSearch })
    }
    this.props.getZoneCodeList(params);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    this.props.getZoneCodeList();
  }

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.zoneCode;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="zonecode" action="edit">
        <Button
          color="success"
          onClick={(e) => this.toggleModal(e, 'add', null)}
          className="master-data-btn"
          size="sm"
        >{messages['zone_code.add-new']}</Button>
        </Can>
        <Action modalOpen={modalOpen} />
        {selected.length > 0 &&
          <Can user={this.props.authUser.user} permission="zonecode" action="edit">
            <Button
            color="danger"
            onClick={(e) => this.onDelete(e, selected)}
            className="master-data-btn"
            size="sm"
          >{messages['zone_code.delete']}</Button>
          </Can>
        }
      </Fragment>
    )
  }


  render() {
    const { items, loading, total } = this.props.zoneCode;
    const { messages, locale } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
          Header: messages['zone_code.code'],
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
            sortable: false,
        },
        {
            Header: messages['pri_man.service'],
            accessor: "service_code",
            sortable: false,
        },
        {
            Header: messages['pri_man.shipment-type'],
            accessor: "shipmenttype_code",
            sortable: false,
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
            sortable: false,
        },
        {
            Header: messages['pri_man.customer'],
            accessor: "customer_name",
            sortable: false,
        },
        {
            Header: messages['zone_code.country_origin'],
            accessor: "origin_country_name",
            Cell: ({ original }) => {
              return (
                locale === 'en-US' ? original.origin_country_name_en : original.origin_country_name
              )
            },
            sortable: false,
        },
        {
          Header: messages['zone_code.city_origin'],
          accessor: "origin_city_name",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.origin_city_name_en : original.origin_city_name
            )
          },
          sortable: false,
        },
        {
          Header: messages['zone_code.country_destination'],
          accessor: "destination_country_name",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.destination_country_name_en : original.destination_country_name
            )
          },
          sortable: false,
        },
        {
          Header: messages['zone_code.city_destination'],
          accessor: "destination_city_name",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.destination_city_name_en : original.destination_city_name
            )
          },
          sortable: false,
        },
        {
            Header: messages['action'],
            accessor: "",
            className: "text-center", 
            Cell: ({ original }) => {
              return (
                <Fragment>
                   <Can user={this.props.authUser.user} permission="zonecode" action="edit" own={original.created_by}>
                  <Button color="info" size="sm" onClick={(e) => this.toggleModal(e, MODAL_EDIT , original)}><span className="lnr lnr-pencil" /></Button> &nbsp;
                  </Can>
                  <Can user={this.props.authUser.user} permission="zonecode" action="edit" own={original.created_by}>
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
              onRowClick={this.toggleModal}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  zoneCode: PropTypes.object.isRequired,
  getZoneCodeList: PropTypes.func.isRequired,
  toggleZoneCodeModal: PropTypes.func.isRequired
};

const mapStateToProps = ({ zoneCode, authUser }) => {
  return {
    zoneCode,
    authUser
  };
};

export default injectIntl(connect(mapStateToProps, {
  getZoneCodeList,
  toggleZoneCodeModal,
  deleteZoneCodeItem,
  removeState
})(List));
