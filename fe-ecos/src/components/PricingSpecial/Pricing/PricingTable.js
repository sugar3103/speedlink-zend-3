import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Container, Row, Col, Table, Modal } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getPricingSpecialData } from '../../../redux/actions';
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
    this.props.getPricingSpecialData(id);
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

  showTdTable = (special_pricing_id, items) => {
    const { type, intl: { locale } } = this.props;
    let result = [];
    if (items) {
      result = Object.keys(items).map((key, index) => {
        const value = items[key];
        if (Array.isArray(value) && value.length > 0) {
          let params = { id: special_pricing_id, data: [] };
          const valueCell = value.map((item, index2) => {
            if (Object.entries(item).length > 0) {
              params.data.push(item);
              if (parseFloat(item.value) > 0) {
                const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.value);
                if (parseFloat(item.to) > 0) {
                  return <p key={index2}><b>{currency} / {locale === 'en-US' ? item.name_en : item.name}</b></p>;
                } else {
                  return <p key={index2}><i>+{currency} / {locale === 'en-US' ? item.name_en : item.name}</i></p>
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
          return <td key={index} className="text-center cell-not-value"></td>
        }
      });
    }
    return result;
  }

  showDataTable = (special_pricing_id, items) => {
    let result = [];
    if (items) {
      result = Object.keys(items).map((key, index) => {
        const data = items[key];
        return (
          <Fragment key={index}>
            <tr>
              <th scope="row">{data.name}</th>
              {this.showTdTable(special_pricing_id, data.data)}
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
                    <th rowSpan={2}></th>
                    <th colSpan={data.shipment_types.length} className="text-center">{locale === 'en-US' ? data.service_en : data.service}</th>
                  </tr>
                  <tr>
                    {this.showShipmentType(data.shipment_types)}
                  </tr>
                </thead>
                <tbody>
                  {this.showDataTable(data.special_pricing_id, data.data)}
                </tbody>
              </Table>
            }
          </Col>
          {type === 'edit' &&
            <Modal
              isOpen={this.state.modalOpen}
              toggle={this.toggleModal}
              className={`modal-dialog--primary modal-dialog--header modal-lg`}
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
  getPricingSpecialData: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

const mapStateToProps = ({ pricingSpecial }) => {
  const { pricing } = pricingSpecial;
  const { data, loadingData } = pricing;
  return {
    data, loadingData
  }
}

export default withRouter(injectIntl(connect(mapStateToProps, {
  getPricingSpecialData
})(PricingTable)));