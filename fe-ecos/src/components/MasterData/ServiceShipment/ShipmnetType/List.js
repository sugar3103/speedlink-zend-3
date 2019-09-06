/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col, Badge, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Table from '../../../../containers/Shared/table/Table';
import Can from '../../../../containers/Shared/Can';
import { SELECTED_PAGE_SIZE } from '../../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';
import { getShipmentTypeList, deleteShipmentTypeItem, toggleShipmentTypeModal } from "../../../../redux/actions";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConfirmPicker from '../../../../containers/Shared/picker/ConfirmPicker';
// import Moment from 'react-moment';

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
    };
  }
  
  componentDidMount() {
    this.props.getShipmentTypeList();
  }

  toggleModal = (e, type, status) => {
    e.stopPropagation();
    this.props.toggleShipmentTypeModal(type, status);
  }

  onDelete = (e, ids) => {
    e.stopPropagation();
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker
            onClose={onClose}
            onDelete={() => this.props.deleteShipmentTypeItem(ids)}
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
    };

    if (this.props.shipment_type.paramSearch) {
      Object.assign(params, { "query": this.props.shipment_type.paramSearch })
    }
    this.props.getShipmentTypeList(params);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  };

  onChangePage = (page) => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    };

    if (this.props.shipment_type.paramSearch) {
      Object.assign(params, { "query": this.props.shipment_type.paramSearch })
    }
    this.props.getShipmentTypeList(params);

    this.setState({
      currentPage: page
    });
  };

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.shipment_type;
    return (
      <Fragment>
        <Can user={this.props.authUser.user} permission="shipment_type" action="add">
          <Button
            color="success"
            onClick={(e) => this.toggleModal(e, 'add', null)}
            className="master-data-btn"
            size="sm"
          >{messages['shipment_type.add-new']}</Button>
        </Can>
        <Action modalOpen={modalOpen} />
        <Can user={this.props.authUser.user} permission="shipment_type" action="delete">
          {selected.length > 0 &&
            <Button
              color="danger"
              onClick={(e) => this.onDelete(e, selected)}
              className="master-data-btn"
              size="sm"
            >{messages['shipment_type.delete']}</Button>
          }
        </Can>
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.shipment_type;
    const { messages, locale } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
          Header: messages['shipment_type.code'],
          accessor: "code",
          width: 100,
          sortable: false,
        },
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
          Header: messages['shipment_type.product_type'],
          accessor: "product_type_code",
          Cell: ({ original}) => {
            return(
              original.product_type_code === "Dox" ?  messages['shipment_type.dox'] :  messages['shipment_type.parcel']
            )
          },
          sortable: false,
        },  
        {
          Header: messages['shipment_type.service'],
          accessor: "service",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.service_en : original.service
            )
          },
          sortable: false,
        }, 
        {
          Header: messages['shipment_type.category'],
          accessor: "category",
          className: "text-center",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.category_en : original.category
            )
          },
          sortable: false,
        },
        {
          Header: messages['shipment_type.carrier'],
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
          Header: messages['shipment_type.volumetric_number'],
          accessor: "volumetric_number",
          width: 150,
          sortable: false,
          className: "text-center",
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
        // {
        //   Header: messages['created-at'],
        //   accessor: "created_at",
        //   className: "text-center",
        //   Cell: ({ original }) => { return (<Moment fromNow format="D/MM/YYYY" locale={locale}>{new Date(original.created_at)}</Moment>) },
        //   sortable: false,
        // },
        {
          Header: messages['action'],
          accessor: "",
          width: 100,
          className: "text-center",
          Cell: ({ original }) => {
            return (
              <Fragment>
                <Can user={this.props.authUser.user} permission="shipment_type" action="edit" own={original.created_at}>
                  <Button color="info" size="sm" onClick={(e) => this.toggleModal(e, 'edit', original)}><span className="lnr lnr-pencil" /></Button> &nbsp;
                </Can>
                <Can user={this.props.authUser.user} permission="shipment_type" action="delete" own={original.created_at}>
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
              onRowClick={this.toggleModal}
            />
          </CardBody>
        </Card>
      </Col>

    );
  }
}

List.propTypes = {
  shipment_type: PropTypes.object.isRequired,  
  getShipmentTypeList: PropTypes.func.isRequired,
  toggleShipmentTypeModal: PropTypes.func.isRequired
};

const mapStateToProps = ({ shipment_type, authUser }) => {
  return {
    shipment_type,
    authUser
  };
};

export default injectIntl(connect(mapStateToProps, {
  getShipmentTypeList,
  toggleShipmentTypeModal,
  deleteShipmentTypeItem
})(List));
