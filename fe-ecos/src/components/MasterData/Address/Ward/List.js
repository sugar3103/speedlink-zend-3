/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { ButtonToolbar, Card, CardBody, Col, Table, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import Item from './Item';
import Pagination from '../../../../containers/Shared/pagination/Pagination';
import ItemPerPage from '../../../../containers/Shared/pagination/ItemPerPage';
import { SELECTED_PAGE_SIZE } from '../../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import Action from './Action';
import Search from './Search';

import {
  getWardList,
  toggleWardModal
} from "../../../../redux/actions";


const WardFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

WardFormatter.propTypes = {
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

    if (this.props.ward.paramSearch) {
      Object.assign(params, { "query": this.props.ward.paramSearch})
    };
    this.props.getWardList(params, messages);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  }

  toggleModal = () => {    
    this.props.toggleWardModal();
  }

  onChangePage = (page) => {
    const { messages } = this.props.intl;
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    if (this.props.ward.paramSearch) {
      Object.assign(params, { "query": this.props.ward.paramSearch })
    };
    this.props.getWardList(params, messages);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    const { messages } = this.props.intl;
    this.props.getWardList(null, messages);
  }

  showWardItem = (items) => {
    const { messages } = this.props.intl;
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item 
            key={index}
            ward={item}
          />
        )
      })
    } else {
      result = (
        <tr><td colSpan={8} className="text-center">{messages['ward.no-result']}</td></tr>
      )
    }
    return result;
  }

  render() {
    const { items, loading, modalOpen, total } = this.props.ward;
    const { messages } = this.props.intl;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <div className="card__title">
              <h5 className="bold-text">{messages['ward.list-title']}</h5>
              <ButtonToolbar className="master-data-list__btn-toolbar-top">
                <Button 
                  color="success" 
                  className="master-data-list__btn-add"
                  onClick={this.toggleModal}
                >{messages['ward.add-new']}</Button>
              </ButtonToolbar>
              <Action modalOpen={modalOpen} />
            </div>
            <Search />
            <ItemPerPage selectedPageSize={this.state.selectedPageSize} changePageSize={this.onChangePageSize} />
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{messages['ward.name']}</th>
                  <th>{messages['ward.name-en']}</th>
                  <th>{messages['ward.desc']}</th>
                  <th>{messages['ward.desc-en']}</th>
                  <th>{messages['ward.postal-code']}</th>
                  <th>{messages['ward.status']}</th>
                  <th>{messages['ward.created-at']}</th>
                  <th>{messages['ward.action']}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="text-center"><div className="loading-table" /></td></tr>
                ) : (
                    this.showWardItem(items)
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
  ward: PropTypes.object.isRequired,
  getWardList: PropTypes.func.isRequired,
  toggleWardModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ address }) => {
  const { ward } = address;
  return {
    ward
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getWardList,
    toggleWardModal,
  }
)(List));
