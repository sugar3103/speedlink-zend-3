import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCarrierCodeList, getServiceCodeList, getShipmentTypeCodeList, getCustomerList, getCityList, getCountryList, getWardList, getDistrictList  } from "../../../../redux/actions";

class SearchForm extends Component {

  componentDidMount() {
    this.props.getCarrierCodeList();
    this.props.getServiceCodeList();
    this.props.getShipmentTypeCodeList();
    this.props.getCustomerList();
    this.props.getCountryList();
  }

  onChangeCountry = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        country_id: value
      }
    }
    this.props.getCityList(params);
  }

  onChangeCity = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        city: value
      }
    }
    this.props.getDistrictList(params);
    this.props.getWardList(null);
  }

  onChangeDistrict = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        district: value
      }
    }
    this.props.getWardList(params);
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

  showOptionsCountry = (country_items) => {
    const countries = country_items.map(country_item => {
      return {
        'value': country_item.id,
        'label': country_item.name
      }
    });
    return countries;
  }

  showOptionsCity = (city_items) => {
    const cities = city_items.map(city_item => {
      return {
        'value': city_item.id,
        'label': city_item.name
      }
    });
    return cities;
  }

  showOptionsDistrict = (district_items) => {
    const districts = district_items.map(district_item => {
      return {
        'value': district_item.id,
        'label': district_item.name
      }
    });
    return districts;
  }

  showOptionsWard = (ward_items) => {
    const wards = ward_items.map(ward_item => {
      return {
        'value': ward_item.id,
        'label': ward_item.name
      }
    });
    return wards;
  }

  render() {
    const { handleSubmit, reset, carrierCode, serviceCode, shipment_typeCode, customerCode, cities, countries, districts, wards } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.type']}</span>
            <div className="form__form-group-field">
              <Field name="is_private" component={renderSelectField} type="text" options={[
                { value: -1, label: messages['all'] },
                { value: 0, label: messages['rangeweight.public'] },
                { value: 1, label: messages['rangeweight.customer'] }
                ]}
                clearable={false}
              />
            </div>
          </div>
        </Col>
        <Col md={9}></Col>   

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.name']}</span>
            <div className="form__form-group-field">
              <Field component="input" type="text" placeholder={messages['rangeweight.name']}
                     name='code' />
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
            <span className="form__form-group-label">{messages['rangeweight.customer']}</span>
            <div className="form__form-group-field">
              <Field name="customer" component={renderSelectField} type="text"
                     options={customerCode && this.showOptionCustomer(customerCode)}/>
            </div>
          </div>
        </Col>    
        <Col md={3}></Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zonecode.country_origin']}</span>
            <div className="form__form-group-field">
              <Field
                name="origin_country"
                component={renderSelectField}
                options={countries && this.showOptionsCountry(countries)}
                placeholder={messages['zonecode.country_origin']}
                onChange={this.onChangeCountry}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zonecode.city_origin']}</span>
            <div className="form__form-group-field">
              <Field
                name="origin_city"
                component={renderSelectField}
                options={cities && this.showOptionsCity(cities)}
                placeholder={messages['zonecode.city_origin']}
                onChange={this.onChangeCity}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zonecode.district_origin']}</span>
            <div className="form__form-group-field">
              <Field
                name="origin_district"
                component={renderSelectField}
                options={districts && this.showOptionsDistrict(districts)}
                placeholder={messages['zonecode.district_origin']}
                onChange={this.onChangeDistrict}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zonecode.ward_origin']}</span>
            <div className="form__form-group-field">
              <Field
                name="origin_ward"
                component={renderSelectField}
                options={wards && this.showOptionsWard(wards)}
                placeholder={messages['zonecode.ward_origin']}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zonecode.country_destination']}</span>
            <div className="form__form-group-field">
              <Field
                name="destination_country"
                component={renderSelectField}
                options={countries && this.showOptionsCountry(countries)}
                placeholder={messages['zonecode.country_destination']}
                onChange={this.onChangeCountry}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zonecode.city_destination']}</span>
            <div className="form__form-group-field">
              <Field
                name="destination_city"
                component={renderSelectField}
                options={cities && this.showOptionsCity(cities)}
                placeholder={messages['zonecode.city_destination']}
                onChange={this.onChangeCity}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zonecode.district_destination']}</span>
            <div className="form__form-group-field">
              <Field
                name="destination_district"
                component={renderSelectField}
                options={districts && this.showOptionsDistrict(districts)}
                placeholder={messages['zonecode.district_destination']}
                onChange={this.onChangeDistrict}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zonecode.ward_destination']}</span>
            <div className="form__form-group-field">
              <Field
                name="destination_ward"
                component={renderSelectField}
                options={wards && this.showOptionsWard(wards)}
                placeholder={messages['zonecode.ward_destination']}
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
  cities: PropTypes.array,
  districts: PropTypes.array,
  countries: PropTypes.array,
  wards: PropTypes.array,
  getCarrierCodeList: PropTypes.func.isRequired,
  getServiceCodeList: PropTypes.func.isRequired,
  getShipmentTypeCodeList: PropTypes.func.isRequired,
  getCustomerList: PropTypes.func.isRequired,
  getCityList: PropTypes.func.isRequired,
  getDistrictList: PropTypes.func.isRequired,
  getCountryList: PropTypes.func.isRequired,
  getWardList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

const mapStateToProps = ({ carrier, service, shipment_type, customer, address }) => {
  const carrierCode = carrier.codes;
  const serviceCode = service.codes;
  const shipment_typeCode = shipment_type.codes;
  const customerCode = customer.items;
  const cities = address.city.items;
  const districts = address.district.items;
  const countries = address.country.items;
  const wards = address.ward.items;
  return { carrierCode, serviceCode, shipment_typeCode, customerCode, cities, districts, countries, wards }
}

export default reduxForm({
  form: 'zonecode_search_form',
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
  getCityList,
  getCountryList,
  getWardList,
  getDistrictList
})(SearchForm)));