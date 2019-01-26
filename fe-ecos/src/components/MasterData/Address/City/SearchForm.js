import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import { getCountryList } from '../../../../redux/actions';
import { connect } from 'react-redux';

class SearchForm extends Component {

  componentDidMount() {
    const params = {
      field: ['id', 'name'],
      offset: {
        limit: 10
      }
    }
    this.props.getCountryList(params);
  }

  showOptionCountry = (items) => {
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
  

  onInputChange = value => {
    const params = {
      field: ['id', 'name'],
      offset: {
        limit: 10
      },
      query: {
        name: value
      }
    }
    this.props.getCountryList(params);
  }

  render() {
    const { handleSubmit, reset, countries } = this.props;
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
                options={countries && this.showOptionCountry(countries)}
                onInputChange={this.onInputChange}
                placeholder={messages['city.country']}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['city.name']}</span>
            <div className="form__form-group-field">
              <Field
                name="name"
                component="input"
                type="text"
                placeholder={messages['city.name']}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['city.status']}</span>
            <div className="form__form-group-field">
              <Field
                name="status"
                component={renderSelectField}
                type="text"
                options={[
                  { value: -1, label: messages['city.all'] },
                  { value: 1, label: messages['city.active'] },
                  { value: 0, label: messages['city.inactive'] }
                ]}
              />
            </div>
          </div>
        </Col>
        <Col md={12} className="text-right search-group-button">
            <Button 
              size="sm" 
              outline 
              onClick={(e)=> {
                reset();
                setTimeout(() => {
                  handleSubmit();  
                }, 200);
              }}
            >{messages['city.clear']}</Button>{' '}
            <Button 
              size="sm" 
              color="primary"
              id="search" 
            >{ messages['city.search'] }</Button>
        </Col>
      </form>
    );
  }
}

const mapStateToProps = ({address}) => {
  const countries = address.country.items;
  return { 
    countries
  }
}

export default reduxForm({
  form: 'city_search_form',
})(injectIntl(connect(mapStateToProps, {
  getCountryList
})(SearchForm)));