import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCarrierCodeZoneCodeByCondition, getServiceCodeZoneCodeByCondition, getShipmentTypeCodeZoneCodeByCondition, getCustomerList,
  getOriginCountryList, getOriginCityList, getOriginDistrictList, getOriginWardList,
  getDestinationCountryList, getDestinationCityList, getDestinationDistrictList, getDestinationWardList
 } from "../../../redux/actions";

class SearchForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      customer_disable: true,
      category_code: null,
      carrier_id: null
    }
  }
  
  hanldeChangeType = value => {
    if (value === 2) {
      this.setState({
        customer_disable: false
      });
    } else {
      this.props.change('customer','');
      this.setState({
        customer_disable: true
      })
    }
  }

  componentDidMount() {
    const { messages } = this.props.intl;
    const params = {
        field: ['id', 'name'],
        offset: {
            limit: 0
        }
    }
    this.props.getCustomerList(params, messages, 'onchange');
    this.props.getOriginCountryList(params, messages ,'onchange');
    this.props.getDestinationCountryList(params, messages ,'onchange');
  }

  onChangeOriginCountry = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        country: value ? value : 0
      }
    }
    this.props.change('origin_city',null);
    this.props.change('origin_district',null);
    this.props.change('origin_ward',null);
    this.props.getOriginCityList(params, messages, 'onchange');
   
  }

  onChangeOriginCity = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        city:  value ? value : 0
      }
    }
    this.props.change('origin_district',null);
    this.props.change('origin_ward',null);
    this.props.getOriginDistrictList(params , messages, 'onchange');
  }

  onChangeOriginDistrict = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        district:  value ? value : 0
      }
    }
    this.props.change('origin_ward',null);
    this.props.getOriginWardList(params, messages, 'onchange'); 
  }

  onChangeDestinationCountry = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        country: value ? value : 0
      }
    }
    this.props.change('destination_city',null);
    this.props.change('destination_district',null);
    this.props.change('destination_ward',null);
    this.props.getDestinationCityList(params, messages, 'onchange');
  }

  onChangeDestinationCity = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        city: value ? value : 0
      }
    }
    this.props.change('destination_district',null);
    this.props.change('destination_ward',null);
    this.props.getDestinationDistrictList(params, messages, 'onchange');
  }

  onChangeDestinationDistrict = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        district:  value ? value : 0
      }
    }
    this.props.change('destination_ward',null);
    this.props.getDestinationWardList(params, messages, 'onchange');
  }

  onChangeCategory = value => {
    const { messages } = this.props.intl;
    this.setState({
      category_code: value
    });
    let params = {
      type : "carrier_id",
      category_code : value
    }
    this.props.getCarrierCodeZoneCodeByCondition(params, messages, 'onchange');
    
    params = { ...params,carrier_id: 0}
    this.props.getServiceCodeZoneCodeByCondition(params, messages, 'onchange');
    
    params = { ...params, service_id: [0] }
    this.props.getShipmentTypeCodeZoneCodeByCondition(params, messages, 'onchange');
  }

  onChangeCarrier = value => {
    const { messages } = this.props.intl;
    this.setState({
      carrier_id: value
    });
    let params = {
      type : "service_id",
      carrier_id : value,
      category_code : this.state.category_code
    }
    this.props.getServiceCodeZoneCodeByCondition(params, messages, 'onchange');
    params = {
      type : "carrier_id",
      category_code : value,
      carrier_id: 0,
      service_id: [0]
    }
    this.props.getShipmentTypeCodeZoneCodeByCondition(params, messages, 'onchange');
  }

  onChangeService = value => {
    const { messages } = this.props.intl;
    let params = {
      type : "shipment_type_id",
      category_code : this.state.category_code,
      carrier_id : this.state.carrier_id,
      service_id : [ value ] 
    }
    this.props.getShipmentTypeCodeZoneCodeByCondition(params, messages, 'onchange');
  }

  showOptionCarrier = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.carrier_id,
          label: item.carrier_code
        }
      })
    }
    return result;
  }
  showOptionService = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.service_id,
          label: item.service_code
        }
      })
    }
    return result;
  }
  showOptionShipmenttype = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.shipment_type_id,
          label: item.shipment_type_code
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

  showOptionsOrigin = (items) => {
    const option_select = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return option_select;
  }

  showOptionsDestination = (items) => {
    const select_options = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return select_options;
  }


  render() {
    const { handleSubmit, reset, CarrierCodeZoneCodeByCondition, ServiceCodeZoneCodeByCondition, ShipmentCodeZoneCodeByCondition , customerCode, origin_countrys, origin_citys, origin_districts, origin_wards, destination_countrys, destination_citys, destination_districts, destination_wards  } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.filter-type']}</span>
            <div className="form__form-group-field">
              <Field name="is_private" component={renderSelectField} type="text" options={[
                { value: -1, label: messages['all'] },
                { value: 1, label: messages['pri_man.public'] },
                { value: 2, label: messages['pri_man.customer'] }
                ]}
                clearable={false}
                onChange={this.hanldeChangeType}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.customer']}</span>
            <div className="form__form-group-field">
              <Field name="customer" component={renderSelectField} type="text"
                     options={customerCode && this.showOptionCustomer(customerCode)}
                     disabled={this.state.customer_disable}
              />
            </div>
          </div>
        </Col>  

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.name']}</span>
            <div className="form__form-group-field">
              <Field component="input" type="text" 
                     name='code' />
            </div>
          </div>
        </Col>  

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['status']}</span>
            <div className="form__form-group-field">
              <Field name="status" component={renderSelectField} type="text" options={[
                { value: -1, label: messages['all'] },
                { value: 1, label: messages['active'] },
                { value: 0, label: messages['inactive'] }
                ]}
                clearable={false}
              />
            </div>
          </div>
        </Col>
        
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.category']}</span>
            <div className="form__form-group-field">
              <Field name="category" component={renderSelectField} type="text" options={[
                { value: '', label: messages['all'] },
                { value: 'Inbound', label: messages['inbound'] },
                { value: 'Outbound', label: messages['outbound'] },
                { value: 'Domestic', label: messages['domestic'] }
                ]}
                clearable={false}
                onChange={this.onChangeCategory}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.carrier']}</span>
            <div className="form__form-group-field">
              <Field name="carrier_id" component={renderSelectField} type="text"
                     options={CarrierCodeZoneCodeByCondition && this.showOptionCarrier(CarrierCodeZoneCodeByCondition)}
                     onChange={this.onChangeCarrier} 
                     />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.service']}</span>
            <div className="form__form-group-field">
              <Field name="service_id" component={renderSelectField} type="text"
                     options={ServiceCodeZoneCodeByCondition && this.showOptionService(ServiceCodeZoneCodeByCondition)}
                     onChange={this.onChangeService}
                     />
            </div>
          </div>
        </Col>    

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.shipment-type']}</span>
            <div className="form__form-group-field">
              <Field name="shipmenttype" component={renderSelectField} type="text"
                    options={ShipmentCodeZoneCodeByCondition && this.showOptionShipmenttype(ShipmentCodeZoneCodeByCondition)}
                    />
            </div>
          </div>
        </Col>       

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.country_origin']}</span>
            <div className="form__form-group-field">
              <Field
                name="origin_country"
                component={renderSelectField}
                options={origin_countrys && this.showOptionsOrigin(origin_countrys)}
                onChange={this.onChangeOriginCountry}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.city_origin']}</span>
            <div className="form__form-group-field">
              <Field
                name="origin_city"
                component={renderSelectField}
                options={origin_citys && this.showOptionsOrigin(origin_citys)}
                onChange={this.onChangeOriginCity}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.district_origin']}</span>
            <div className="form__form-group-field">
              <Field
                name="origin_district"
                component={renderSelectField}
                options={origin_districts && this.showOptionsOrigin(origin_districts)}
                onChange={this.onChangeOriginDistrict}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.ward_origin']}</span>
            <div className="form__form-group-field">
              <Field
                name="origin_ward"
                component={renderSelectField}
                options={origin_wards && this.showOptionsOrigin(origin_wards)}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.country_destination']}</span>
            <div className="form__form-group-field">
              <Field
                name="destination_country"
                component={renderSelectField}
                options={destination_countrys && this.showOptionsDestination(destination_countrys)}
                onChange={this.onChangeDestinationCountry}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.city_destination']}</span>
            <div className="form__form-group-field">
              <Field
                name="destination_city"
                component={renderSelectField}
                options={destination_citys && this.showOptionsDestination(destination_citys)}
                onChange={this.onChangeDestinationCity}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.district_destination']}</span>
            <div className="form__form-group-field">
              <Field
                name="destination_district"
                component={renderSelectField}
                options={destination_districts && this.showOptionsDestination(destination_districts)}
                onChange={this.onChangeDestinationDistrict}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.ward_destination']}</span>
            <div className="form__form-group-field">
              <Field
                name="destination_ward"
                component={renderSelectField}
                options={destination_wards && this.showOptionsDestination(destination_wards)}
              />
            </div>
          </div>
        </Col>

        <div className="search-group-button">
          <Button size="sm" outline onClick={(e)=> {
            reset();
            setTimeout(() => {
              handleSubmit();
            }, 200);
          }} >
            {messages['clear']}</Button>{' '}
          <Button size="sm" color="primary" id="search" >
            {messages['search']}
          </Button>
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  carrierCode: PropTypes.array,
  origin_citys: PropTypes.array,
  origin_districts: PropTypes.array,
  origin_countrys: PropTypes.array,
  origin_wards: PropTypes.array,
  destination_citys: PropTypes.array,
  destination_districts: PropTypes.array,
  destination_countrys: PropTypes.array,
  destination_wards: PropTypes.array,
  ShipmentCodeZoneCodeByCondition: PropTypes.array,
  CarrierCodeZoneCodeByCondition: PropTypes.array,
  ServiceCodeZoneCodeByCondition: PropTypes.array,
  getCarrierCodeZoneCodeByCondition: PropTypes.func.isRequired,
  getServiceCodeZoneCodeByCondition: PropTypes.func.isRequired,
  getShipmentTypeCodeZoneCodeByCondition: PropTypes.func.isRequired,
  getCustomerList: PropTypes.func.isRequired,
  getOriginCountryList: PropTypes.func.isRequired,
  getOriginCityList: PropTypes.func.isRequired,
  getOriginDistrictList: PropTypes.func.isRequired,
  getOriginWardList: PropTypes.func.isRequired,
  getDestinationCountryList: PropTypes.func.isRequired,
  getDestinationCityList: PropTypes.func.isRequired,
  getDestinationDistrictList: PropTypes.func.isRequired,
  getDestinationWardList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

