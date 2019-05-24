import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCarrierDomesticList,
  getServiceDomesticList,
  getShipmentTypeDomesticList,
  getZoneDomesticList
} from '../../../redux/actions';
import { categoryPricing } from '../../../constants/defaultValues';
import renderSelectField from '../../../containers/Shared/form/Select';

class SearchForm extends Component {

  showOptionsCategory = () => {
    let result = [];
    for (var key in categoryPricing) {
      if (categoryPricing.hasOwnProperty(key)) {
        result.push({
          value: key,
          label: categoryPricing[key]
        });
      }
    }
    return result;
  }

  showOptions = (items) => {
    const { locale } = this.props.intl;
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: locale === 'en-US' ? item.name_en : item.name
        }
      })
    }
    return result;
  }

  onChangeCarrier = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: 3, carrier_id: value}
    }
    if (this.props.service_id) {
      paramsST.query = { ...paramsST.query, service_id: this.props.service_id };
    }
    this.props.getShipmentTypeDomesticList(paramsST);
  }

  onChangeService = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: 3, service_id: value}
    }
    if (this.props.carrier_id) {
      paramsST.query = { ...paramsST.query, carrier_id: this.props.carrier_id };
    }
    this.props.getShipmentTypeDomesticList(paramsST);
  }

  onChangeShipmentType = value => {
    const listST = this.props.shipmentType.items;
    if (listST.length > 0) {
      const ST = listST.find(item => item.id === value);
      if (ST) {
        this.props.change('carrier_id', ST.carrier_id);
        this.props.change('service_id', ST.service_id);
      }
    }
  }

  componentWillMount() {
    const params = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      }
    };
    this.props.getCarrierDomesticList(params);
    this.props.getServiceDomesticList(params);
    this.props.getZoneDomesticList(params);

    const paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: {
        limit: 0
      },
      query: { category_id: 3}
    }
    this.props.getShipmentTypeDomesticList(paramsST);
  }

  componentDidMount() {
    this.props.change('category_id', 3);
  }

  resetFilter = async () => {
    const { handleSubmit, reset, change } = this.props
    await reset();
    change('category_id', 3);
    handleSubmit();
  }

  render() {
    const { handleSubmit, carrier, service, shipmentType, zone } = this.props;
    const { messages, locale } = this.props.intl;
    return (
      <form className="form form_custom" onSubmit={handleSubmit}>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.name']}</span>
              <div className="form__form-group-field">
                <Field
                  name={locale === 'en-US' ? 'name_en' : 'name'}
                  component="input"
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.category']}</span>
              <div className="form__form-group-field">
                <Field
                  name="category_id"
                  component={renderSelectField}
                  options={this.showOptionsCategory()}
                  disabled
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.carrier']}</span>
              <div className="form__form-group-field">
                <Field
                  name="carrier_id"
                  component={renderSelectField}
                  options={carrier.items && this.showOptions(carrier.items)}
                  onChange={this.onChangeCarrier}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.service']}</span>
              <div className="form__form-group-field">
                <Field
                  name="service_id"
                  component={renderSelectField}
                  options={service.items && this.showOptions(service.items)}
                  onChange={this.onChangeService}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.shipment-type']}</span>
              <div className="form__form-group-field">
                <Field
                  name="shipment_type_id"
                  component={renderSelectField}
                  options={shipmentType.items && this.showOptions(shipmentType.items)}
                  onChange={this.onChangeShipmentType}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.status']}</span>
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={renderSelectField}
                  options={[
                    {value: 1, label: messages['pri_dom.active']},
                    {value: 0, label: messages['pri_dom.inactive']}
                  ]}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.calculate-unit']}</span>
              <div className="form__form-group-field">
                <Field
                  name="calculate_unit"
                  component={renderSelectField}
                  options={[
                    {value: 1, label: messages['pri_dom.yes']},
                    {value: 0, label: messages['pri_dom.no']}
                  ]}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.round-up']}</span>
              <div className="form__form-group-field">
                <Field
                  name="round_up"
                  component="input"
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.zone']}</span>
              <div className="form__form-group-field">
                <Field
                  name="zone_id"
                  component={renderSelectField}
                  options={zone.items && this.showOptions(zone.items)}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.ras']}</span>
              <div className="form__form-group-field">
                <Field
                  name="is_ras"
                  component={renderSelectField}
                  options={[
                    {value: 1, label: messages['pri_dom.on']},
                    {value: 0, label: messages['pri_dom.off']}
                  ]}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.from']}</span>
              <div className="form__form-group-field">
                <Field
                  name="from"
                  component="input"
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.to']}</span>
              <div className="form__form-group-field">
                <Field
                  name="to"
                  component="input"
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-right">
            <Button size="sm" outline onClick={this.resetFilter}>
              {messages['clear']}</Button>
            <Button size="sm" color="primary" id="search" >
              {messages['search']}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

SearchForm.propTypes = {
  getCarrierDomesticList: PropTypes.func.isRequired,
  getServiceDomesticList: PropTypes.func.isRequired,
  getShipmentTypeDomesticList: PropTypes.func.isRequired,
  getZoneDomesticList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  const { pricingDomestic } = state;
  const { carrier, service, shipmentType, zone } = pricingDomestic;
  const selector = formValueSelector('range_weight_domestic_search_form');
  const carrier_id = selector(state, 'carrier_id');
  const service_id = selector(state, 'service_id');
  return {
    carrier,
    service,
    shipmentType,
    zone,
    carrier_id, 
    service_id
  }
}

export default connect(mapStateToProps, {
  getCarrierDomesticList,
  getServiceDomesticList,
  getShipmentTypeDomesticList,
  getZoneDomesticList
})(reduxForm({ 
  form: 'range_weight_domestic_search_form'
})(injectIntl(SearchForm)));