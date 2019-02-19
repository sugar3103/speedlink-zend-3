/* eslint-disable react/no-unused-state */
import React, { Component, Fragment} from 'react';
import { Card, CardBody, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Item from './Item';
import Table from '../../../../containers/Shared/table/Table';
import { SELECTED_PAGE_SIZE } from '../../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';
import { getZoneCodeList, toggleZoneCodeModal } from "../../../../redux/actions";

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

    if (this.props.zonecode.paramSearch) {
      Object.assign(params, { "query": this.props.zonecode.paramSearch})
    }
    this.props.getZoneCodeList(params, messages);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  };

toggleModal = () => {
  this.props.toggleZoneCodeModal();
};

  onChangePage = (page) => {
    const { messages } = this.props.intl;
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    };

    if (this.props.zonecode.paramSearch) {
      Object.assign(params, { "query": this.props.zonecode.paramSearch })
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
          <Item key={index} zonecode={item} />
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
    const { modalOpen } = this.props.zonecode;
    
    return (
      <Fragment>
        <Button
          color="success"
          onClick={this.toggleModal}
          className="master-data-btn"
          size="sm"
        >{messages['zonecode.add-new']}</Button>
        <Action modalOpen={modalOpen} />

      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.zonecode;
    const { messages } = this.props.intl;
    const columns = [
        {
            Header: '#',
            accessor: "#"
        },
        {
          Header: messages['zonecode.name'],
          accessor: "zonecode.name"
        },
        {
          Header: messages['zonecode.carrier'],
          accessor: "zonecode.carrier"
        },
        {
            Header: messages['zonecode.category'],
            accessor: "zonecode.category"
        },
        {
            Header: messages['zonecode.service'],
            accessor: "zonecode.service"
        },
        {
            Header: messages['zonecode.shipmenttype'],
            accessor: "zonecode.shipmenttype"
        },
        {
            Header: messages['status'],
            accessor: "status"
        },
        {
            Header: messages['zonecode.customer'],
            accessor: "zonecode.customer"
        },
        {
            Header: messages['zonecode.country_origin'],
            accessor: "zonecode.country_origin"
        },
        {
          Header: messages['zonecode.city_origin'],
          accessor: "zonecode.city_origin"
        },
        {
          Header: messages['zonecode.country_destination'],
          accessor: "zonecode.country_destination"
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
              {this.showZoneCodeItem(items)}
              </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  zonecode: PropTypes.object.isRequired,
  modal: PropTypes.object,
  getZoneCodeList: PropTypes.func.isRequired,
  toggleZoneCodeModal: PropTypes.func.isRequired
};

const mapStateToProps = ({ zonecode, modal }) => {
  return {
    zonecode,
    modal
  };
};

export default injectIntl(connect(mapStateToProps, {
  getZoneCodeList,
  toggleZoneCodeModal
})(List));
