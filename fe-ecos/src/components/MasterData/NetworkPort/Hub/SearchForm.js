import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import { getCountryHubList, getCityHubList } from '../../../../redux/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  componentDidMount() {
    const params = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 10
      }
    }
    this.props.getCountryHubList(params, 'onchange');
  }

  onChangeCountry = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      },
      query: {
        country: value ? value : 0
      }
    }
    this.props.change('cities',null);
    this.props.getCityHubList(params, messages, 'onchange');
  }

  showOptions = (items) => {
    const { locale } = this.props.intl;
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: locale ==='en-US' ? item.name_en : item.name
        }
      })
    }
    return result;
  }


  render() {
    const { handleSubmit, reset, cities, countries } = this.props;
    const { messages,locale } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['hub.code']}</span>
            <div className="form__form-group-field">
              <Field
                name="code"
                component="input"
                type="text"
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
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['hub.country']}</span>
            <div className="form__form-group-field">
              <Field
                name="country"
                component={renderSelectField}
                options={countries && this.showOptions(countries)}
                onChange={this.onChangeCountry}
              />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['hub.city']}</span>
            <div className="form__form-group-field">
              <Field
                name="city"
                component={renderSelectField}
                type="text"
                options={cities && this.showOptions(cities)}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
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
                clearable={false}
              />
            </div>
          </div>
        </Col>
        <Col md={9}></Col>
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
          >{messages['clear']}</Button>{' '}
          <Button 
            size="sm" 
            color="primary"
            id="search" 
          >{ messages['search'] }</Button>
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  countries: PropTypes.array,
  cities: PropTypes.array,
  getCountryHubList: PropTypes.func.isRequired,
  getCityHubList: PropTypes.func.isRequired
}

const mapStateToProps = ({ hub }) => {
  const cities = hub.city_hub;
  const countries = hub.country_hub;
  return {
    cities, countries
  }
}

export default reduxForm({
  form: 'hub_search_form',
  initialValues: {
    name: '',
    name_en: '',
    status: -1
  }
})(injectIntl(connect(mapStateToProps, {
  getCityHubList,
  getCountryHubList,
})(SearchForm)));
