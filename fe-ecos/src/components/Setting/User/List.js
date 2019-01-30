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
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import Action from './Action';

import {
  getUserList,
  toggleUserModal
} from "../../../redux/actions";


const UserFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

UserFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
      total: 20
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

    if (this.props.user.paramSearch) {
      Object.assign(params, { "query": this.props.user.paramSearch})
    };
    this.props.getUserList(params, this.props.history);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  }

  toggleModal = () => {
    this.props.toggleUserModal();
  }

  onChangePage = (page) => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    if (this.props.user.paramSearch) {
      Object.assign(params, { "query": this.props.user.paramSearch })
    };
    this.props.getUserList(params);

    this.setState({
      currentPage: page
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.user && nextProps.user.total) {
      this.setState({
        total: nextProps.user.total
      });
    }
  }

  componentDidMount() {
    this.props.getUserList();
  }

  showUserItem = (items) => {
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item 
            key={index}
            user={item}
          />
        )
      })
    }
    return result;
  }

  render() {
    const { items, loading, modalOpen,total } = this.props.user;
    const { messages } = this.props.intl;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <div className="card__title">
              <h5 className="bold-text">{messages['user.list-title']}</h5>
              <ButtonToolbar className="master-data-list__btn-toolbar-top">
                <form className="form">
                  <div className="form__form-group products-list__search">
                    <input placeholder="Search..." name="search" />
                    <MagnifyIcon />
                  </div>
                </form>
                <Button 
                  color="success" 
                  className="master-data-list__btn-add btn-sm"
                  onClick={this.toggleModal}
                >{messages['user.add-new']}</Button>
              </ButtonToolbar>
              <Action modalOpen={modalOpen} />
            </div>
            <ItemPerPage selectedPageSize={this.state.selectedPageSize} changePageSize={this.onChangePageSize} />
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{messages['user.avatar']}</th>
                  <th>{messages['user.username']}</th>
                  <th>{messages['user.fullname']}</th>
                  <th>{messages['user.status']}</th>
                  <th>{messages['user.created-at']}</th>
                  <th className="text-center">{messages['user.action']}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="text-center"><div className="loading-table" /></td></tr>
                ) : (
                    this.showUserItem(items)
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
  user: PropTypes.object.isRequired,
  getUserList: PropTypes.func.isRequired,
  toggleUserModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ users }) => {
  const { user } = users;
  return {
    user
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getUserList,
    toggleUserModal,
  }
)(List));
