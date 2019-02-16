/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Card, CardBody, Col, Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Item from './Item';
import Pagination from '../../../../containers/Shared/pagination/Pagination';
import ItemPerPage from '../../../../containers/Shared/pagination/ItemPerPage';
import { SELECTED_PAGE_SIZE } from '../../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';
import { getServiceList, toggleServiceModal } from "../../../../redux/actions";

const ServiceFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

ServiceFormatter.propTypes = {
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

    if (this.props.service.paramSearch) {
      Object.assign(params, { "query": this.props.service.paramSearch})
    }
    this.props.getServiceList(params, messages);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  };

toggleModal = () => {
  this.props.toggleServiceModal();
};

  onChangePage = (page) => {
    const { messages } = this.props.intl;
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    };

    if (this.props.service.paramSearch) {
      Object.assign(params, { "query": this.props.service.paramSearch })
    }
    this.props.getServiceList(params, messages);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    const { messages } = this.props.intl;
    this.props.getServiceList(null, messages);
  }

  showServiceItem = (items) => {
    const { messages } = this.props.intl;
    let result = null;
    if (items != null && items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item key={index} service={item} />
        );
      })
    } else {
      result = (
        <tr><td colSpan={8} className="text-center">{messages['no-result']}</td></tr>
      );
    }
    return result;
  };


  render() {
    const { items, loading, modalOpen, total } = this.props.service;
    const { messages, locale } = this.props.intl;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <Search />
            <div className="mb-2">
              <Button 
                color="success" 
                onClick={this.toggleModal}
                className="master-data-btn"
                size="sm"
              >{messages['service.add-new']}</Button>
              <Action modalOpen={modalOpen} />
              <ItemPerPage selectedPageSize={this.state.selectedPageSize} changePageSize={this.onChangePageSize} />
            </div>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{messages['service.code']}</th>
                  <th>{locale === 'en-US' ? (messages['service.name-en']) : (messages['service.name'])}</th>
                  <th>{messages['service.status']}</th>
                  <th>{messages['service.created-at']}</th>
                  <th>{messages['service.updated-at']}</th>
                  <th>{messages['action']}</th>
                </tr>
                </thead>
                <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="text-center"><div className="loading-table" /></td></tr>
                ) : (
                  this.showServiceItem(items)
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
  service: PropTypes.object.isRequired,
  modal: PropTypes.object,
  getServiceList: PropTypes.func.isRequired,
  toggleServiceModal: PropTypes.func.isRequired
};

const mapStateToProps = ({ service, modal }) => {
  return {
    service,
    modal
  };
};

export default injectIntl(connect(mapStateToProps, {
  getServiceList,
  toggleServiceModal
})(List));
