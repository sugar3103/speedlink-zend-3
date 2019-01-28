import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {  getHubList, getCityList, getCountryList, getWardList, getDistrictList } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import Select from '../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';

class SearchForm extends Component {

  componentDidMount() {
    let params = {
      offset: {
        start: 1,
        limit: 0
      }
    }
    this.props.getHubList();
    this.props.getCityList();
    this.props.getCountryList();
    this.props.getWardList(params);
    this.props.getDistrictList();
   // const data = this.props.modalData;      
   //  if (data) {
   //    this.props.initialize(data);
   //  }
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
    const { items } = this.props.hub;
    const { messages } = this.props.intl;
    const city_items = this.props.city_items;
    const country_items = this.props.country_items;
    const district_items = this.props.district_items;
    const ward_items = this.props.ward_items;

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
        {/*<Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.city']}</span>
            <div className="form__form-group-field">
              <Field
                name="city"
                component="input"
                type="text"
                placeholder={messages['branch.city']}
              />
            </div>
          </div>
        </Col>*/}

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.hubcode']}</span>
            <div className="form__form-group-field">
               <Field
                  name="hub"
                  component={Select}
                  options={items && this.showOptionsHub(items)}
                  placeholder={messages['branch.hubcode']}       
                />
            </div>
          </div>
        </Col>        

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.ward']}</span>
            <div className="form__form-group-field">
               <Field
                        name="hub"
                        component={Select}
                        options={ward_items && this.showOptionsWard(ward_items)}
                        placeholder={messages['branch.ward']}       
                />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.district']}</span>
            <div className="form__form-group-field">
               <Field
                        name="hub"
                        component={Select}
                        options={district_items && this.showOptionsDistrict(district_items)}
                        placeholder={messages['branch.district']}       
                />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.city']}</span>
            <div className="form__form-group-field">
               <Field
                        name="hub"
                        component={Select}
                        options={city_items && this.showOptionsCity(city_items)}
                        placeholder={messages['branch.city']}       
                />
            </div>
          </div>
        </Col>
        
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.country']}</span>
            <div className="form__form-group-field">
               <Field
                        name="hub"
                        component={Select}
                        options={country_items && this.showOptionsCountry(country_items)}
                        placeholder={messages['branch.country']}       
                />
            </div>
          </div>
        </Col>

      {/*  <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.city']}</span>
            <div className="form__form-group-field">
              <Field
                name="city"
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
        </Col>*/}
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

const mapStateToProps = ({hub, address}) => {  
  // const { city, country, district, ward } = address;
  const city_items = address.city.items;
  const country_items  = address.country.items;
  const district_items  = address.district.items;
  const ward_items = address.ward.items;

  return {
    hub,
    city_items,
    country_items, district_items, ward_items
  }
}

export default reduxForm({
  form: 'branch_search_form',
  initialValues: {
    name: '',
    code: '',
    city: '',
    status: -1
  }
})(injectIntl(connect(mapStateToProps, {
  getHubList,
  getCityList,
  getCountryList,
  getWardList,
  getDistrictList
})(SearchForm)));