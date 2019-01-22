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
import Action from '../../components/MasterData/Hub/Action';
import Search from '../../components/MasterData/Hub/Search';
import Item from '../../components/MasterData/Hub/Item';

import { connect } from "react-redux";
import {
  getHubList,
  toggleHubModal,
  getCityListSelect
} from "../../redux/actions";
import ItemPerPage from '../../components/Layout/ItemPerPage';
import { SELECTED_PAGE_SIZE } from '../../constants/defaultValues';

class HubPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPageSize: SELECTED_PAGE_SIZE,
      currentPage: 1,
    }
  }

  toggleModal = () => {
    this.props.toggleHubModal();
  }

  onChangePage = (page) => {
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    }
    
    if (this.props.hub.paramSearch) {
      Object.assign(params, { "query": this.props.hub.paramSearch})
    };
    this.props.getHubList(params, this.props.history);

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

    if (this.props.hub.paramSearch) {
      Object.assign(params, { "query": this.props.hub.paramSearch})
    };
    this.props.getHubList(params, this.props.history);

    this.setState({
      selectedPageSize: size
    });
  }

  componentDidMount() {
    let params0 = {
      offset: {
        start: 0,
        limit: SELECTED_PAGE_SIZE
      }
    }
    
    this.props.getHubList(params0, this.props.history);
    this.props.getCityListSelect(null, this.props.history);
  }

  showHubItem = (items) => {
    let result = null;
    if (items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item 
            key={index}
            hub={item}
          />
        )
      })
    }
    return result;
  }

  render() {
    const { messages } = this.props.intl;
    const { items, loading, modalOpen } = this.props.hub;
    return (
      <Fragment>
        <div className="disable-text-selection">
          <Row>
            <Colxx xxs="12">
              <div className="mb-2">
                <h1>
                  <IntlMessages id="menu.hub" />
                </h1>
                <div className="float-sm-right">
                  <Button
                    color="success"
                    onClick={this.toggleModal}
                    size="sm"
                  >
                    <IntlMessages id="hub.add-new" />
                  </Button>
                  <Action modalOpen={modalOpen} />
                </div>
              </div>
              <Search history={this.props.history} />
              <div className="mb-2">
                <Button color="warning" size="sm" className="float-sm-left">{messages["hub.export"]}</Button>
                <ItemPerPage changePageSize={this.changePageSize} selectedPageSize={this.state.selectedPageSize} />
                <div className="clearfix"></div>
              </div>
              <div className="mb-2">
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th width="5%">#</th>
                      <th width="15%">{messages["hub.code"]}</th>
                      <th width="15%">{messages["hub.name"]}</th>
                      <th>{messages["status.description"]}</th>
                      <th width="15%">{messages["hub.status"]}</th>
                      <th width="15%">{messages["hub.city"]}</th>
                      <th className="text-center" width="15%">{messages["hub.action"]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={7} className="text-center"><div className="loading-table" /></td></tr>
                    ) : (
                      this.showHubItem(items)
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

HubPage.propTypes = {
  hub: PropTypes.object.isRequired,
  modal: PropTypes.object,
  getHubList: PropTypes.func.isRequired,
  toggleHubModal: PropTypes.func.isRequired,
  getCityListSelect: PropTypes.func.isRequired,
}

const mapStateToProps = ({ hub, modal }) => {
  return {
    hub,
    modal
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getHubList,
    toggleHubModal,
    getCityListSelect
  }
)(HubPage));
