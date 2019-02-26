import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getHubList, getCityBranchList, getCountryBranchList, getWardBranchList, getDistrictBranchList } from '../../../../redux/actions';
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
    this.props.getCountryBranchList();
  }
  
  onChangeCountry = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        country: value ? value : 0
      }
    }
    this.props.change('cities',null);
    this.props.change('districts',null);
    this.props.change('wards',null);
    this.props.getCityBranchList(params,'onchange');
  }

  onChangeCity = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        city: value ? value : 0
      }
    }
    this.props.change('districts',null);
    this.props.change('wards',null);
    this.props.getDistrictBranchList(params,'onchange');
  }

  onChangeDistrict = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        district: value ? value : 0
      }
    }
    this.props.change('wards',null);
    this.props.getWardBranchList(params,'onchange');
    
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

  showOptions = (items) => {
    const select_options = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return select_options;
  }

  render() {
    const { handleSubmit, reset } = this.props;
    const { messages, locale } = this.props.intl;
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

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.country']}</span>
            <div className="form__form-group-field">
              <Field
                name="country"
                component={renderSelectField}
                options={countries && this.showOptions(countries)}
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
                options={cities && this.showOptions(cities)}
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
                options={districts && this.showOptions(districts)}
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
                options={wards && this.showOptions(wards)}
                placeholder={messages['branch.ward']}
              />
            </div>
          </div>
        </Col>      

        <div className="search-group-button">
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
  getCityBranchList: PropTypes.func.isRequired,
  getDistrictBranchList: PropTypes.func.isRequired,
  getCountryBranchList: PropTypes.func.isRequired,
  getWardBranchList: PropTypes.func.isRequired,
  getHubList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ hub, branch }) => {

  const { countries, cities, districts, wards} = branch;
  const hubs = hub.items;

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
  getCityBranchList,
  getCountryBranchList,
  getWardBranchList,
  getDistrictBranchList
})(SearchForm)));