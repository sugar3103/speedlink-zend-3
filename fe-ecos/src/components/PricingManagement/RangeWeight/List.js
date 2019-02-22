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
import { getRangeWeightList, toggleRangeWeightModal, deleteRangeWeightItem } from "../../../redux/actions";
import { confirmAlert } from 'react-confirm-alert';
import ConfirmPicker from '../../../containers/Shared/picker/ConfirmPicker';
import 'react-confirm-alert/src/react-confirm-alert.css';


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
    const { messages } = this.props.intl;
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
    this.props.getRangeWeightList(params, messages);

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
            onDelete={() => this.props.deleteRangeWeightItem(ids, messages)}
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

    if (this.props.rangeWeight.paramSearch) {
      Object.assign(params, { "query": this.props.rangeWeight.paramSearch })
    }
    this.props.getRangeWeightList(params, messages);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    const { messages } = this.props.intl;
    this.props.getRangeWeightList(null, messages);
  }

  showRangeWeightItem = (items) => {
    const { messages } = this.props.intl;
    let result = null;
    if (items != null && items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item key={index} rangeWeight={item} />
        );
      })
    } else {
      result = (
        <tr><td colSpan={8} className="text-center">{messages['no-result']}</td></tr>
      );
    }
    return result;
  };

  // actionHeader = () => {
  //   const { messages } = this.props.intl;
  //   const { modalOpen } = this.props.rangeweight;
    
  //   return (
  //     <Fragment>
  //       <Button
  //         color="success"
  //         onClick={this.toggleModal}
  //         className="master-data-btn"
  //         size="sm"
  //       >{messages['rangeweight.add-new']}</Button>
  //       <Action modalOpen={modalOpen} />

  //     </Fragment>
  //   )
  // }

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.rangeWeight;
    return (
      <Fragment>
        <Button
          color="success"
          onClick={(e) => this.toggleModal(e, 'add', null)}
          className="master-data-btn"
          size="sm"
        >{messages['range_weight.add-new']}</Button>
        <Action modalOpen={modalOpen} />
        {selected.length > 0 &&
            <Button
            color="danger"
            onClick={(e) => this.onDelete(e, selected)}
            className="master-data-btn"
            size="sm"
          >{messages['range_weight.delete']}</Button>
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
            Header: '#',
            accessor: "#",
            width: 30,
            Cell: ({ original }) => {
              return (
               original.id
              )
            },
            sortable: false,
        },
        {
          Header: messages['range_weight.name'],
          accessor: "range_weight.name",
          Cell: ({ original }) => {
            return (
             original.code
            )
          },
          sortable: false,
        },
        {
          Header: messages['range_weight.carrier'],
          accessor: "range_weight.carrier",
          Cell: ({ original }) => {
            return (
             original.carrier_code
            )
          },
          sortable: false
        },
        {
            Header: messages['range_weight.category'],
            accessor: "range_weight.category",
            Cell: ({ original }) => {
              return (
               original.category
              )
            },
            sortable: false
        },
        {
            Header: messages['range_weight.service'],
            accessor: "range_weight.service",
            Cell: ({ original }) => {
              return (
               original.service_code
              )
            },
            sortable: false
        },
        {
            Header: messages['range_weight.shipmenttype'],
            accessor: "range_weight.shipmenttype",
            Cell: ({ original }) => {
              return (
               original.shipmenttype_code
              )
            },
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
            Header: messages['range_weight.customer'],
            accessor: "range_weight.customer",
            Cell: ({ original }) => {
              return (
               original.customer_name
              )
            },
            sortable: false
        },
        {
            Header: messages['range_weight.from'],
            accessor: "range_weight.from",
            Cell: ({ original }) => {
              return (
               original.from
              )
            },
            sortable: false
        },
        {
            Header: messages['range_weight.to'],
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
            accessor: "range_weight.calculate",
            Cell: ({ original }) => {
              return (
               original.calculate_unit
              )
            },
            sortable: false
        },
        {
            Header: messages['range_weight.unit'],
            accessor: "range_weight.unit",
            Cell: ({ original }) => {
              return (
               original.unit
              )
            },
            sortable: false
        },
        {
            Header: messages['range_weight.roundup'],
            accessor: "range_weight.roundup",
            Cell: ({ original }) => {
              return (
               original.round_up
              )
            },
            sortable: false
        },
        {
            Header: messages['action'], 
            Cell: ({ original }) => {
              return (
                <Fragment>
                  <Button color="info" size="sm" onClick={(e) => this.toggleModal(e, 'edit', original)}><span className="lnr lnr-pencil" /></Button> &nbsp;
                  <Button color="danger" size="sm" onClick={(e) => this.onDelete(e, [original.id])}><span className="lnr lnr-trash" /></Button>
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
              // header={this.actionHeader()}
              renderHeader={this.renderHeader}
              loading={loading}
              columnTable={columnTable}
              // columns={columns}
              pages={{
                pagination: this.state,
                total: total,
                onChangePage: this.onChangePage
              }}
              size={{
                selectedPageSize: this.state.selectedPageSize,
                changePageSize: this.onChangePageSize
              }}
              // data={items && items.length}
              data={items}
              onRowClick={this.toggleModal}
            />
              {/* {this.showRangeWeightItem(items)}
              </Table> */}
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

const mapStateToProps = ({ rangeWeight, modal }) => {
  return {
    rangeWeight,
    modal
  };
};

export default injectIntl(connect(mapStateToProps, {
  getRangeWeightList,
  toggleRangeWeightModal,
  deleteRangeWeightItem
})(List));
