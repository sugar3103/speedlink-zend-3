import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import { getCityList, getCountryList } from '../../../../redux/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      city_disabled: true
    }
  }

  componentDidMount() {
    let params = {
      field: ['id', 'name','name_en'],
      offset: {
        limit: 0
      }
    }
    if(this.props.initialValues.country) {
      params = {
        ...params,
        query: {
          country: this.props.initialValues.country
        }
      }
      this.setState({
        city_disabled: false
      })
    }
    this.props.getCityList(params);
    this.props.getCountryList({
      field: ['id','name','name_en'], offset: { limit: 0}
    })
  }

  showOptions = (items) => {
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

  onChangeCountry = value => {
    if (value === null) {
      this.setState({
        city_disabled: true
      });
      this.props.change('city_id', '');
    } else {
      const params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          country: value
        }
      }
      this.props.getCityList(params);
      this.setState({
        city_disabled: false
      })
    }
  }

  render() {
    const { handleSubmit, reset, cities,countries } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['city.country']}</span>
            <div className="form__form-group-field">
              <Field
                name="country"
                component={renderSelectField}
                type="text"
                options={countries && this.showOptions(countries)}
                onChange={this.onChangeCountry}
                placeholder={messages['city.country']}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['district.city']}</span>
            <div className="form__form-group-field">
              <Field
                name="city"
                component={renderSelectField}
                type="text"
                options={cities && this.showOptions(cities)}                
                placeholder={messages['district.city']}
                disabled={this.state.city_disabled}
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
  cities: PropTypes.array,
  getCityList: PropTypes.func.isRequired
}

const mapStateToProps = ({ address }) => {
  const cities = address.city.items;
  const countries = address.country.items;
  return {
    cities,
    countries
  }
}

export default connect(mapStateToProps, {
  getCityList,
  getCountryList
})(reduxForm({ 
  form: 'district_search_form',
  initialValues: {ras: -1, status: 1, country: 1},
  enableReinitialize: true
})(injectIntl(SearchForm)));