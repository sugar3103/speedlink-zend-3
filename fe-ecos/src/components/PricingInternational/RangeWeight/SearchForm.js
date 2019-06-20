import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCustomerInternationalList,
  getCarrierInternationalList,
  getServiceInternationalList,
  getShipmentTypeInternationalList,
} from '../../../redux/actions';
import { categoryPricing } from '../../../constants/defaultValues';
import renderSelectField from '../../../containers/Shared/form/Select';

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCustomerField: false
    }
  }

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

  onChangeIsPrivate = value => {
    this.props.change('customer_id', '');
    if (value) {
      this.setState({ showCustomerField: true });
    } else {
      this.setState({ showCustomerField: false });
    }
  }

  onChangeCarrier = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: this.props.category_id, carrier_id: value }
    }
    if (this.props.service_id) {
      paramsST.query = { ...paramsST.query, service_id: this.props.service_id };
    }
    this.props.getShipmentTypeInternationalList(paramsST);
  }

  onChangeService = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: this.props.category_id, service_id: value }
    }
    if (this.props.carrier_id) {
      paramsST.query = { ...paramsST.query, carrier_id: this.props.carrier_id };
    }
    this.props.getShipmentTypeInternationalList(paramsST);
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
    this.props.getCustomerInternationalList(params);
    this.props.getCarrierInternationalList(params);
    this.props.getServiceInternationalList(params);

    const paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: {
        limit: 0
      },
      query: { category_id: this.props.category_id }
    }
    this.props.getShipmentTypeInternationalList(paramsST);
  }

  resetFilter = async () => {
    const { handleSubmit, reset } = this.props
    await reset();
    handleSubmit();
  }

  render() {
    const { handleSubmit, carrier, service, shipmentType, customer } = this.props;
    const { messages, locale } = this.props.intl;
    return (
      <form className="form form_custom" onSubmit={handleSubmit}>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.type']}</span>
              <div className="form__form-group-field">
                <Field
                  name="is_private"
                  component={renderSelectField}
                  options={[
                    { value: 0, label: messages['pri_int.public'] },
                    { value: 1, label: messages['pri_int.customer'] }
                  ]}
                  onChange={this.onChangeIsPrivate}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.customer']}</span>
              <div className="form__form-group-field">
                <Field
                  name="customer_id"
                  component={renderSelectField}
                  options={customer.items && this.showOptionCustomer(customer.items)}
                  disabled={!this.state.showCustomerField}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.name']}</span>
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
              <span className="form__form-group-label">{messages['pri_int.status']}</span>
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={renderSelectField}
                  options={[
                    { value: 1, label: messages['pri_int.active'] },
                    { value: 0, label: messages['pri_int.inactive'] }
                  ]}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.category']}</span>
              <div className="form__form-group-field">
                <Field
                  name="category_id"
                  component={renderSelectField}
                  options={this.showOptionsCategory()}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.carrier']}</span>
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
              <span className="form__form-group-label">{messages['pri_int.service']}</span>
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
              <span className="form__form-group-label">{messages['pri_int.shipment-type']}</span>
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
        </Row>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.from']}</span>
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
              <span className="form__form-group-label">{messages['pri_int.to']}</span>
              <div className="form__form-group-field">
                <Field
                  name="to"
                  component="input"
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.calculate-unit']}</span>
              <div className="form__form-group-field">
                <Field
                  name="calculate_unit"
                  component={renderSelectField}
                  options={[
                    { value: 1, label: messages['pri_int.yes'] },
                    { value: 0, label: messages['pri_int.no'] }
                  ]}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.round-up']}</span>
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
  getCustomerInternationalList: PropTypes.func.isRequired,
  getCarrierInternationalList: PropTypes.func.isRequired,
  getServiceInternationalList: PropTypes.func.isRequired,
  getShipmentTypeInternationalList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  const { pricingInternational } = state;
  const { carrier, service, shipmentType, customer } = pricingInternational;
  const selector = formValueSelector('range_weight_international_search_form');
  const category_id = selector(state, 'category_id');
  const carrier_id = selector(state, 'carrier_id');
  const service_id = selector(state, 'service_id');
  return {
    carrier,
    service,
    shipmentType,
    customer,
    category_id,
    carrier_id,
    service_id,
  }
}

export default connect(mapStateToProps, {
  getCustomerInternationalList,
  getCarrierInternationalList,
  getServiceInternationalList,
  getShipmentTypeInternationalList,
})(reduxForm({
  form: 'range_weight_international_search_form'
})(injectIntl(SearchForm)));