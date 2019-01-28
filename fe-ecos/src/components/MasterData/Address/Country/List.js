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

import {
  getCountryList,
  toggleCountryModal
} from "../../../../redux/actions";


const CountryFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

CountryFormatter.propTypes = {
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

    if (this.props.country.paramSearch) {
      Object.assign(params, { "query": this.props.country.paramSearch})
    };
    this.props.getCountryList(params, messages);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  }

  toggleModal = () => {    
    this.props.toggleCountryModal();
  }

  onChangePage = (page) => {
    const { messages } = this.props.intl;
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }

    if (this.props.country.paramSearch) {
      Object.assign(params, { "query": this.props.country.paramSearch })
    };
    this.props.getCountryList(params, messages);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    const { messages } = this.props.intl;
    this.props.getCountryList(null, messages);
  }

  showCountryItem = (items) => {
    const { messages } = this.props.intl;
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item 
            key={index}
            country={item}
          />
        )
      })
    } else {
      result = (
        <tr><td colSpan={8} className="text-center">{messages['country.no-result']}</td></tr>
      )
    }
    return result;
  }

  render() {
    const { items, loading, modalOpen, total } = this.props.country;
    const { messages } = this.props.intl;
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
              >{messages['country.add-new']}</Button>
              <Action modalOpen={modalOpen} />
              <ItemPerPage selectedPageSize={this.state.selectedPageSize} changePageSize={this.onChangePageSize} />
            </div>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{messages['country.name']}</th>
                  <th>{messages['country.name-en']}</th>
                  <th>{messages['country.desc']}</th>
                  <th>{messages['country.desc-en']}</th>
                  <th>{messages['country.iso-code']}</th>
                  <th>{messages['country.status']}</th>
                  <th>{messages['country.created-at']}</th>
                  <th>{messages['country.action']}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="text-center"><div className="loading-table" /></td></tr>
                ) : (
                    this.showCountryItem(items)
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
  country: PropTypes.object.isRequired,
  getCountryList: PropTypes.func.isRequired,
  toggleCountryModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ address }) => {
  const { country } = address;
  return {
    country
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getCountryList,
    toggleCountryModal,
  }
)(List));
