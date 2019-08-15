import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import renderSelectField from '../../../containers/Shared/form/Select';

import {
  removeState,
  getAreaSpecialList,
  getCustomerSpecialList,
  getOriginCitySpecialList,
  getDestinationCitySpecialList,
  getDestinationDistrictSpecialList,
  getDestinationWardSpecialList
} from "../../../redux/actions";
import { PRI_SPECIAL_DESTINATION_DISTRICT_RESET_STATE, PRI_SPECIAL_DESTINATION_WARD_RESET_STATE } from '../../../constants/actionTypes';

class SearchForm extends Component {

  componentWillMount() {
    const params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      }
    };
    this.props.getAreaSpecialList(params);
    this.props.getCustomerSpecialList(params);

    const paramsAddress = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      },
      query: {
        country: 1
      }
    };
    this.props.getOriginCitySpecialList(paramsAddress);
    this.props.getDestinationCitySpecialList(paramsAddress);
  }

  resetFilter = async () => {
    const { handleSubmit, reset } = this.props;
    await reset();
    this.props.removeState(PRI_SPECIAL_DESTINATION_DISTRICT_RESET_STATE);
    this.props.removeState(PRI_SPECIAL_DESTINATION_WARD_RESET_STATE);
    handleSubmit();
  }

  showOptions = items => {
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

  showOptionsAddress = items => {
    const { locale } = this.props.intl;
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: locale === 'en-US' ? item.name_en : item.name
        }
      })
    }
    return result;
  }

  onChangeDestinationCity = value => {
    this.props.change('to_district', null);
    this.props.change('to_ward', null);

    if (value) {
      let params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          city: value
        }
      }
      this.props.getDestinationDistrictSpecialList(params);
    } else {
      this.props.removeState(PRI_SPECIAL_DESTINATION_DISTRICT_RESET_STATE);
    }

    this.props.removeState(PRI_SPECIAL_DESTINATION_WARD_RESET_STATE);
  }

  onChangeDestinationDistrict = value => {
    this.props.change('to_ward', null);
    if (value) {
      let params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          district: value
        }
      }
      this.props.getDestinationWardSpecialList(params);
    } else {
      this.props.removeState(PRI_SPECIAL_DESTINATION_WARD_RESET_STATE);
    }
  }

  render() {
    const { handleSubmit, area, customer, cityOrigin, cityDestination, districtDestination, wardDestination } = this.props;
    const { messages, locale } = this.props.intl;
    return (
      <form className="form form_custom" onSubmit={handleSubmit}>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.area-name']}</span>
              <div className="form__form-group-field">
                <Field
                  name="special_area_id"
                  component={renderSelectField}
                  options={area.items && this.showOptions(area.items)}
                  placeholder={messages['pri_special.area-name']}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.zone-name']}</span>
              <div className="form__form-group-field">
                <Field
                  name={locale === 'en-US' ? 'name_en' : 'name'}
                  component="input"
                  type="text"
                  placeholder={messages['pri_special.zone-name']}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.customer']}</span>
              <div className="form__form-group-field">
                <Field
                  name="customer_id"
                  component={renderSelectField}
                  options={customer.items && this.showOptions(customer.items)}
                  placeholder={messages['pri_special.customer']}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.origin-city']}</span>
              <div className="form__form-group-field">
                <Field
                  name="from_city"
                  component={renderSelectField}
                  options={cityOrigin && this.showOptionsAddress(cityOrigin)}
                  placeholder={messages['pri_special.city']}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.dest-city']}</span>
              <div className="form__form-group-field">
                <Field
                  name="to_city"
                  component={renderSelectField}
                  options={cityDestination && this.showOptionsAddress(cityDestination)}
                  placeholder={messages['pri_special.city']}
                  onChange={this.onChangeDestinationCity}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.dest-district']}</span>
              <div className="form__form-group-field">
                <Field
                  name="to_district"
                  component={renderSelectField}
                  options={districtDestination && this.showOptionsAddress(districtDestination)}
                  placeholder={messages['pri_special.district']}
                  onChange={this.onChangeDestinationDistrict}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.dest-ward']}</span>
              <div className="form__form-group-field">
                <Field
                  name="to_ward"
                  component={renderSelectField}
                  options={wardDestination && this.showOptionsAddress(wardDestination)}
                  placeholder={messages['pri_special.ward']}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-right">
            <Button size="sm" outline onClick={this.resetFilter}>
              {messages['clear']}</Button>
            <Button size="sm" color="primary" id="search" >
              {messages['search']}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

SearchForm.propTypes = {
  removeState: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  getAreaSpecialList: PropTypes.func.isRequired,
  getCustomerSpecialList: PropTypes.func.isRequired,
  getOriginCitySpecialList: PropTypes.func.isRequired,
  getDestinationCitySpecialList: PropTypes.func.isRequired,
  getDestinationDistrictSpecialList: PropTypes.func.isRequired,
  getDestinationWardSpecialList: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingSpecial }) => {
  const { area, customer, city, district, ward } = pricingSpecial;
  const cityOrigin = city.origin;
  const cityDestination = city.destination;
  const districtDestination = district.destination;
  const wardDestination = ward.destination;
  return {
    area,
    customer,
    cityOrigin, cityDestination,
    districtDestination,
    wardDestination
  }
}


export default connect(mapStateToProps, {
  removeState,
  getAreaSpecialList,
  getCustomerSpecialList,
  getOriginCitySpecialList,
  getDestinationCitySpecialList,
  getDestinationDistrictSpecialList,
  getDestinationWardSpecialList,
})(reduxForm({
  form: 'zone_special_search_form'
})(injectIntl(SearchForm)));