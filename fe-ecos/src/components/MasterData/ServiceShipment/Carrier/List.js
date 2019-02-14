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
import { getCarrierList, toggleCarrierModal } from "../../../../redux/actions";

const CarrierFormatter = ({ value }) => (
  value === 'Enabled' ? <span className="badge badge-success">Enabled</span> :
    <span className="badge badge-disabled">Disabled</span>
);

CarrierFormatter.propTypes = {
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

    if (this.props.carrier.paramSearch) {
      Object.assign(params, { "query": this.props.carrier.paramSearch})
    }
    this.props.getCarrierList(params, messages);

    this.setState({
      currentPage: 1,
      selectedPageSize: size
    });
  };

toggleModal = () => {
  this.props.toggleCarrierModal();
};

  onChangePage = (page) => {
    const { messages } = this.props.intl;
    let params = {
      offset: {
        start: parseInt(page, 10),
        limit: parseInt(this.state.selectedPageSize, 10)
      }
    };

    if (this.props.carrier.paramSearch) {
      Object.assign(params, { "query": this.props.carrier.paramSearch })
    }
    this.props.getCarrierList(params, messages);

    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    const { messages } = this.props.intl;
    this.props.getCarrierList(null, messages);
  }

  showCarrierItem = (items) => {
    const { messages } = this.props.intl;
    let result = null;
    if (items != null && items.length > 0) {
      result = items.map((item, index) => {
        return (
          <Item key={index} carrier={item} />
        );
      })
    } else {
      result = (
        <tr><td colSpan={8} className="text-center">{messages['carrier.no-result']}</td></tr>
      );
    }
    return result;
  };

  render() {
    const { items, loading, modalOpen, total } = this.props.carrier;
    const { messages,locale } = this.props.intl;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="master-data-list">
            <div className="card__title">
              <h5 className="bold-text">{messages['carrier.list-title']}</h5>
            </div>
            <div className={'panel__content'}>
              <Search />
              <ButtonToolbar className="">
                <Button color="success" className="master-data-list__btn-add" onClick={this.toggleModal} >
                  {messages['carrier.add-new']}
                </Button>
              </ButtonToolbar>
              <Action modalOpen={modalOpen} />

              <ItemPerPage selectedPageSize={this.state.selectedPageSize} changePageSize={this.onChangePageSize} />
              <Table responsive bordered hover>
                <thead>
                <tr>
                  <th>#</th>
                  <th>{messages['carrier.code']}</th>
                  {locale === 'en-US' ? (
                    <th>{messages['carrier.name-en']}</th>
                  ) : (
                    <th>{messages['carrier.name']}</th>
                  )}
                  <th>{messages['carrier.status']}</th>
                  <th>{messages['carrier.created-at']}</th>
                  <th>{messages['carrier.action']}</th>
                </tr>
                </thead>
                <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="text-center"><div className="loading-table" /></td></tr>
                ) : (
                  this.showCarrierItem(items)
                )}
                </tbody>
              </Table>
              <Pagination pagination={this.state} total={total} onChangePage={this.onChangePage} />
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

List.propTypes = {
  carrier: PropTypes.object.isRequired,
  modal: PropTypes.object,
  getCarrierList: PropTypes.func.isRequired,
  toggleCarrierModal: PropTypes.func.isRequired
};

const mapStateToProps = ({ carrier, modal,settings }) => {
  const { locale } = settings;
  return {
    carrier,
    modal,
    locale
  };
};

export default injectIntl(connect(mapStateToProps, {
  getCarrierList,
  toggleCarrierModal
})(List));
