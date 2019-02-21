/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { Card, CardBody, Col,Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import Table from '../../../containers/Shared/table/Table';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
  getStatusList,
  toggleStatusModal,
  deleteStatusItem
} from "../../../redux/actions";
import ConfirmPicker from '../../../containers/Shared/picker/ConfirmPicker';


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
  
  toggleModal = (status) => {
    this.props.toggleStatusModal(status);
  }

  onDelete = (ids) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmPicker 
            onClose={onClose}
            onDelete={() => this.props.deleteStatusItem(ids, messages)}
            messages={messages}
          />
        )
      }
    })
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

  renderHeader = (selected) => {
    const { messages } = this.props.intl;
    const { modalOpen } = this.props.status;
    return (
      <Fragment>
        <Button
          color="success"
          onClick={() => this.toggleModal(null)}
          className="master-data-btn"
          size="sm"
        >{messages['status.add-new']}</Button>
        <Action modalOpen={modalOpen} />
        {selected.length > 0 &&
            <Button
            color="danger"
            onClick={() => this.onDelete(selected)}
            className="master-data-btn"
            size="sm"
          >{messages['status.delete']}</Button>
        }
      </Fragment>
    )
  }

  render() {
    const { items, loading, total } = this.props.status;
    const { messages, locale } = this.props.intl;
    const columnTable = {
      checkbox: true,
      columns: [
        {
          Header: messages['name'],
          accessor: "name",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.name_en : original.name
            )
          },
          sortable: false,
        },
        {
          Header: messages['description'],
          accessor: "description",
          Cell: ({ original }) => {
            return (
              locale === 'en-US' ? original.description_en : original.description
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
          Header: messages['created-at'],
          accessor: "created_at",
          sortable: false,
        },
        {
          Header: messages['action'],
          accessor: "",
          className: "text-center", 
          Cell: ({ original }) => {
            return (
              <Fragment>
                <Button color="info" size="sm" onClick={() => this.toggleModal(original)}><span className="lnr lnr-pencil" /></Button> &nbsp;
                <Button color="danger" size="sm" onClick={() => this.onDelete([original.id])}><span className="lnr lnr-trash" /></Button>
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
            />
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
    deleteStatusItem
  }
)(List));
