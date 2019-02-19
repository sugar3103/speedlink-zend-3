/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col,Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Item from './Item';
import Table from '../../../containers/Shared/table/Table';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';

import {
  getStatusList,
  toggleStatusModal
} from "../../../redux/actions";


const StatusFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

StatusFormatter.propTypes = {
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
    }

    if (this.props.status.paramSearch) {
      Object.assign(params, { "query": this.props.status.paramSearch })
    };
    this.props.getStatusList(params, messages);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  }

  toggleModal = () => {
    this.props.toggleStatusModal();
  }

  onChangePage = (page) => {
    const { messages } = this.props.intl;
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    if (this.props.status.paramSearch) {
      Object.assign(params, { "query": this.props.status.paramSearch })
    };
    this.props.getStatusList(params, messages);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    const { messages } = this.props.intl;
    this.props.getStatusList(null, messages);
  }

  showStatusItem = (items) => {
    const { messages } = this.props.intl;
    let result = null;

    if (items && items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item
            key={index}
            status={item}
          />
        )
      })
    } else {
      result = (
        <tr><td colSpan={6} className="text-center">{messages['no-result']}</td></tr>
      )
    }
    return result;
  }

  actionHeader = () => {
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.status;
    return (
      <Fragment>
        <Button
          color="success"
          onClick={this.toggleModal}
          className="master-data-btn"
          size="sm"
        >{messages['status.add-new']}</Button>
        <Action modalOpen={modalOpen} />

      </Fragment>
    )
  }
  render() {
    const { items, loading, total } = this.props.status;
    const { messages } = this.props.intl;
    const columns = [
      {
        Header: messages['name'],
        accessor: "name"
      },
      {
        Header: messages['description'],
        accessor: "description"
      },
      {
        Header: messages['status'],
        accessor: "status"
      },
      {
        Header: messages['created-at'],
        accessor: "created-at"
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
              {this.showStatusItem(items)}
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  status: PropTypes.object.isRequired,
  modal: PropTypes.object,
  getStatusList: PropTypes.func.isRequired,
  toggleStatusModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ status, modal }) => {
  return {
    status,
    modal
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getStatusList,
    toggleStatusModal,
  }
)(List));
