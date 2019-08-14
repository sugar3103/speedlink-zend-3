import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCustomerSpecialList,
  getCarrierSpecialList,
  getServiceSpecialList,
  getShipmentTypeSpecialList,
  getAreaSpecialList
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

  showOptionsArea = items => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
    return result;
  }

  onChangeCarrier = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: 3, carrier_id: value }
    }
    if (this.props.service_id) {
      paramsST.query = { ...paramsST.query, service_id: this.props.service_id };
    }
    this.props.getShipmentTypeSpecialList(paramsST);
  }

  onChangeService = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: 3, service_id: value }
    }
    if (this.props.carrier_id) {
      paramsST.query = { ...paramsST.query, carrier_id: this.props.carrier_id };
    }
    this.props.getShipmentTypeSpecialList(paramsST);
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
    this.props.getCarrierSpecialList(params);
    this.props.getServiceSpecialList(params);
    this.props.getAreaSpecialList(params);
    this.props.getCustomerSpecialList(params);
    
    const paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: {
        limit: 0
      },
      query: { category_id: 3 }
    }
    this.props.getShipmentTypeSpecialList(paramsST);
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

  showOptionCustomer = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
    return result;
  }

  render() {
    const { handleSubmit, carrier,customer, service, shipmentType, area } = this.props;
    const { messages, locale } = this.props.intl;
    return (
      <form className="form form_custom" onSubmit={handleSubmit}>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.name']}</span>
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
              <span className="form__form-group-label">{messages['pri_special.area']}</span>
              <div className="form__form-group-field">
                <Field
                  name="special_area_id"
                  component={renderSelectField}
                  options={area.items && this.showOptionsArea(area.items)}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.category']}</span>
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
              <span className="form__form-group-label">{messages['pri_special.customer']}</span>
              <div className="form__form-group-field">
                <Field
                  name="customer_id"
                  component={renderSelectField}
                  options={customer.items && this.showOptionCustomer(customer.items)}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.carrier']}</span>
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
              <span className="form__form-group-label">{messages['pri_special.service']}</span>
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
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.shipment-type']}</span>
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
              <span className="form__form-group-label">{messages['pri_special.status']}</span>
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={renderSelectField}
                  options={[
                    { value: 1, label: messages['pri_special.active'] },
                    { value: 0, label: messages['pri_special.inactive'] }
                  ]}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.calculate-unit']}</span>
              <div className="form__form-group-field">
                <Field
                  name="calculate_unit"
                  component={renderSelectField}
                  options={[
                    { value: 1, label: messages['pri_special.yes'] },
                    { value: 0, label: messages['pri_special.no'] }
                  ]}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.round-up']}</span>
              <div className="form__form-group-field">
                <Field
                  name="round_up"
                  component="input"
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.from']}</span>
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
              <span className="form__form-group-label">{messages['pri_special.to']}</span>
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
  getCustomerSpecialList: PropTypes.func.isRequired,
  getCarrierSpecialList: PropTypes.func.isRequired,
  getServiceSpecialList: PropTypes.func.isRequired,
  getShipmentTypeSpecialList: PropTypes.func.isRequired,
  getAreaSpecialList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  const { pricingSpecial } = state;
  const { customer, carrier, service, shipmentType, area } = pricingSpecial;
  const selector = formValueSelector('range_weight_special_search_form');
  const carrier_id = selector(state, 'carrier_id');
  const service_id = selector(state, 'service_id');
  return {
    customer,
    carrier,
    service,
    shipmentType,
    area,
    carrier_id,
    service_id
  }
}

export default connect(mapStateToProps, {
  getCustomerSpecialList,
  getCarrierSpecialList,
  getServiceSpecialList,
  getShipmentTypeSpecialList,
  getAreaSpecialList
})(reduxForm({
  form: 'range_weight_special_search_form'
})(injectIntl(SearchForm)));