/* eslint-disable react/no-unused-state */
import React, { Component, Fragment} from 'react';
import { Card, CardBody, Col, Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import Item from './Item';
import Table from '../../../containers/Shared/table/Table';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';
import { getZoneCodeList, toggleZoneCodeModal, deleteZoneCodeItem } from "../../../redux/actions";
import { confirmAlert } from 'react-confirm-alert';
import ConfirmPicker from '../../../containers/Shared/picker/ConfirmPicker';
import 'react-confirm-alert/src/react-confirm-alert.css';


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
    const { messages } = this.props.intl;
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
    this.props.getZoneCodeList(params, messages);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  };

  toggleModal = (e, type, zoneCode) => {
    e.stopPropagation();
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
            onDelete={() => this.props.deleteZoneCodeItem(ids, messages)}
            messages={messages}
          />
        )
      }
    })
  }

  onChangePage = (page) => {
    const { messages } = this.props.intl;
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    };

    if (this.props.zoneCode.paramSearch) {
      Object.assign(params, { "query": this.props.zoneCode.paramSearch })
    }
    this.props.getZoneCodeList(params, messages);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    const { messages } = this.props.intl;
    this.props.getZoneCodeList(null, messages);
  }

  showZoneCodeItem = (items) => {
    const { messages } = this.props.intl;
    let result = null;
    if (items != null && items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item key={index} zoneCode={item} />
        );
      })
    } else {
      result = (
        <tr><td colSpan={8} className="text-center">{messages['no-result']}</td></tr>
      );
    }
    return result;
  };

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.zoneCode;
    return (
      <Fragment>
        <Button
          color="success"
          onClick={(e) => this.toggleModal(e, 'add', null)}
          className="master-data-btn"
          size="sm"
        >{messages['zone_code.add-new']}</Button>
        <Action modalOpen={modalOpen} />
        {selected.length > 0 &&
            <Button
            color="danger"
            onClick={(e) => this.onDelete(e, selected)}
            className="master-data-btn"
            size="sm"
          >{messages['zone_code.delete']}</Button>
        }
      </Fragment>
    )
  }


  render() {
    const { items, loading, total } = this.props.zoneCode;
    const { messages } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
            Header: '#',
            accessor: "#",
            Cell: ({ original }) => {
              return (
               original.id
              )
            },
            sortable: false,
        },
        {
          Header: messages['zone_code.code'],
          accessor: "zone_code.code",
          Cell: ({ original }) => {
            return (
             original.code
            )
          },
          sortable: false,
        },
        {
          Header: messages['pri_man.carrier'],
          accessor: "zone_code.carrier",
          Cell: ({ original }) => {
            return (
             original.carrier_code
            )
          },
          sortable: false
        },
        {
            Header: messages['pri_man.category'],
            accessor: "zone_code.category",
            Cell: ({ original }) => {
              return (
               original.category
              )
            },
            sortable: false,
        },
        {
            Header: messages['pri_man.service'],
            accessor: "zone_code.service",
            Cell: ({ original }) => {
              return (
               original.service_code
              )
            },
            sortable: false,
        },
        {
            Header: messages['pri_man.shipment-type'],
            accessor: "zone_code.shipmenttype",
            Cell: ({ original }) => {
              return (
               original.shipmenttype_code
              )
            },
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
            accessor: "zone_code.customer",
            Cell: ({ original }) => {
              return (
               original.customer_name
              )
            },
            sortable: false,
        },
        {
            Header: messages['zone_code.country_origin'],
            accessor: "zone_code.country_origin",
            Cell: ({ original }) => {
              return (
               original.origin_country_name
              )
            },
            sortable: false,
        },
        {
          Header: messages['zone_code.city_origin'],
          accessor: "zone_code.city_origin",
          Cell: ({ original }) => {
            return (
             original.origin_city_name
            )
          },
          sortable: false,
        },
        {
          Header: messages['zone_code.country_destination'],
          accessor: "zone_code.country_destination",
          Cell: ({ original }) => {
            return (
             original.destination_country_name
            )
          },
          sortable: false,
        },
        {
          Header: messages['zone_code.city_destination'],
          accessor: "zone_code.city_destination",
          Cell: ({ original }) => {
            return (
             original.destination_city_name
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
                  <Button color="info" size="sm" onClick={(e) => this.toggleModal(e, 'edit', original)}><span className="lnr lnr-pencil" /></Button> &nbsp;
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
  modal: PropTypes.object,
  getZoneCodeList: PropTypes.func.isRequired,
  toggleZoneCodeModal: PropTypes.func.isRequired
};

const mapStateToProps = ({ zoneCode, modal }) => {
  return {
    zoneCode,
    modal
  };
};

export default injectIntl(connect(mapStateToProps, {
  getZoneCodeList,
  toggleZoneCodeModal,
  deleteZoneCodeItem
})(List));
