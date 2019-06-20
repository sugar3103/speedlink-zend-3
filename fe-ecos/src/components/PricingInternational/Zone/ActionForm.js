import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
  requestUpdateZoneInternationalItem,
} from '../../../redux/actions';
import { categoryPricing } from '../../../constants/defaultValues';
import renderSelectField from '../../../containers/Shared/form/Select';
import CustomField from '../../../containers/Shared/form/CustomField';
import validate from './validateActionForm';
import ReactLoading from 'react-loading';
import {
  PRI_INT_ORIGIN_CITY_RESET_STATE,
  PRI_INT_ORIGIN_DISTRICT_RESET_STATE,
  PRI_INT_ORIGIN_WARD_RESET_STATE,
  PRI_INT_DESTINATION_CITY_RESET_STATE,
  PRI_INT_DESTINATION_DISTRICT_RESET_STATE,
  PRI_INT_DESTINATION_WARD_RESET_STATE
} from '../../../constants/actionTypes';

class ActionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disableField: true,
      disableCustomerField: true
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
    this.setState({ disableCustomerField: value ? false : true });
  }

  onChangeCategory = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'category_id', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: value ? value : 0 }
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
      query: { carrier_id: value ? value : 0 }
    }
    if (this.props.category_id) {
      paramsST.query = { ...paramsST.query, category_id: this.props.category_id };
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
      query: { service_id: value ? value : 0 }
    }
    if (this.props.category_id) {
      paramsST.query = { ...paramsST.query, category_id: this.props.category_id };
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
        field: ['id', 'name', 'name_en'],
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
        field: ['id', 'name', 'name_en'],
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

    const { id } = this.props.match.params;
    if (id) {
      this.props.requestUpdateZoneInternationalItem({ query: { id: id } })
    } else {
      this.props.initialize();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ disableField: nextProps.type_action === 'view' ? true : false })
    if (nextProps.is_private) {
      this.setState({ disableCustomerField: true })
    }

    if (nextProps.origin_country_id && nextProps.origin_country_id !== this.props.origin_country_id) {
      let params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          country: nextProps.origin_country_id
        }
      };
      this.props.getOriginCityInternationalList(params);

      if (nextProps.origin_city_id && nextProps.origin_city_id !== this.props.origin_city_id) {
        params.query = {
          ...params.query,
          city: nextProps.origin_city_id
        };
        this.props.getOriginDistrictInternationalList(params);

        if (nextProps.origin_district_id && nextProps.origin_district_id !== this.props.origin_district_id) {
          params.query = {
            ...params.query,
            district: nextProps.origin_district_id
          };
          this.props.getOriginWardInternationalList(params);
        }
      }
    }

    if (nextProps.destination_country_id && nextProps.destination_country_id !== this.props.destination_country_id) {
      let params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          country: nextProps.destination_country_id
        }
      };
      this.props.getDestinationCityInternationalList(params);

      if (nextProps.destination_city_id && nextProps.destination_city_id !== this.props.destination_city_id) {
        params.query = {
          ...params.query,
          city: nextProps.destination_city_id
        };
        this.props.getDestinationDistrictInternationalList(params);

        if (nextProps.destination_district_id && nextProps.destination_district_id !== this.props.destination_district_id) {
          params.query = {
            ...params.query,
            district: nextProps.destination_district_id
          };
          this.props.getDestinationWardInternationalList(params);
        }
      }
    }
  }

  componentDidMount() {
    this.setState({
      disableField: this.props.type_action === 'view' ? true : false
    })
  }

  render() {
    const { handleSubmit, customer, carrier, service, shipmentType, country, city, district, ward, type_action, zone: { loading } } = this.props;
    const { messages } = this.props.intl;
    const { id } = this.props.match.params;
    const { disableField, disableCustomerField } = this.state;

    return loading ? (
      <ReactLoading type="bubbles" className="loading" />
    ) : (
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
                    clearable={false}
                    disabled={disableField}
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
                    disabled={disableCustomerField || disableField}
                    clearable={false}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.name']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="name"
                    component={CustomField}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.name-en']}</span>
                <div className="form__form-group-field">
                  <Field
                    name='name_en'
                    component={CustomField}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xl={6} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.desc']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="description"
                    component="textarea"
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={6} xl={6} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.desc-en']}</span>
                <div className="form__form-group-field">
                  <Field
                    name='description_en'
                    component="textarea"
                    disabled={disableField}
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
                    clearable={false}
                    disabled={disableField}
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
                    clearable={false}
                    disabled={disableField}
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
                    clearable={false}
                    disabled={disableField}
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
                    clearable={false}
                    disabled={disableField}
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
                    clearable={false}
                    disabled={disableField}
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
                    clearable={false}
                    disabled={disableField}
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
                    clearable={false}
                    disabled={disableField}
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
                    clearable={false}
                    disabled={disableField}
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
                    clearable={false}
                    disabled={disableField}
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
                    clearable={false}
                    disabled={disableField}
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
                    clearable={false}
                    disabled={disableField}
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
                    clearable={false}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
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
                    clearable={false}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="text-right">
              <Link to={type_action === 'edit' ? `/pricing-international/zone/view/${id}` : '/pricing-international/zone'} className="btn btn-outline-secondary btn-sm">
                {messages['cancel']}
              </Link>
              {disableField ?
                <Link to={`/pricing-international/zone/edit/${id}`} className="btn btn-info btn-sm">
                  {messages['edit']}
                </Link>
                :
                <Button size="sm" color="primary">
                  {messages['save']}
                </Button>
              }
            </Col>
          </Row>
        </form>
      );
  }
}

ActionForm.propTypes = {
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
  requestUpdateZoneInternationalItem: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  removeState: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  const { pricingInternational } = state;
  const { carrier, service, shipmentType, customer, country, city, district, ward, zone } = pricingInternational;
  const selector = formValueSelector('zone_international_action_form');
  const category_id = selector(state, 'category_id');
  const carrier_id = selector(state, 'carrier_id');
  const service_id = selector(state, 'service_id');
  const origin_country_id = selector(state, 'origin_country_id');
  const origin_city_id = selector(state, 'origin_city_id');
  const origin_district_id = selector(state, 'origin_district_id');
  const destination_country_id = selector(state, 'destination_country_id');
  const destination_city_id = selector(state, 'destination_city_id');
  const destination_district_id = selector(state, 'destination_district_id');
  const initialValues = zone.itemEditting;

  return {
    zone,
    carrier,
    service,
    shipmentType,
    customer,
    country, city, district, ward,
    category_id,
    carrier_id,
    service_id,
    origin_country_id, origin_city_id, origin_district_id,
    destination_country_id, destination_city_id, destination_district_id,
    initialValues
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
  requestUpdateZoneInternationalItem
})(reduxForm({
  form: 'zone_international_action_form',
  enableReinitialize: true,
  validate
})(withRouter(injectIntl(ActionForm))));