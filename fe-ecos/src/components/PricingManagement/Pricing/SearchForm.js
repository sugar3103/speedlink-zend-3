import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import renderDatePickerField from '../../../containers/Shared/form/DatePicker';
import { Button, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getCustomerList, getSalemanList, getCarrierCodeList,
  getCountryPricingList, getCityPricingList, getDistrictPricingList, getWardPricingList
} from '../../../redux/actions';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';

class SearchForm extends Component {

  hanldeChangeType = value => {
    console.log(value);
  }

  componentDidMount() {
    //get customer
    const paramCustomer = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      }
    }
    this.props.getCustomerList(paramCustomer);

    //get salemon
    const paramSalemon = {
      field: ['id', 'username'],
      offset: {
        limit: 0
      }
    }
    this.props.getSalemanList(paramSalemon);

    const paramAddress = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      }
    }
    //get countries
    this.props.getCountryPricingList(paramAddress);
  }

  showOption = (items) => {
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

  showOptionSaleman = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: item.username
        }
      })
    }
    return result;
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
    this.props.change('city', null);
    this.props.change('district', null);
    this.props.change('ward', null);
    this.props.getCityPricingList(params);
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
    this.props.change('district', null);
    this.props.change('ward', null);
    this.props.getDistrictPricingList(params);
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
    this.props.change('ward', null);
    this.props.getWardPricingList(params);
  }
  

  render() {
    const { handleSubmit, reset, customers, salemans, carriers, countries, cities, districts, wards } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.filter-type']}</span>
            <div className="form__form-group-field">
              <Field name="is_private" component={renderSelectField} type="text" options={[
                { value: -1, label: messages['all'] },
                { value: 1, label: messages['pri_man.public'] },
                { value: 2, label: messages['pri_man.customer'] }
              ]}
                clearable={false}
                onChange={this.hanldeChangeType}
              />
            </div>
          </div>
        </Col>
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.customer']}</span>
            <div className="form__form-group-field">
              <Field
                name="customer"
                component={renderSelectField}
                options={customers && this.showOption(customers)}
                clearable={false}
              />
            </div>
          </div>
        </Col>
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pricing.saleman']}</span>
            <div className="form__form-group-field">
              <Field
                name="saleman"
                component={renderSelectField}
                options={salemans && this.showOptionSaleman(salemans)}
                clearable={false}
              />
            </div>
          </div>
        </Col>
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['status']}</span>
            <div className="form__form-group-field">
              <Field
                name="status"
                component={renderSelectField}
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
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.category']}</span>
            <div className="form__form-group-field">
              <Field
                name="category"
                component={renderSelectField}
                options={[
                  { value: '', label: messages['all'] },
                  { value: 'Inbound', label: messages['inbound'] },
                  { value: 'Outbound', label: messages['outbound'] },
                  { value: 'Domestic', label: messages['domestic'] }
                ]}
                clearable={false}
              />
            </div>
          </div>
        </Col>
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.carrier']}</span>
            <div className="form__form-group-field">
              <Field
                name="carrier_id"
                component={renderSelectField}
                options={carriers && this.showOption(carriers)} />
            </div>
          </div>
        </Col>
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pricing.effected-date']}</span>
            <div className="form__form-group-field">
              <Field
                name="effected_date"
                component={renderDatePickerField}
              />
              <div className="form__form-group-icon">
                <CalendarBlankIcon />
              </div>
            </div>
          </div>
        </Col>
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pricing.expired-date']}</span>
            <div className="form__form-group-field">
              <Field
                name="expired_date"
                component={renderDatePickerField}
              />
              <div className="form__form-group-icon">
                <CalendarBlankIcon />
              </div>
            </div>
          </div>
        </Col>
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.country_origin']}</span>
            <div className="form__form-group-field">
              <Field
                name="country"
                component={renderSelectField}
                options={countries && this.showOption(countries)}
                onChange={this.onChangeCountry}
              />
            </div>
          </div>
        </Col>

        <Col md={3} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.city_origin']}</span>
            <div className="form__form-group-field">
              <Field
                name="city"
                component={renderSelectField}
                options={cities && this.showOption(cities)}
                onChange={this.onChangeCity}
              />
            </div>
          </div>
        </Col>

        <Col md={3} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.district_origin']}</span>
            <div className="form__form-group-field">
              <Field
                name="district"
                component={renderSelectField}
                options={districts && this.showOption(districts)}
                onChange={this.onChangeDistrict}
              />
            </div>
          </div>
        </Col>

        <Col md={3} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['zone_code.ward_origin']}</span>
            <div className="form__form-group-field">
              <Field
                name="ward"
                component={renderSelectField}
                options={wards && this.showOption(wards)}
              />
            </div>
          </div>
        </Col>
        <Col md={12} className="text-right search-group-button">
          <Button size="sm" outline onClick={(e) => {
            reset();
            setTimeout(() => {
              handleSubmit();
            }, 200);
          }} >
            {messages['clear']}</Button>{' '}
          <Button size="sm" color="primary" id="search" >
            {messages['search']}
          </Button>
        </Col>
      </form>
    );
  }
}

const mapStateToProps = ({ customer, carrier, pricing }) => {
  const customers = customer.items;
  const { salemans, countries, cities, districts, wards } = pricing;
  const carriers = carrier.codes;
  return {
    customers,
    salemans,
    carriers,
    countries,
    cities,
    districts,
    wards
  }
}

export default reduxForm({
  form: 'pricing_search_form'
})(injectIntl(connect(mapStateToProps, {
  getCustomerList,
  getSalemanList,
  getCarrierCodeList,
  getCountryPricingList,
  getCityPricingList, 
  getDistrictPricingList, 
  getWardPricingList
})(SearchForm)));