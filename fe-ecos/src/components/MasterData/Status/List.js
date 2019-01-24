/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { ButtonToolbar, Card, CardBody, Col, Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Item from './Item';
import Pagination from '../../../containers/Shared/pagination/Pagination';
import ItemPerPage from '../../../containers/Shared/pagination/ItemPerPage';
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
    size = parseInt(size, 10);
    let params = {
      offset: {
        start: 1,
        limit: size
      }
    }

    if (this.props.status.paramSearch) {
      Object.assign(params, { "query": this.props.status.paramSearch})
    };
    this.props.getStatusList(params, this.props.history);

    this.setState({
      selectedPageSize: size
    });
  }

  toggleModal = () => {    
    this.props.toggleStatusModal();
  }

  onChangePage = (page) => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    if (this.props.status.paramSearch) {
      Object.assign(params, { "query": this.props.status.paramSearch })
    };
    this.props.getStatusList(params);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    this.props.getStatusList();
  }

  showStatusItem = (items) => {
    const { messages } = this.props.intl;
    let result = null;
    if (items.length > 0) {
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
        <tr><td colSpan={8} className="text-center">{messages['status.no-result']}</td></tr>
      )
    }
    return result;
  }

  render() {
    const { items, loading, modalOpen, total } = this.props.status;
    const { messages } = this.props.intl;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <div className="card__title">
              <h5 className="bold-text">{messages['status.list-title']}</h5>
              <ButtonToolbar className="master-data-list__btn-toolbar-top">
                <Button 
                  color="success" 
                  className="master-data-list__btn-add"
                  onClick={this.toggleModal}
                >{messages['status.add-new']}</Button>
              </ButtonToolbar>
              <Action modalOpen={modalOpen} />
            </div>
            <Search />
            <ItemPerPage selectedPageSize={this.state.selectedPageSize} changePageSize={this.onChangePageSize} />
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{messages['status.name']}</th>
                  <th>{messages['status.name-en']}</th>
                  <th>{messages['status.desc']}</th>
                  <th>{messages['status.desc-en']}</th>
                  <th>{messages['status.status']}</th>
                  <th>{messages['status.created-at']}</th>
                  <th>{messages['status.action']}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="text-center"><div className="loading-table" /></td></tr>
                ) : (
                    this.showStatusItem(items)
                  )}
              </tbody>
            </Table>
            <Pagination pagination={this.state} total={total} onChangePage={this.onChangePage} />
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
