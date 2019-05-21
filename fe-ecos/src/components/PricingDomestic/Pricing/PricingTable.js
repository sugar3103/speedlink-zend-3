import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Container, Row, Col, Table } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getPricingDomesticData } from '../../../redux/actions';

class PricingTable extends Component {

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getPricingDomesticData(id);
  }

  showShipmentType = items => {
    const { locale } = this.props.intl;
    let result = [];
    if (items.length > 0) {
      result = items.map((item, index) => (
        <th className="text-center" key={index}>{locale === 'en-US' ? item.name_en : item.name}</th>
      ));
    }
    return result;
  }

  showTdTable = items => {
    let result = [];
    if (items) {
      result = Object.keys(items).map((key, index) => (
        <td key={index}>{items[key]}</td>
      ));
    }
    return result;
  }

  showDataTable = items => {
    const { locale, messages } = this.props.intl;
    let result = [];
    if (items) {
      result = Object.keys(items).map((key, index) => (
        <Fragment key={index}>
          <tr>
            <th scope="row" rowSpan={2} className="title-row">{locale === 'en-US' ? items[key].name_en : items[key].name}</th>
            <td>{messages['pri_dom.is-ras']}</td>
            {this.showTdTable(items[key].ras)}
          </tr>
          <tr>
            <td>{messages['pri_dom.not-ras']}</td>
            {this.showTdTable(items[key].not_ras)}
          </tr>
        </Fragment>
      ));
    }
    return result;
  }

  render() {
    const { data, loadingData } = this.props;
    return (
      <Container>
        <Row>
          <Col md={12} lg={12}>
            {loadingData ? 'Loading...' : 
            <Table bordered className="table-pri-dom">
              <thead>
                <tr>
                  <th rowSpan={2} colSpan={2}></th>
                  <th colSpan={data.shipment_types.length} className="text-center">{data.service}</th>
                </tr>
                <tr>
                  {this.showShipmentType(data.shipment_types)}
                </tr>
              </thead>
              <tbody>
                {this.showDataTable(data.data)}
              </tbody>
            </Table>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

PricingTable.propTypes = {
  getPricingDomesticData: PropTypes.func.isRequired,
}

const mapStateToProps = ({ pricingDomestic }) => {
  const { pricing } = pricingDomestic;
  const { data, loadingData } = pricing;
  return {
    data, loadingData
  }
}

export default withRouter(injectIntl(connect(mapStateToProps, {
  getPricingDomesticData
})(PricingTable)));