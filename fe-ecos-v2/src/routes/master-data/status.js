import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { 
  Row, 
  Button, 
  Table, 
} from 'reactstrap';
import { Colxx } from "../../components/Layout/CustomBootstrap";
import Pagination from '../../components/Layout/Pagination';
import IntlMessages from "../../util/IntlMessages";
import Action from '../../components/MasterData/Status/Action';
import Search from '../../components/MasterData/Status/Search';
import Item from '../../components/MasterData/Status/Item';

import { connect } from "react-redux";
import {
  getStatusList,
  toggleStatusModal
} from "../../redux/actions";
import ItemPerPage from '../../components/Layout/ItemPerPage';
import { SELECTED_PAGE_SIZE } from '../../constants/defaultValues';

class StatusPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
    }
  }

  toggleModal = () => {
    this.props.toggleStatusModal();
  }

  onChangePage = (page) => {
    let params = {
      pagination: {
        page: parseInt(page, 10),
        perpage: parseInt(this.state.selectedPageSize, 10)
      }
    }
    
    if (this.props.status.paramSearch) {
      Object.assign(params, { "query": this.props.status.paramSearch})
    };
    this.props.getStatusList(params, this.props.history);

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

    if (this.props.status.paramSearch) {
      Object.assign(params, { "query": this.props.status.paramSearch})
    };
    this.props.getStatusList(params, this.props.history);

    this.setState({
      selectedPageSize: size
    });
  }

  componentDidMount() {
    this.props.getStatusList(null, this.props.history);
  }

  showStatusItem = (items) => {
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
    }
    return result;
  }

  render() {
    const { messages } = this.props.intl;
    const { items, loading, modalOpen } = this.props.status;

    return (
      <Fragment>
        <div className="disable-text-selection">
          <Row>
            <Colxx xxs="12">
              <div className="mb-2">
                <h1>
                  <IntlMessages id="menu.status" />
                </h1>
                <div className="float-sm-right">
                  <Button
                    color="success"
                    onClick={this.toggleModal}
                    size="sm"
                  >
                    <IntlMessages id="status.add-new" />
                  </Button>
                  <Action modalOpen={modalOpen} />
                </div>
              </div>
              <Search history={this.props.history} />
              <div className="mb-2">
                <Button color="warning" size="sm" className="float-sm-left">{messages["status.export"]}</Button>
                <ItemPerPage changePageSize={this.changePageSize} selectedPageSize={this.state.selectedPageSize} />
                <div className="clearfix"></div>
              </div>
              <div className="mb-2">
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th width="5%">#</th>
                      <th width="20%">{messages["status.name"]}</th>
                      <th>{messages["status.description"]}</th>
                      <th width="15%">{messages["status.status"]}</th>
                      <th className="text-center" width="15%">{messages["status.action"]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={5} className="text-center"><div className="loading-table" /></td></tr>
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
)(StatusPage));
