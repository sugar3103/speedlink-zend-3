import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {  getHubList, getCityList, getCountryList, getWardList, getDistrictList } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';

class SearchForm extends Component {

  componentDidMount() {
    let params = {
      offset: {
        start: 1,
        limit: 0
      }
    }
    this.props.getHubList(params);
    // this.props.getCityList();
    this.props.getCountryList(params);
    // this.props.getWardList(params);
    // this.props.getDistrictList();
   // const data = this.props.modalData;      
   //  if (data) {
   //    this.props.initialize(data);
   //  }
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

  showOptionsHub = (items) => {
    const hubs = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return hubs;
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

  showOptionsCountry = (country_items) => {
    const countries = country_items.map(country_item => {
      return {
        'value': country_item.id,
        'label': country_item.name
      }
    });
    return countries;
  }

  render() {
    const { handleSubmit, reset } = this.props;
    const { messages } = this.props.intl;
    const { cities, countries, districts, wards, hubs } = this.props;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.code']}</span>
            <div className="form__form-group-field">
              <Field
                name="code"
                component="input"
                type="text"
                placeholder={messages['branch.code']}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.name']}</span>
            <div className="form__form-group-field">
              <Field
                name="name"
                component="input"
                type="text"
                placeholder={messages['branch.name']}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.status']}</span>
            <div className="form__form-group-field">
              <Field
                name="status"
                component={renderSelectField}
                type="text"
                options={[
                  { value: -1, label: messages['branch.all'] },
                  { value: 1, label: messages['branch.active'] },
                  { value: 0, label: messages['branch.inactive'] }
                ]}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.country']}</span>
            <div className="form__form-group-field">
               <Field
                        name="country"
                        component={renderSelectField}
                        options={countries && this.showOptionsCountry(countries)}
                        placeholder={messages['branch.country']}
                        onChange={this.onChangeCountry}  
                />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.city']}</span>
            <div className="form__form-group-field">
               <Field
                        name="city"
                        component={renderSelectField}
                        options={cities && this.showOptionsCity(cities)}
                        placeholder={messages['branch.city']}  
                        onChange={this.onChangeCity}     
                />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.district']}</span>
            <div className="form__form-group-field">
               <Field
                        name="district"
                        component={renderSelectField}
                        options={districts && this.showOptionsDistrict(districts)}
                        placeholder={messages['branch.district']}
                        onChange={this.onChangeDistrict}   
                />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.ward']}</span>
            <div className="form__form-group-field">
               <Field
                        name="ward"
                        component={renderSelectField}
                        options={wards && this.showOptionsWard(wards)}
                        placeholder={messages['branch.ward']}       
                />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.hubcode']}</span>
            <div className="form__form-group-field">
               <Field
                  name="hub"
                  component={renderSelectField}
                  options={hubs && this.showOptionsHub(hubs)}
                  placeholder={messages['branch.hubcode']}       
                />
            </div>
          </div>
        </Col>        

        <div className="search-group-button">
          <Button 
            size="sm" 
            outline 
            onClick={(e)=> {
              reset();
              setTimeout(() => {
                handleSubmit();  
              }, 200);
            }}
          >{messages['branch.clear']}</Button>{' '}
          <Button 
            size="sm" 
            color="primary"
            id="search" 
          >{ messages['branch.search'] }</Button>
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  cities: PropTypes.array,
  districts: PropTypes.array,
  countries: PropTypes.array,
  wards: PropTypes.array,
  hubs: PropTypes.array,
  getCityList: PropTypes.func.isRequired,
  getDistrictList: PropTypes.func.isRequired,
  getCountryList: PropTypes.func.isRequired,
  getWardList: PropTypes.func.isRequired,
  getHubList: PropTypes.func.isRequired,
}

const mapStateToProps = ({hub, address}) => {  
  const cities  = address.city.items;
  const districts  = address.district.items;
  const countries  = address.country.items;
  const wards  = address.ward.items;
  const hubs  = hub.items;

  return {
    cities, districts, countries, wards, hubs
  }
}

export default reduxForm({
  form: 'branch_search_form',
  initialValues: {
    name: '',
    status: -1,

  }
})(injectIntl(connect(mapStateToProps, {
  getHubList,
  getCityList,
  getCountryList,
  getWardList,
  getDistrictList
})(SearchForm)));