const mapStateToProps = ({ customer, zoneCode }) => {
  const { CarrierCodeZoneCodeByCondition, ServiceCodeZoneCodeByCondition, ShipmentCodeZoneCodeByCondition  } = zoneCode;
  const customerCode = customer.items;
  const origin_countrys = zoneCode.origin_country;
  const origin_citys = zoneCode.origin_city;
  const origin_districts = zoneCode.origin_district;
  const origin_wards = zoneCode.origin_ward;
  const destination_countrys = zoneCode.destination_country;
  const destination_citys = zoneCode.destination_city;
  const destination_districts = zoneCode.destination_district;
  const destination_wards = zoneCode.destination_ward;
  return { customerCode, CarrierCodeZoneCodeByCondition, ServiceCodeZoneCodeByCondition, ShipmentCodeZoneCodeByCondition, origin_countrys, origin_citys, origin_districts, origin_wards, destination_countrys, destination_citys, destination_districts, destination_wards }
}

export default reduxForm({
  form: 'zone_code_search_form',
  initialValues: {
    name: '',
    carrier: -1,
    status: -1,
    category: '',
    is_private: -1,
    calculate_unit: -1
  }
})(injectIntl(connect(mapStateToProps, {
  getCarrierCodeZoneCodeByCondition,
  getServiceCodeZoneCodeByCondition,
  getShipmentTypeCodeZoneCodeByCondition,
  getCustomerList,
  getOriginCountryList, getOriginCityList, getOriginDistrictList, getOriginWardList,
  getDestinationCountryList, getDestinationCityList, getDestinationDistrictList, getDestinationWardList
})(SearchForm)));