import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getBranchList, getHubList, getCityList, getCountryList, getWardList, getDistrictList } from '../../../../redux/actions';
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
    this.props.getBranchList(params);
    this.props.getHubList(params);
    this.props.getCountryList(params);
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

  showOptionsBranch = (items) => {
    const branchs = items.map(item => {
      return {
        'value': item.id,
        'label': item.code
      }
    });
    return branchs;
  }
  
  showOptionsHub = (items) => {
  
    const hubs = items.map(item => {
      return {
        'value': item.id,
        'label': item.code
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
    const { messages, locale } = this.props.intl;
    const { cities, countries, districts, wards, hubs, branchs } = this.props;

    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.code']}</span>
            <div className="form__form-group-field">
              <Field
                name="code"
                component={renderSelectField}
                options={branchs && this.showOptionsBranch(branchs)}
                placeholder={messages['branch.code']}

              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['name']}</span>
            <div className="form__form-group-field">
              <Field
                name={locale === 'en-US' ? 'name_en' : 'name'}
                component="input"
                type="text"
                placeholder={messages['name']}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['brancharea.hubcode']}</span>
            <div className="form__form-group-field">
              <Field
                name="hub"
                component={renderSelectField}
                options={hubs && this.showOptionsHub(hubs)}
                placeholder={messages['brancharea.hubcode']}
              />
            </div>
          </div>
        </Col>
        
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['brancharea.country']}</span>
            <div className="form__form-group-field">
              <Field
                name="country"
                component={renderSelectField}
                options={countries && this.showOptionsCountry(countries)}
                placeholder={messages['brancharea.country']}
                onChange={this.onChangeCountry}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['brancharea.city']}</span>
            <div className="form__form-group-field">
              <Field
                name="city"
                component={renderSelectField}
                options={cities && this.showOptionsCity(cities)}
                placeholder={messages['brancharea.city']}
                onChange={this.onChangeCity}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['brancharea.district']}</span>
            <div className="form__form-group-field">
              <Field
                name="district"
                component={renderSelectField}
                options={districts && this.showOptionsDistrict(districts)}
                placeholder={messages['brancharea.district']}
                onChange={this.onChangeDistrict}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['brancharea.ward']}</span>
            <div className="form__form-group-field">
              <Field
                name="ward"
                component={renderSelectField}
                options={wards && this.showOptionsWard(wards)}
                placeholder={messages['brancharea.ward']}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          {/* <div className="form__form-group">
            <span className="form__form-group-label">{messages['status']}</span>
            <div className="form__form-group-field">
              <Field
                name="status"
                component={renderSelectField}
                type="text"
                options={[
                  { value: -1, label: messages['all'] },
                  { value: 1, label: messages['active'] },
                  { value: 0, label: messages['inactive'] }
                ]}
              />
            </div>
          </div> */}
        </Col>

        <div className="search-group-button">
          <Button
            size="sm"
            color="primary"
            id="search"
          >{messages['search']}</Button>{' '}
          <Button
          size="sm"
          outline
          onClick={(e) => {
            reset();
            setTimeout(() => {
              handleSubmit();
            }, 200);
          }}
        >{messages['clear']}</Button>
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
  branchs: PropTypes.array,
  getCityList: PropTypes.func.isRequired,
  getDistrictList: PropTypes.func.isRequired,
  getCountryList: PropTypes.func.isRequired,
  getWardList: PropTypes.func.isRequired,
  getHubList: PropTypes.func.isRequired,
  getBranchList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ hub, address, branch }) => {
  const cities = address.city.items;
  const districts = address.district.items;
  const countries = address.country.items;
  const wards = address.ward.items;
  const hubs = hub.items;
  const branchs = branch.items;

  return {
    cities, districts, countries, wards, hubs, branchs
  }
}

export default reduxForm({
  form: 'brancharea_search_form',
  initialValues: {
    name: '',
    status: -1,

  }
})(injectIntl(connect(mapStateToProps, {
  getBranchList,
  getHubList,
  getCityList,
  getCountryList,
  getWardList,
  getDistrictList
})(SearchForm)));