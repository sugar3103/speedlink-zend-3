import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import { getCityList } from '../../../../redux/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  componentDidMount() {
    const params = {
      field: ['id', 'name'],
      offset: {
        limit: 10
      }
    }
    this.props.getCityList(params);
  }

  showOptionCity = (items) => {
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
        limit: 0
      },
      query: {
        name: value
      }
    }
    this.props.getCityList(params);
  }


  render() {
    const { handleSubmit, reset, cities } = this.props;
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
                placeholder={messages['hub.code']}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['name']}</span>
            <div className="form__form-group-field">
              <Field
                name={locale == 'en-US' ? 'name_en' : 'name'}
                component="input"
                type="text"
                placeholder={messages['name']}
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
                options={cities && this.showOptionCity(cities)}
                onInputChange={this.onInputChange}
                placeholder={messages['hub.country']}
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
  cities: PropTypes.array,
  getCityList: PropTypes.func.isRequired
}

const mapStateToProps = ({ address }) => {
  const cities = address.city.items;
  return {
    cities
  }
}

export default reduxForm({
  form: 'hub_search_form',
  initialValues: {
    name: '',
    status: -1
  }
})(injectIntl(connect(mapStateToProps, {
  getCityList
})(SearchForm)));
