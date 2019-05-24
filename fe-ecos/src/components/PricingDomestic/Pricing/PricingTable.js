import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Container, Row, Col, Table, Modal } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getPricingDomesticData } from '../../../redux/actions';
import RangeWeightEdit from './RangeWeightEdit';
import ReactLoading from 'react-loading';

class PricingTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen:  false,
      modalData: {}
    }
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getPricingDomesticData(id);
  }

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  showModalEditCell = (params) => {
    if (this.props.type === 'edit') {
      this.setState({ modalData: params })
      this.toggleModal();
    }
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

  showTdTable = (pricing_id, items) => {
    const { type } = this.props;
    let result = [];
    if (items) {
      result = Object.keys(items).map((key, index) => {
        const value = items[key];
        if (value && value.length > 0) {
          let params = { pricing_id, range_weight: [] };
          const valueCell = value.map((item, index2) => {
            item = { ...item };
            if (Object.entries(item).length > 0) {
              params.range_weight.push(item);
              if (parseFloat(item.value) > 0) {
                const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.value);
                if (parseFloat(item.to) > 0) {
                  return <p key={index2}><b>{currency} / {item.name}</b></p>;
                } else {
                  return <p key={index2}><i>+{currency} / {item.name}</i></p>
                }
              } else {
                return null;
              }
            } else {
              return null;
            }
          });
          return <td 
            key={index} 
            className={`text-center ${type === 'edit' ? 'cell-value' : ''}`} 
            onClick={() => this.showModalEditCell(params)}
          >{valueCell}</td>
        } else {
          return <td key={index} className="text-center"></td>
        }
      });
    }
    return result;
  }

  showDataTable = (pricing_id, items) => {
    const { locale, messages } = this.props.intl;
    let result = [];
    if (items) {
      result = Object.keys(items).map((key, index) => {
        const data = items[key];
        return (
          <Fragment key={index}>
            <tr>
              <th scope="row" rowSpan={2}>{locale === 'en-US' ? data.name_en : data.name}</th>
              <td>{messages['pri_dom.not-ras']}</td>
              {this.showTdTable(pricing_id, data.not_ras)}
            </tr>
            <tr>
              <td>{messages['pri_dom.is-ras']}</td>
              {this.showTdTable(pricing_id, data.ras)}
            </tr>
          </Fragment>
        )
      });
    }
    return result;
  }

  render() {
    const { data, loadingData, type } = this.props;
    const { locale } = this.props.intl;
    return (
      <Container>
        <Row>
          <Col md={12} lg={12}>
            {loadingData ? 
              <ReactLoading type="bubbles" className="loading" /> 
              :
              <Table bordered>
                <thead>
                  <tr>
                    <th rowSpan={2} colSpan={2}></th>
                    <th colSpan={data.shipment_types.length} className="text-center">{locale === 'en-US' ? data.service_en : data.service}</th>
                  </tr>
                  <tr>
                    {this.showShipmentType(data.shipment_types)}
                  </tr>
                </thead>
                <tbody>
                  {this.showDataTable(data.pricing_id, data.data)}
                </tbody>
              </Table>
            }
          </Col>
          {type === 'edit' &&
            <Modal
              isOpen={this.state.modalOpen}
              toggle={this.toggleModal}
              className={`modal-dialog--primary modal-dialog--header`}
            >
              <RangeWeightEdit toggleModal={this.toggleModal} data={this.state.modalData} />
            </Modal>
          }
        </Row>
      </Container>
    );
  }
}

PricingTable.propTypes = {
  getPricingDomesticData: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
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