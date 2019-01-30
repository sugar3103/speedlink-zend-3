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
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
      <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['district.city']}</span>
            <div className="form__form-group-field">
              <Field
                name="city"
                component={renderSelectField}
                type="text"
                options={cities && this.showOptionCity(cities)}
                onInputChange={this.onInputChange}
                placeholder={messages['district.city']}
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
        <Col md={12} className="text-right search-group-button">
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
  return {
    cities
  }
}

export default reduxForm({
  form: 'district_search_form',
})(injectIntl(connect(mapStateToProps, {
  getCityList
})(SearchForm)));