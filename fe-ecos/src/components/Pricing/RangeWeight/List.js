/* eslint-disable react/no-unused-state */
import React, { Component, Fragment} from 'react';
import { Card, CardBody, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Item from './Item';
import Table from '../../../containers/Shared/table/Table';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';
import { getRangeWeightList, toggleRangeWeightModal } from "../../../redux/actions";

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

    if (this.props.rangeweight.paramSearch) {
      Object.assign(params, { "query": this.props.rangeweight.paramSearch})
    }
    this.props.getRangeWeightList(params, messages);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  };

toggleModal = () => {
  this.props.toggleRangeWeightModal();
};

  onChangePage = (page) => {
    const { messages } = this.props.intl;
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    };

    if (this.props.rangeweight.paramSearch) {
      Object.assign(params, { "query": this.props.rangeweight.paramSearch })
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
          <Item key={index} rangeweight={item} />
        );
      })
    } else {
      result = (
        <tr><td colSpan={8} className="text-center">{messages['no-result']}</td></tr>
      );
    }
    return result;
  };

  actionHeader = () => {
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.rangeweight;
    
    return (
      <Fragment>
        <Button
          color="success"
          onClick={this.toggleModal}
          className="master-data-btn"
          size="sm"
        >{messages['rangeweight.add-new']}</Button>
        <Action modalOpen={modalOpen} />

      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.rangeweight;
    const { messages } = this.props.intl;
    const columns = [
        {
            Header: '#',
            accessor: "#"
        },
        {
          Header: messages['rangeweight.name'],
          accessor: "rangeweight.name"
        },
        {
          Header: messages['rangeweight.carrier'],
          accessor: "rangeweight.carrier"
        },
        {
            Header: messages['rangeweight.category'],
            accessor: "rangeweight.category"
        },
        {
            Header: messages['rangeweight.service'],
            accessor: "rangeweight.service"
        },
        {
            Header: messages['rangeweight.shipmenttype'],
            accessor: "rangeweight.shipmenttype"
        },
        {
            Header: messages['status'],
            accessor: "status"
        },
        {
            Header: messages['rangeweight.customer'],
            accessor: "rangeweight.customer"
        },
        {
            Header: messages['rangeweight.from'],
            accessor: "rangeweight.from"
        },
        {
            Header: messages['rangeweight.to'],
            accessor: "rangeweight.to"
        },
        {
            Header: messages['rangeweight.calculate'],
            accessor: "rangeweight.calculate"
        },
        {
            Header: messages['rangeweight.unit'],
            accessor: "rangeweight.unit"
        },
        {
            Header: messages['rangeweight.roundup'],
            accessor: "rangeweight.roundup"
        },
        {
            Header: messages['action']
        }
      ]

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <Search />
            <Table 
              header={this.actionHeader()}
              loading={loading}
              columns={columns}
              pages={{
                pagination: this.state,
                total: total,
                onChangePage: this.onChangePage
              }}
              size={{
                selectedPageSize: this.state.selectedPageSize,
                changePageSize: this.onChangePageSize
              }}
              data={items && items.length}
            >
              {this.showRangeWeightItem(items)}
              </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  rangeweight: PropTypes.object.isRequired,
  modal: PropTypes.object,
  getRangeWeightList: PropTypes.func.isRequired,
  toggleRangeWeightModal: PropTypes.func.isRequired
};

const mapStateToProps = ({ rangeweight, modal }) => {
  return {
    rangeweight,
    modal
  };
};

export default injectIntl(connect(mapStateToProps, {
  getRangeWeightList,
  toggleRangeWeightModal
})(List));
