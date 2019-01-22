import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { 
  Row, 
  Button, 
  Table, 
} from 'reactstrap';
import { Colxx } from "../../components/Layout/CustomBootstrap";
import Pagination from '../../components/Layout/Pagination';
import IntlMessages from "../../util/IntlMessages";
import Action from '../../components/MasterData/Branch/Action';
import Search from '../../components/MasterData/Branch/Search';
import Item from '../../components/MasterData/Branch/Item';

import { connect } from "react-redux";
import {
  getBranchList,
  toggleBranchModal,
  getCityListSelect,
  getHubListSelect,
  getWardListSelect,
  getDistrictListSelect,
  getCountryListSelect
} from "../../redux/actions";
import ItemPerPage from '../../components/Layout/ItemPerPage';
import { SELECTED_PAGE_SIZE } from '../../constants/defaultValues';

class BranchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
    }
  }

  toggleModal = () => {
    this.props.toggleBranchModal();
  }

  onChangePage = (page) => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }
    
    if (this.props.branch.paramSearch) {
      Object.assign(params, { "query": this.props.branch.paramSearch})
    };
    this.props.getBranchList(params, this.props.history);

    this.setState({
      currentPage: page
    });
  }

  changePageSize = (size) => {
    let params = {
      offset: {
        start: 0,
        limit: size
      }
    }

    if (this.props.branch.paramSearch) {
      Object.assign(params, { "query": this.props.branch.paramSearch})
    };
    this.props.getBranchList(params, this.props.history);

    this.setState({
      selectedPageSize: size
    });
  }

  componentDidMount() {
     let params2 = {
      offset: {
        start: 0,
        limit: SELECTED_PAGE_SIZE
      }
    }
    this.props.getBranchList(params2, this.props.history);
    this.props.getCityListSelect(null, this.props.history);
    this.props.getHubListSelect(null, this.props.history);
    this.props.getWardListSelect(null, this.props.history);
    this.props.getDistrictListSelect(null, this.props.history);
    this.props.getCountryListSelect(null, this.props.history);
  }

  showBranchItem = (items) => {
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item 
            key={index}
            branch={item}
          />
        )
      })
    }
    return result;
  }

  render() {
    const { messages } = this.props.intl;
    const { items, loading, modalOpen } = this.props.branch;

console.log(items);
    return (
      <Fragment>
        <div className="disable-text-selection">
          <Row>
            <Colxx xxs="12">
              <div className="mb-2">
                <h1>
                  <IntlMessages id="menu.branch" />
                </h1>
                <div className="float-sm-right">
                  <Button
                    color="success"
                    onClick={this.toggleModal}
                    size="sm"
                  >
                    <IntlMessages id="branch.add-new" />
                  </Button>
                  <Action modalOpen={modalOpen} />
                </div>
              </div>
              <Search history={this.props.history} />
              <div className="mb-2">
                <Button color="warning" size="sm" className="float-sm-left">{messages["branch.export"]}</Button>
                <ItemPerPage changePageSize={this.changePageSize} selectedPageSize={this.state.selectedPageSize} />
                <div className="clearfix"></div>
              </div>
              <div className="mb-2">
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th width="5%">#</th>
                      <th width="15%">{messages["branch.code"]}</th>
                      <th width="15%">{messages["branch.name"]}</th>
                      <th>{messages["status.description"]}</th>
                      <th width="15%">{messages["branch.status"]}</th>
                      <th width="15%">{messages["branch.hub"]}</th>
                      <th width="15%">{messages["branch.address"]}</th>
                      <th className="text-center" width="15%">{messages["branch.action"]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={8} className="text-center"><div className="loading-table" /></td></tr>
                    ) : (
                      this.showBranchItem(items)
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

BranchPage.propTypes = {
  branch: PropTypes.object.isRequired,
  modal: PropTypes.object,
  getBranchList: PropTypes.func.isRequired,
  toggleBranchModal: PropTypes.func.isRequired,
  getCityListSelect: PropTypes.func.isRequired,
  getHubListSelect: PropTypes.func.isRequired,
  getWardListSelect: PropTypes.func.isRequired,
  getDistrictListSelect: PropTypes.func.isRequired,
  getCountryListSelect: PropTypes.func.isRequired
}

const mapStateToProps = ({ branch, modal }) => {
  return {
    branch,
    modal
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getBranchList,
    toggleBranchModal,
    getCityListSelect,
    getHubListSelect,
    getWardListSelect,
    getDistrictListSelect,
    getCountryListSelect
  }
)(BranchPage));
