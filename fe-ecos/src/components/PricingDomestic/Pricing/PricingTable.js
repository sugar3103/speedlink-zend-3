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

  showModalEditCell = (parans) => {
    console.log(parans);
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

  showTdTable = (carrier_id, service_id, zone_id, is_ras, items) => {
    let result = [];
    if (items) {
      result = Object.keys(items).map((key, index) => {
        const value = items[key];
        if (value && value.length > 0) {
          const parans = {
            carrier_id,
            service_id,
            shipment_type_id: parseInt(key),
            is_ras,
            zone_id: parseInt(zone_id)
          };
          const valueCell = value.map((item, index2) => {
            item = { ...item };
            if (Object.entries(item).length > 0) {
              const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.value);
              if (parseFloat(item.to) > 0) {
                return <p key={index2}><b>{currency} / {item.name}</b></p>;
              } else {
                return <p key={index2}><i>+{currency} / {item.name}</i></p>
              }
            } else {
              return null;
            }
          });
          return <td key={index} className="text-center cell-value" onClick={() => this.showModalEditCell(parans)}>{valueCell}</td>
        } else {
          return <td key={index} className="text-center"></td>
        }
      });
    }
    return result;
  }

  showDataTable = items => {
    const { locale, messages } = this.props.intl;
    let result = [];
    if (items && items.data) {
      result = Object.keys(items.data).map((key, index) => {
        const data = items.data[key];
        return (
          <Fragment key={index}>
            <tr>
              <th scope="row" rowSpan={2}>{locale === 'en-US' ? data.name_en : data.name}</th>
              <td>{messages['pri_dom.not-ras']}</td>
              {this.showTdTable(items.carrier_id, items.service_id, key, 0, data.not_ras)}
            </tr>
            <tr>
              <td>{messages['pri_dom.is-ras']}</td>
              {this.showTdTable(items.carrier_id, items.service_id, key, 1, data.ras)}
            </tr>
          </Fragment>
        )
      });
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
                  {this.showDataTable(data)}
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