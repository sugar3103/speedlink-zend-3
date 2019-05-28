import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import { getDistrictList, getCountryList, getCityList } from '../../../../redux/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      district_disabled: true,
      city_disabled: true,
    }
  }

  componentDidMount() {
    this.props.getCountryList({ field: ['id', 'name', 'name_en'], offset: { limit: 0 } });
    if(this.props.initialValues.country) {
      this.onChangeCountry(this.props.initialValues.country);
    }
  }

  showOption = (items) => {
    const { locale } = this.props.intl;
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: (locale === 'en-US' && item.name_en) ? item.name_en : item.name
        }
      })
    }
    return result;
  }

  onChangeCountry = value => {
    if (value === null) {
      this.props.change('city','');
      this.props.change('district','');
      this.props.change('name','');
      this.setState({ district_disabled: true})
    } else {
      const params = {
        field: ['id', 'name','name_en'],
        offset: {
          limit: 0
        },
        query: {
          country: value
        }
      }
      this.props.getCityList(params);
      this.setState({ city_disabled: false})
    }
  }

  onChangeCity = value => {
    if(value === null) {
      this.props.change('district_id','');      
    } else {
      this.props.getDistrictList({
        field: ['id','name','name_en'],
        offset: { limit : 0 },
        query: { city: value }
      })
      this.setState({district_disabled: false})
    }
  }
  render() {
    const { handleSubmit, reset, districts, countries, cites } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['address.country']}</span>
            <div className="form__form-group-field">
              <Field
                name="country"
                component={renderSelectField}
                type="text"
                options={countries && this.showOption(countries)}
                onChange={this.onChangeCountry}
                placeholder={messages['address.country']}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['address.city']}</span>
            <div className="form__form-group-field">
              <Field
                name="city"
                component={renderSelectField}
                type="text"
                options={cites && this.showOption(cites)}
                onChange={this.onChangeCity}
                placeholder={messages['address.city']}
                disabled={this.state.city_disabled}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['district.list']}</span>
            <div className="form__form-group-field">
              <Field
                name="district"
                component={renderSelectField}
                type="text"
                options={districts && this.showOption(districts)}
                placeholder={messages['address.district']}
                disabled={this.state.district_disabled}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['name']}</span>
            <div className="form__form-group-field">
              <Field
                name="name"
                component="input"
                type="text"
                placeholder={messages['name']}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_dom.ras']}</span>
            <div className="form__form-group-field">
              <Field
                name="ras"
                component={renderSelectField}
                type="text"
                placeholder={messages['pri_dom.ras']}
                options={[
                  { value: -1, label: messages['all'] },
                  { value: 1, label: messages['yes'] },
                  { value: 0, label: messages['no'] }
                ]}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['status']}</span>
            <div className="form__form-group-field">
              <Field
                name="status"
                component={renderSelectField}
                type="text"
                placeholder={messages['status']}
                options={[
                  { value: -1, label: messages['all'] },
                  { value: 1, label: messages['active'] },
                  { value: 0, label: messages['inactive'] }
                ]}
              />
            </div>
          </div>
        </Col>
        <Col md={4} className="text-right search-group-button">
          <Button
            size="sm"
            outline
            onClick={(e) => {
              reset();
              setTimeout(() => {
                handleSubmit();
              }, 200);
            }}
          >{messages['clear']}</Button>{' '}
          <Button
            size="sm"
            color="primary"
            id="search"
          >{messages['search']}</Button>
        </Col>
      </form>
    );
  }
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  districts: PropTypes.array,
  getDistrictList: PropTypes.func.isRequired
}

const mapStateToProps = ({ address }) => {
  const countries = address.country.items;
  const cites = address.city.items;
  const districts = address.district.items;
  return {
    countries,
    cites,
    districts
  }
}

export default connect(mapStateToProps, {
  getDistrictList,
  getCountryList,
  getCityList
})(reduxForm({ 
  form: 'ward_search_form',
  initialValues: {
    ras: -1,
    status: 1,
    country: 1
  }
})(injectIntl(SearchForm)));