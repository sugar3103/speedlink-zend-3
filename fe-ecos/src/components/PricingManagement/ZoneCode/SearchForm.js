import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCarrierCodeList, getServiceCodeList, getShipmentTypeCodeList, getCustomerList,
  getOriginCountryList, getOriginCityList, getOriginDistrictList, getOriginWardList,
  getDestinationCountryList, getDestinationCityList, getDestinationDistrictList, getDestinationWardList
 } from "../../../redux/actions";

class SearchForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      disabled: false
    }
  }
  
  componentDidMount() {
    this.props.getCarrierCodeList();
    this.props.getServiceCodeList();
    this.props.getShipmentTypeCodeList();
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
        country_id: value
      }
    }
    this.props.getOriginCityList(params);
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
    this.props.getOriginWardList(null);
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
        country_id: value
      }
    }
    this.props.getDestinationCityList(params);
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
    this.props.getDestinationWardList(null);
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

  showOptionCarrier = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: item.code
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
          value: item.id,
          label: item.code
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
          value: item.id,
          label: item.code
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
    const { handleSubmit, reset, carrierCode, serviceCode, shipment_typeCode, customerCode, origin_countrys, origin_citys, origin_districts, origin_wards, destination_countrys, destination_citys, destination_districts, destination_wards  } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.filtertype']}</span>
            <div className="form__form-group-field">
              <Field name="is_private" component={renderSelectField} type="text" options={[
                { value: -1, label: messages['all'] },
                { value: 1, label: messages['rangeweight.public'] },
                { value: 2, label: messages['rangeweight.customer'] }
                ]}
                clearable={false}
                onChange={this.hanldeChangeType}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.customer']}</span>
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
            <span className="form__form-group-label">{messages['rangeweight.category']}</span>
            <div className="form__form-group-field">
              <Field name="category" component={renderSelectField} type="text" options={[
                { value: '', label: messages['all'] },
                { value: 'Inbound', label: messages['inbound'] },
                { value: 'Outbound', label: messages['outbound'] },
                { value: 'Domestic', label: messages['domestic'] }
                ]}
                clearable={false}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.carrier']}</span>
            <div className="form__form-group-field">
              <Field name="carrier_id" component={renderSelectField} type="text"
                     options={carrierCode && this.showOptionCarrier(carrierCode)}/>
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.service']}</span>
            <div className="form__form-group-field">
              <Field name="service_id" component={renderSelectField} type="text"
                     options={serviceCode && this.showOptionService(serviceCode)}/>
            </div>
          </div>
        </Col>    

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.shipmenttype']}</span>
            <div className="form__form-group-field">
              <Field name="shipmenttype" component={renderSelectField} type="text"
                     options={shipment_typeCode && this.showOptionShipmenttype(shipment_typeCode)}/>
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
  getCarrierCodeList: PropTypes.func.isRequired,
  getServiceCodeList: PropTypes.func.isRequired,
  getShipmentTypeCodeList: PropTypes.func.isRequired,
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

const mapStateToProps = ({ carrier, service, shipment_type, customer, zoneCode }) => {
  const carrierCode = carrier.codes;
  const serviceCode = service.codes;
  const shipment_typeCode = shipment_type.codes;
  const customerCode = customer.items;
  const origin_countrys = zoneCode.origin_country;
  const origin_citys = zoneCode.origin_city;
  const origin_districts = zoneCode.origin_district;
  const origin_wards = zoneCode.origin_ward;
  const destination_countrys = zoneCode.destination_country;
  const destination_citys = zoneCode.destination_city;
  const destination_districts = zoneCode.destination_district;
  const destination_wards = zoneCode.destination_ward;
  return { carrierCode, serviceCode, shipment_typeCode, customerCode, origin_countrys, origin_citys, origin_districts, origin_wards, destination_countrys, destination_citys, destination_districts, destination_wards }
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
  getCarrierCodeList,
  getServiceCodeList,
  getShipmentTypeCodeList,
  getCustomerList,
  getOriginCountryList, getOriginCityList, getOriginDistrictList, getOriginWardList,
  getDestinationCountryList, getDestinationCityList, getDestinationDistrictList, getDestinationWardList
})(SearchForm)));