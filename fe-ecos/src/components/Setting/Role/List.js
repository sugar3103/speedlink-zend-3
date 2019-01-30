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

import {
  getRoleList,
  toggleRoleModal
} from "../../../redux/actions";
import Action from './Action';


const RoleFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

RoleFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

class List extends Component {
  constructor() {
    super();
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
      total: 20,
      searchRole: ''
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

    if (this.props.role.paramSearch) {
      Object.assign(params, { "query": this.props.role.paramSearch })
    };
    this.props.getRoleList(params, this.props.history);

    this.setState({
      selectedPageSize: size
    });
  }

  toggleModal = () => {
    this.props.toggleRoleModal();
  }

  onChangePage = (page) => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    if (this.props.role.paramSearch) {
      Object.assign(params, { "query": this.props.role.paramSearch })
    };
    this.props.getRoleList(params);

    this.setState({
      currentPage: page
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.role && nextProps.role.total) {
      this.setState({
        total: nextProps.role.total
      });
    }
  }

  componentDidMount() {
    this.props.getRoleList();
  }

  showRoleItem = (items,messages) => {
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item
            key={index}
            role={item}
          />
        )
      })
    } else {
      result = (
        <tr><td colSpan={8} className="text-center">{messages['no-result']}</td></tr>
      )
    }
    return result;
  }

  handleSearch = (e) => {
    e.preventDefault();
    
    let params = {
      offset: {
        start: 1,
        limit: this.state.selectedPageSize
      }
    }
    Object.assign(params, { "query": {"name": this.state.searchRole}});
    this.props.getRoleList(params);
  }

  handleChange = (e) => {
    this.setState({searchRole: e.target.value});
  }

  render() {
    const { items, loading, modalOpen, total } = this.props.role;
    const { messages } = this.props.intl;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <div className="card__title">
              <h5 className="bold-text">{messages['role.list-title']}</h5>
              <ButtonToolbar className="master-data-list__btn-toolbar-top">
                <Button
                  color="success"
                  className="master-data-list__btn-add btn-sm"
                  onClick={this.toggleModal}
                >{messages['role.add-new']}</Button>
                <form className="form" onSubmit={this.handleSearch}>
                  <div className="form__form-group products-list__search">
                    <input placeholder="Search..." name="search" value={this.state.searchPermission} onChange={this.handleChange} />
                    <MagnifyIcon />
                  </div>
                </form>
              </ButtonToolbar>
              <Action modalOpen={modalOpen} />
            </div>
            <ItemPerPage selectedPageSize={this.state.selectedPageSize} changePageSize={this.onChangePageSize} />
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{messages['role.name']}</th>
                  <th>{messages['description']}</th>
                  <th>{messages['status']}</th>
                  <th>{messages['created-at']}</th>
                  <th className="text-center">{messages['action']}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="text-center"><div className="loading-table" /></td></tr>
                ) : (
                    this.showRoleItem(items,messages)
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
  role: PropTypes.object.isRequired,
  getRoleList: PropTypes.func.isRequired,
  toggleRoleModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ users }) => {
  const { role } = users;
  return {
    role,
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getRoleList,
    toggleRoleModal,
  }
)(List));
