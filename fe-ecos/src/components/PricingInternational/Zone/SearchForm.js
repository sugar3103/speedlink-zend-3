import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  removeState,
  getCustomerInternationalList,
  getCarrierInternationalList,
  getServiceInternationalList,
  getShipmentTypeInternationalList,
  getOriginCountryInternationalList,
  getOriginCityInternationalList,
  getOriginDistrictInternationalList,
  getOriginWardInternationalList,
  getDestinationCountryInternationalList,
  getDestinationCityInternationalList,
  getDestinationDistrictInternationalList,
  getDestinationWardInternationalList,
} from '../../../redux/actions';
import { categoryPricing } from '../../../constants/defaultValues';
import renderSelectField from '../../../containers/Shared/form/Select';
import {
  PRI_INT_ORIGIN_CITY_RESET_STATE,
  PRI_INT_ORIGIN_DISTRICT_RESET_STATE,
  PRI_INT_ORIGIN_WARD_RESET_STATE,
  PRI_INT_DESTINATION_CITY_RESET_STATE,
  PRI_INT_DESTINATION_DISTRICT_RESET_STATE,
  PRI_INT_DESTINATION_WARD_RESET_STATE
} from '../../../constants/actionTypes';

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

  onChangeCategory = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'category_id', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: value }
    }
    if (this.props.service_id) {
      paramsST.query = { ...paramsST.query, service_id: this.props.service_id };
    }
    if (this.props.carrier_id) {
      paramsST.query = { ...paramsST.query, carrier_id: this.props.carrier_id };
    }
    this.props.getShipmentTypeInternationalList(paramsST);
  }

  onChangeCarrier = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'category_id', 'carrier_id', 'service_id'],
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
      field: ['id', 'name', 'name_en', 'category_id', 'carrier_id', 'service_id'],
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
        this.props.change('category_id', ST.category_id);
        this.props.change('carrier_id', ST.carrier_id);
        this.props.change('service_id', ST.service_id);
      }
    }
  }

  onChangeOriginCountry = value => {
    this.props.change('origin_city_id', null);
    this.props.change('origin_district_id', null);
    this.props.change('origin_ward_id', null);
    if (value) {
      let params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          country: value
        }
      }
      this.props.getOriginCityInternationalList(params);
    } else {
      this.props.removeState(PRI_INT_ORIGIN_CITY_RESET_STATE);
    }

    this.props.removeState(PRI_INT_ORIGIN_DISTRICT_RESET_STATE);
    this.props.removeState(PRI_INT_ORIGIN_WARD_RESET_STATE);
  }

  onChangeOriginCity = value => {
    this.props.change('origin_district_id', null);
    this.props.change('origin_ward_id', null);

    if (value) {
      let params = {
        field: ['id', 'name',  'name_en'],
        offset: {
          limit: 0
        },
        query: {
          city: value
        }
      }
      this.props.getOriginDistrictInternationalList(params);
    } else {
      this.props.removeState(PRI_INT_ORIGIN_DISTRICT_RESET_STATE);
    }

    this.props.removeState(PRI_INT_ORIGIN_WARD_RESET_STATE);
  }

  onChangeOriginDistrict = value => {
    this.props.change('origin_ward_id', null);
    console.log(value);
    if (value) {
      let params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          district: value
        }
      }
      this.props.getOriginWardInternationalList(params);
    } else {
      this.props.removeState(PRI_INT_ORIGIN_WARD_RESET_STATE);
    }
  }

  onChangeDestinationCountry = value => {
    this.props.change('destination_city_id', null);
    this.props.change('destination_district_id', null);
    this.props.change('destination_ward_id', null);
    if (value) {
      let params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          country: value
        }
      }
      this.props.getDestinationCityInternationalList(params);
    } else {
      this.props.removeState(PRI_INT_DESTINATION_CITY_RESET_STATE);
    }

    this.props.removeState(PRI_INT_DESTINATION_DISTRICT_RESET_STATE);
    this.props.removeState(PRI_INT_DESTINATION_WARD_RESET_STATE);
  }

  onChangeDestinationCity = value => {
    this.props.change('destination_district_id', null);
    this.props.change('destination_ward_id', null);

    if (value) {
      let params = {
        field: ['id', 'name',  'name_en'],
        offset: {
          limit: 0
        },
        query: {
          city: value
        }
      }
      this.props.getDestinationDistrictInternationalList(params);
    } else {
      this.props.removeState(PRI_INT_DESTINATION_DISTRICT_RESET_STATE);
    }

    this.props.removeState(PRI_INT_DESTINATION_WARD_RESET_STATE);
  }

  onChangeDestinationDistrict = value => {
    this.props.change('destination_ward_id', null);

    if (value) {
      let params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          district: value
        }
      }
      this.props.getDestinationWardInternationalList(params);
    } else {
      this.props.removeState(PRI_INT_DESTINATION_WARD_RESET_STATE);
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
    this.props.getOriginCountryInternationalList(params);
    this.props.getDestinationCountryInternationalList(params);

    const paramsST = {
      field: ['id', 'name', 'name_en', 'category_id', 'carrier_id', 'service_id'],
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
    const { handleSubmit, carrier, service, shipmentType, customer, country, city, district, ward } = this.props;
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
                  onChange={this.onChangeCategory}
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
              <span className="form__form-group-label">{messages['pri_int.origin-country']}</span>
              <div className="form__form-group-field">
                <Field
                  name="origin_country_id"
                  component={renderSelectField}
                  options={country.origin && this.showOptions(country.origin)}
                  onChange={this.onChangeOriginCountry}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.origin-city']}</span>
              <div className="form__form-group-field">
                <Field
                  name="origin_city_id"
                  component={renderSelectField}
                  options={city.origin && this.showOptions(city.origin)}
                  onChange={this.onChangeOriginCity}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.origin-district']}</span>
              <div className="form__form-group-field">
                <Field
                  name="origin_district_id"
                  component={renderSelectField}
                  options={district.origin && this.showOptions(district.origin)}
                  onChange={this.onChangeOriginDistrict}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.origin-ward']}</span>
              <div className="form__form-group-field">
                <Field
                  name="origin_ward_id"
                  component={renderSelectField}
                  options={ward.origin && this.showOptions(ward.origin)}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.dest-country']}</span>
              <div className="form__form-group-field">
                <Field
                  name="destination_country_id"
                  component={renderSelectField}
                  options={country.destination && this.showOptions(country.destination)}
                  onChange={this.onChangeDestinationCountry}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.dest-city']}</span>
              <div className="form__form-group-field">
                <Field
                  name="destination_city_id"
                  component={renderSelectField}
                  options={city.destination && this.showOptions(city.destination)}
                  onChange={this.onChangeDestinationCity}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.dest-district']}</span>
              <div className="form__form-group-field">
                <Field
                  name="destination_district_id"
                  component={renderSelectField}
                  options={district.destination && this.showOptions(district.destination)}
                  onChange={this.onChangeDestinationDistrict}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_int.dest-ward']}</span>
              <div className="form__form-group-field">
                <Field
                  name="destination_ward_id"
                  component={renderSelectField}
                  options={ward.destination && this.showOptions(ward.destination)}
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
  getOriginCountryInternationalList: PropTypes.func.isRequired,
  getOriginCityInternationalList: PropTypes.func.isRequired,
  getOriginDistrictInternationalList: PropTypes.func.isRequired,
  getOriginWardInternationalList: PropTypes.func.isRequired,
  getDestinationCountryInternationalList: PropTypes.func.isRequired,
  getDestinationCityInternationalList: PropTypes.func.isRequired,
  getDestinationDistrictInternationalList: PropTypes.func.isRequired,
  getDestinationWardInternationalList: PropTypes.func.isRequired,
  getCustomerInternationalList: PropTypes.func.isRequired,
  getCarrierInternationalList: PropTypes.func.isRequired,
  getServiceInternationalList: PropTypes.func.isRequired,
  getShipmentTypeInternationalList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  removeState: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  const { pricingInternational } = state;
  const { carrier, service, shipmentType, customer, country, city, district, ward } = pricingInternational;
  const selector = formValueSelector('zone_international_search_form');
  const category_id = selector(state, 'category_id');
  const carrier_id = selector(state, 'carrier_id');
  const service_id = selector(state, 'service_id');
  return {
    carrier,
    service,
    shipmentType,
    customer,
    country, city, district, ward,
    category_id,
    carrier_id,
    service_id,
  }
}

export default connect(mapStateToProps, {
  removeState,
  getOriginCountryInternationalList,
  getOriginCityInternationalList,
  getOriginDistrictInternationalList,
  getOriginWardInternationalList,
  getDestinationCountryInternationalList,
  getDestinationCityInternationalList,
  getDestinationDistrictInternationalList,
  getDestinationWardInternationalList,
  getCustomerInternationalList,
  getCarrierInternationalList,
  getServiceInternationalList,
  getShipmentTypeInternationalList,
})(reduxForm({
  form: 'zone_international_search_form'
})(injectIntl(SearchForm)));