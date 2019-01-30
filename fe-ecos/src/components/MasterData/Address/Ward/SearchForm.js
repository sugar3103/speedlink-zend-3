import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import { getDistrictList } from '../../../../redux/actions';
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
    this.props.getDistrictList(params);
  }

  showOptionDistrict = (items) => {
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
    this.props.getDistrictList(params);
  }

  render() {
    const { handleSubmit, reset, districts } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['district.list']}</span>
            <div className="form__form-group-field">
              <Field
                name="district"
                component={renderSelectField}
                type="text"
                options={districts && this.showOptionDistrict(districts)}
                onInputChange={this.onInputChange}
                placeholder={messages['ward.district']}
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
  districts: PropTypes.array,
  getDistrictList: PropTypes.func.isRequired
}

const mapStateToProps = ({ address }) => {
  const districts = address.district.items;
  return {
    districts
  }
}

export default reduxForm({
  form: 'ward_search_form',
})(injectIntl(connect(mapStateToProps, {
  getDistrictList
})(SearchForm)));