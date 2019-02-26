import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCarrierCodeByCondition, getServiceCodeByCondition, getShipmentTypeCodeByCondition, getCustomerList,
  getOriginCountryList, getOriginCityList, getOriginDistrictList, getOriginWardList,
  getDestinationCountryList, getDestinationCityList, getDestinationDistrictList, getDestinationWardList
 } from "../../../redux/actions";

class SearchForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      disabled: false,
      category_code: null,
      carrier_id: null
    }
  }
  
  componentDidMount() {
    this.props.getCustomerList();
    this.props.getOriginCountryList();
    this.props.getDestinationCountryList();
  }

  onChangeOriginCountry = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        country: value
      }
    }
    this.props.getOriginCityList(params);
    params = {
      query: {
        city: 0
      }
    }
    this.props.getOriginDistrictList(params);
    params = {
      query: {
        district: 0
      }
    }
    this.props.getOriginWardList(params);
  }

  onChangeOriginCity = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        city: value
      }
    }
    this.props.getOriginDistrictList(params);
    params = {
      query: {
        district: 0
      }
    }
    this.props.getOriginWardList(params);
  }

  onChangeOriginDistrict = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        district: value
      }
    }
    this.props.getOriginWardList(params);
  }

  onChangeDestinationCountry = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        country: value
      }
    }
    this.props.getDestinationCityList(params);
    params = {
      query: {
        city: 0
      }
    }
    this.props.getDestinationDistrictList(params);
    params = {
      query: {
        district: 0
      }
    }
    this.props.getDestinationWardList(params);
  }

  onChangeDestinationCity = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        city: value
      }
    }
    this.props.getDestinationDistrictList(params);
    params = {
      query: {
        district: 0
      }
    }
    this.props.getDestinationWardList(params);
  }

  onChangeDestinationDistrict = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        district: value
      }
    }
    this.props.getDestinationWardList(params);
  }

  onChangeCategory = value => {
    this.setState({
      category_code: value
    });
    let params = {
      type : "carrier_id",
      category_code : value
    }
    this.props.getCarrierCodeByCondition(params);
    params = {
      type : "carrier_id",
      category_code : value,
      carrier_id: 0
    }
    this.props.getServiceCodeByCondition(params);
    params = {
      type : "carrier_id",
      category_code : value,
      carrier_id: 0,
      service_id: [0]
    }
    this.props.getShipmentTypeCodeByCondition(params);
  }

  onChangeCarrier = value => {
    this.setState({
      carrier_id: value
    });
    let params = {
      type : "service_id",
      carrier_id : value,
      category_code : this.state.category_code
    }
    this.props.getServiceCodeByCondition(params);
    params = {
      type : "carrier_id",
      category_code : value,
      carrier_id: 0,
      service_id: [0]
    }
    this.props.getShipmentTypeCodeByCondition(params);
  }

  onChangeService = value => {
    let params = {
      type : "shipment_type_id",
      category_code : this.state.category_code,
      carrier_id : this.state.carrier_id,
      service_id : [ value ] 
    }
    this.props.getShipmentTypeCodeByCondition(params);
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

  showOptionsOriginCountry = (country_items) => {
    const countries = country_items.map(country_item => {
      return {
        'value': country_item.id,
        'label': country_item.name
      }
    });
    return countries;
  }

  showOptionsOriginCity = (city_items) => {
    const cities = city_items.map(city_item => {
      return {
        'value': city_item.id,
        'label': city_item.name
      }
    });
    return cities;
  }

  showOptionsOriginDistrict = (district_items) => {
    const districts = district_items.map(district_item => {
      return {
        'value': district_item.id,
        'label': district_item.name
      }
    });
    return districts;
  }

  showOptionsOriginWard = (ward_items) => {
    const wards = ward_items.map(ward_item => {
      return {
        'value': ward_item.id,
        'label': ward_item.name
      }
    });
    return wards;
  }
  showOptionsDestinationCountry = (country_items) => {
    const countries = country_items.map(country_item => {
      return {
        'value': country_item.id,
        'label': country_item.name
      }
    });
    return countries;
  }

  showOptionsDestinationCity = (city_items) => {
    const cities = city_items.map(city_item => {
      return {
        'value': city_item.id,
        'label': city_item.name
      }
    });
    return cities;
  }

  showOptionsDestinationDistrict = (district_items) => {
    const districts = district_items.map(district_item => {
      return {
        'value': district_item.id,
        'label': district_item.name
      }
    });
    return districts;
  }

  showOptionsDestinationWard = (ward_items) => {
    const wards = ward_items.map(ward_item => {
      return {
        'value': ward_item.id,
        'label': ward_item.name
      }
    });
    return wards;
  }

  hanldeChangeType = value => {
    if (value === 1) {
      this.setState({
        disabled: true
      });
    } else {
      this.setState({
        disabled: false
      })
    }
  }


  render() {
    const { handleSubmit, reset, CarrierCodeByCondition, ServiceCodeByCondition, codeByCondition , customerCode, origin_countrys, origin_citys, origin_districts, origin_wards, destination_countrys, destination_citys, destination_districts, destination_wards  } = this.props;
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
                     disabled={this.state.disabled}
              />
            </div>
          </div>
        </Col>  

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.name']}</span>
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
                     options={CarrierCodeByCondition && this.showOptionCarrier(CarrierCodeByCondition)}
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
                     options={ServiceCodeByCondition && this.showOptionService(ServiceCodeByCondition)}
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
                    options={codeByCondition && this.showOptionShipmenttype(codeByCondition)}
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
                options={origin_countrys && this.showOptionsOriginCountry(origin_countrys)}
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
                options={origin_citys && this.showOptionsOriginCity(origin_citys)}
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
                options={origin_districts && this.showOptionsOriginDistrict(origin_districts)}
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
                options={origin_wards && this.showOptionsOriginWard(origin_wards)}
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
                options={destination_countrys && this.showOptionsDestinationCountry(destination_countrys)}
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
                options={destination_citys && this.showOptionsDestinationCity(destination_citys)}
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
                options={destination_districts && this.showOptionsDestinationDistrict(destination_districts)}
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
                options={destination_wards && this.showOptionsDestinationWard(destination_wards)}
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
  codeByCondition: PropTypes.array,
  CarrierCodeByCondition: PropTypes.array,
  ServiceCodeByCondition: PropTypes.array,
  getCarrierCodeByCondition: PropTypes.func.isRequired,
  getServiceCodeByCondition: PropTypes.func.isRequired,
  getShipmentTypeCodeByCondition: PropTypes.func.isRequired,
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

const mapStateToProps = ({ shipment_type, customer, zoneCode }) => {
  const { CarrierCodeByCondition, ServiceCodeByCondition, codeByCondition  } = shipment_type;
  const customerCode = customer.items;
  const origin_countrys = zoneCode.origin_country;
  const origin_citys = zoneCode.origin_city;
  const origin_districts = zoneCode.origin_district;
  const origin_wards = zoneCode.origin_ward;
  const destination_countrys = zoneCode.destination_country;
  const destination_citys = zoneCode.destination_city;
  const destination_districts = zoneCode.destination_district;
  const destination_wards = zoneCode.destination_ward;
  return { customerCode, CarrierCodeByCondition, ServiceCodeByCondition, codeByCondition, origin_countrys, origin_citys, origin_districts, origin_wards, destination_countrys, destination_citys, destination_districts, destination_wards }
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
  getCarrierCodeByCondition,
  getServiceCodeByCondition,
  getShipmentTypeCodeByCondition,
  getCustomerList,
  getOriginCountryList, getOriginCityList, getOriginDistrictList, getOriginWardList,
  getDestinationCountryList, getDestinationCityList, getDestinationDistrictList, getDestinationWardList
})(SearchForm)));