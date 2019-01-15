import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { 
  Row, 
  Button, 
  Table, 
} from 'reactstrap';
import { Colxx } from "../../../components/Layout/CustomBootstrap";
import Pagination from '../../../components/Layout/Pagination';
import IntlMessages from "../../../util/IntlMessages";

import Item from '../../../components/MasterData/Address/ItemDistrict';
import Search from '../../../components/MasterData/Address/SearchDistrict';
import { connect } from "react-redux";
import {
  getDistrictList
} from "../../../redux/actions";
import ItemPerPage from '../../../components/Layout/ItemPerPage';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';

class DistrictPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
    }
  }

  onChangePage = (page) => {
    let params = {
      pagination: {
        page: parseInt(page, 10),
        perpage: parseInt(this.state.selectedPageSize, 10)
      }
    }
    
    if (this.props.address.paramSearch) {
      Object.assign(params, { "query": this.props.address.paramSearch})
    };
    this.props.getDistrictList(params, this.props.history);

    this.setState({
      currentPage: page
    });
  }

  changePageSize = (size) => {
    let params = {
      pagination: {
        page: 1,
        perpage: size
      }
    }

    if (this.props.address.paramSearch) {
      Object.assign(params, { "query": this.props.address.paramSearch})
    };
    this.props.getDistrictList (params, this.props.history);

    this.setState({
      selectedPageSize: size
    });
  }

  componentDidMount() {
    this.props.getDistrictList (null, this.props.history);
  }

  showStatusItem = (items) => {
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item 
            key={index}
            district={item}
          />
        )
      })
      return result;
    } else {
      return (
        <tr>
          <td colSpan="5" align="center">
            No data
          </td>
        </tr>
      )
    }
    
  }

  render() {
    const { messages } = this.props.intl;
    const { items, loading,modalOpen } = this.props.address;
    
    return (
      <Fragment>
        <div className="disable-text-selection">
          <Row>
            <Colxx xxs="12">
              <div className="mb-2">
                <h1>
                  <IntlMessages id="menu.address_district" />
                </h1>
                <div className="float-sm-right">
                  <Button
                    color="success"
                    onClick={this.toggleModal}
                    size="sm"
                  >
                    <IntlMessages id="address.add-new-district" />
                  </Button>
                  {/* <Action modalOpen={modalOpen} /> */}
                </div>
              </div>
              <Search history={this.props.history} />
              <div className="mb-2">
                <Button color="warning" size="sm" className="float-sm-left">{messages["address.export"]}</Button>
                <ItemPerPage changePageSize={this.changePageSize} selectedPageSize={this.state.selectedPageSize} />
                <div className="clearfix"></div>
              </div>
              <div className="mb-2">
                <Table bordered hover>
                <thead>
                    <tr>
                      <th width="5%">{messages["address.id"]}</th>
                      <th>{messages["address.district"]}</th>
                      <th>{messages["address.status"]}</th>
                      <th>{messages["address.created"]}</th>                      
                      <th width="15%" className="text-center">{messages["address.action"]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={9} className="text-center"><div className="loading-table" /></td></tr>
                    ) : (
                      this.showStatusItem(items.data)
                    )}
                  </tbody>
                </Table>
              </div>
              {items && items.meta && <Pagination meta={items.meta} onChangePage={this.onChangePage} /> }
            </Colxx>
          </Row>
        </div>
      </Fragment>
    );
  }
}

DistrictPage.propTypes = {
  address: PropTypes.object.isRequired,
  getDistrictList : PropTypes.func.isRequired,
}

const mapStateToProps = ({ address }) => {
  return {
    address
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getDistrictList
  }
)(DistrictPage));
