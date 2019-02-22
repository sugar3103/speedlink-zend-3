import React, { Component } from 'react';
import { Button, ButtonToolbar, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleZoneCodeModal, getCarrierCodeList, getServiceCodeList, getShipmentTypeCodeList, getCustomerList, 
  getOriginCountryList, getOriginCityList, getOriginDistrictList, getOriginWardList,
  getDestinationCountryList, getDestinationCityList, getDestinationDistrictList, getDestinationWardList  } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';
import validate from './validateActionForm';
import PropTypes from 'prop-types';

class ActionForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      disabled: false
    }
  }
  hanldeChangeType = value => {
    if (value === 1) {
      this.setState({
        disabled: true
      });
    } else {
      this.setState({
        disabled: false
      })
    }
  }

  componentDidMount() {
    const data = this.props.modalData;
    if (data) {
      this.props.initialize(data);
      this.props.getCarrierCodeList();
      this.props.getServiceCodeList();
      this.props.getShipmentTypeCodeList();
      this.props.getCustomerList();
    }
    if (data && data.origin_country_id) {
      let paramsCountry = {
        offset: {
          limit: 0
        },
        query: {
          id: data.origin_country_id
        }
      }
      this.props.getOriginCountryList(paramsCountry);
    }
    if (data && data.origin_city_id) {
      let paramsCity = {
        field: ['id', 'name'],
        offset: {
          limit: 0
        },
        query: {
          country: data.origin_country_id
        }
      }
      this.props.getOriginCityList(paramsCity);
    }

    if (data && data.origin_district_id) {
      let paramsDistrict = {
        field: ['id', 'name'],
        offset: {
          limit: 0
        },
        query: {
          city: data.origin_city_id
        }
      }
      this.props.getOriginDistrictList(paramsDistrict);
    }

    if (data && data.origin_ward_id) {
      let paramsWard = {
        field: ['id', 'name'],
        offset: {
          limit: 0
        },
        query: {
          district: data.origin_district_id
        }
      }
      this.props.getOriginWardList(paramsWard);
    }

    if (data && data.destination_country_id) {
      let paramsCountry = {
        offset: {
          limit: 0
        },
        query: {
          id: data.destination_country_id
        }
      }
      this.props.getDestinationCountryList(paramsCountry);
    }
    if (data && data.destination_city_id) {
      let paramsCity = {
        field: ['id', 'name'],
        offset: {
          limit: 0
        },
        query: {
          country: data.destination_country_id
        }
      }
      this.props.getDestinationCityList(paramsCity);
    }

    if (data && data.destination_district_id) {
      let paramsDistrict = {
        field: ['id', 'name'],
        offset: {
          limit: 0
        },
        query: {
          city: data.destination_city_id
        }
      }
      this.props.getDestinationDistrictList(paramsDistrict);
    }

    if (data && data.destination_ward_id) {
      let paramsWard = {
        field: ['id', 'name'],
        offset: {
          limit: 0
        },
        query: {
          district: data.destination_district_id
        }
      }
      this.props.getDestinationWardList(paramsWard);
    }
  }

  showOptionsCarrier = (items) => {
    const carriers = items.map(item => {
      return {
        'value': item.id,
        'label': item.code
      }
    });
    return carriers;
  }

  showOptionsCustomer = (items) => {
    const customers = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return customers;
  }

  showOptionsService = (items) => {
    const services = items.map(item => {
      return {
        'value': item.id,
        'label': item.code
      }
    });
    return services;
  }

  showOptionsShipmenttype = (items) => {
    const shipmenttypes = items.map(item => {
      return {
        'value': item.id,
        'label': item.code
      }
    });
    return shipmenttypes;
  }

  onChangeOriginCountry = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        country_id: value
      }
    }
    this.props.getOriginCityList(params);
  }

  onChangeOriginCity = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        city: value
      }
    }
    this.props.getOriginDistrictList(params);
    this.props.getOriginWardList(null);
  }

  onChangeOriginDistrict = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        district: value
      }
    }
    this.props.getOriginWardList(params);
  }

  onChangeDestinationCountry = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        country_id: value
      }
    }
    this.props.getDestinationCityList(params);
  }

  onChangeDestinationCity = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        city: value
      }
    }
    this.props.getDestinationDistrictList(params);
    this.props.getDestinationWardList(null);
  }

  onChangeDestinationDistrict = value => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        district: value
      }
    }
    this.props.getDestinationWardList(params);
  }

  showOptionsOriginCountry = (country_items) => {
    const countries = country_items.map(country_item => {
      return {
        'value': country_item.id,
        'label': country_item.name
      }
    });
    return countries;
  }

  showOptionsOriginCity = (city_items) => {
    const cities = city_items.map(city_item => {
      return {
        'value': city_item.id,
        'label': city_item.name
      }
    });
    return cities;
  }

  showOptionsOriginDistrict = (district_items) => {
    const districts = district_items.map(district_item => {
      return {
        'value': district_item.id,
        'label': district_item.name
      }
    });
    return districts;
  }

  showOptionsOriginWard = (ward_items) => {
    const wards = ward_items.map(ward_item => {
      return {
        'value': ward_item.id,
        'label': ward_item.name
      }
    });
    return wards;
  }
  showOptionsDestinationCountry = (country_items) => {
    const countries = country_items.map(country_item => {
      return {
        'value': country_item.id,
        'label': country_item.name
      }
    });
    return countries;
  }

  showOptionsDestinationCity = (city_items) => {
    const cities = city_items.map(city_item => {
      return {
        'value': city_item.id,
        'label': city_item.name
      }
    });
    return cities;
  }

  showOptionsDestinationDistrict = (district_items) => {
    const districts = district_items.map(district_item => {
      return {
        'value': district_item.id,
        'label': district_item.name
      }
    });
    return districts;
  }

  showOptionsDestinationWard = (ward_items) => {
    const wards = ward_items.map(ward_item => {
      return {
        'value': ward_item.id,
        'label': ward_item.name
      }
    });
    return wards;
  }


  toggleModal = () => {
    this.props.toggleZoneCodeModal();
  };
  componentWillReceiveProps(nextProps) {
      if (nextProps && nextProps.modalData) {
      // const data = nextProps.modalData;
    }
  }
  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData, carrierCode, serviceCode, shipment_typeCode, customerCode,origin_countrys, origin_citys, origin_districts, origin_wards, destination_countrys, destination_citys, destination_districts, destination_wards } = this.props;
    const className = modalData ? 'primary' : 'success';
    const title = modalData ? messages['carrier.update'] : messages['carrier.add-new'];
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
                <span className="form__form-group-label">{messages['zone_code.type'] }</span>
                <span className="text-danger">{'*'}</span>
                <div className="form__form-group-field">
                  <Field name="is_private" component={renderSelectField} type="text" options={[
                    { value: 1, label: messages['zone_code.public'] },
                    { value: 2, label: messages['zone_code.customer'] }
                    ]} 
                    messages={messages}
                    onChange={this.hanldeChangeType}
                  />
                </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['zone_code.customer']}</span>
              <span className="text-danger">{'*'}</span>
              <div className="form__form-group-field">
                <Field
                  name="customer_id"
                  component={renderSelectField}
                  type="text"
                  options={customerCode && this.showOptionsCustomer(customerCode)}
                  placeholder={messages['zone_code.customer']}
                  disabled={this.state.disabled}
                  messages={messages}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
                <span className="form__form-group-label">{messages['zone_code.code']}</span>
                <span className="text-danger">{'*'}</span>
                <div className="form__form-group-field">
                  <Field
                    name="code"
                    component={CustomField}
                    type="text"
                    messages={messages}
                  />
                </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['status']}</span>
              <div className="form__form-group-field">
              <Field name="status" component={renderSelectField} type="text" options={[
                  { value: 1, label: messages['active'] },
                  { value: 0, label: messages['inactive'] }
                  ]}
                  messages={messages}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
                <span className="form__form-group-label">{messages['zone_code.category']}</span>
                <span className="text-danger">{'*'}</span>
                <div className="form__form-group-field">
                    <Field name="category" component={renderSelectField} type="text" options={[
                      { value: 'Inbound', label: messages['inbound'] },
                      { value: 'Outbound', label: messages['outbound'] },
                      { value: 'Domestic', label: messages['domestic'] }
                      ]}
                      messages={messages}
                    />
                </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['zone_code.carrier']}</span>
              <span className="text-danger">{'*'}</span>
              <div className="form__form-group-field">
                <Field
                  name="carrier_id"
                  component={renderSelectField}
                  type="text"
                  options={carrierCode && this.showOptionsCarrier(carrierCode)}
                  messages={messages}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['zone_code.service']}</span>
              <span className="text-danger">{'*'}</span>
              <div className="form__form-group-field">
                <Field
                  name="service_id"
                  component={renderSelectField}
                  type="text"
                  options={serviceCode && this.showOptionsService(serviceCode)}
                  messages={messages}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['zone_code.shipmenttype']}</span>
              <span className="text-danger">{'*'}</span>
              <div className="form__form-group-field">
                <Field
                  name="shipment_type_id"
                  component={renderSelectField}
                  type="text"
                  options={shipment_typeCode && this.showOptionsShipmenttype(shipment_typeCode)}
                  messages={messages}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['zone_code.country_origin']}</span>
              <div className="form__form-group-field">
                <Field
                  name="origin_country_id"
                  component={renderSelectField}
                  type="text"
                  options={origin_countrys && this.showOptionsOriginCountry(origin_countrys)}
                  onChange={this.onChangeOriginCountry}
                  messages={messages}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['zone_code.city_origin']}</span>
              <div className="form__form-group-field">
                <Field
                  name="origin_city_id"
                  component={renderSelectField}
                  type="text"
                  options={origin_citys && this.showOptionsOriginCity(origin_citys)}
                  onChange={this.onChangeOriginCity}
                  messages={messages}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['zone_code.district_origin']}</span>
              <div className="form__form-group-field">
                <Field
                  name="origin_district_id"
                  component={renderSelectField}
                  type="text"
                  options={origin_districts && this.showOptionsOriginDistrict(origin_districts)}
                  onChange={this.onChangeOriginDistrict}
                  messages={messages}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['zone_code.ward_origin']}</span>
              <div className="form__form-group-field">
                <Field
                  name="origin_ward_id"
                  component={renderSelectField}
                  type="text"
                  options={origin_wards && this.showOptionsOriginWard(origin_wards)}
                  onChange={this.onChangeOriginWard}
                  messages={messages}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['zone_code.country_destination']}</span>
              <div className="form__form-group-field">
                <Field
                  name="destination_country_id"
                  component={renderSelectField}
                  type="text"
                  options={destination_countrys && this.showOptionsDestinationCountry(destination_countrys)}
                  onChange={this.onChangeDestinationCountry}
                  messages={messages}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
                <span className="form__form-group-label">{messages['zone_code.city_destination']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="destination_city_id"
                    component={renderSelectField}
                    type="text"
                    options={destination_citys && this.showOptionsDestinationCity(destination_citys)}
                    onChange={this.onChangeDestinationCity}
                    messages={messages}
                  />
                </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['zone_code.district_destination']}</span>
              <div className="form__form-group-field">
                <Field
                  name="destination_district_id"
                  component={renderSelectField}
                  type="text"
                  options={destination_districts && this.showOptionsDestinationDistrict(destination_districts)}
                  onChange={this.onChangeDestinationDistrict}
                  messages={messages}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['zone_code.ward_destination']}</span>
              <div className="form__form-group-field">
                <Field
                  name="destination_ward_id"
                  component={renderSelectField}
                  type="text"
                  options={destination_wards && this.showOptionsDestinationWard(destination_wards)}
                  onChange={this.onChangeDestinationWard}
                  messages={messages}
                />
              </div>
            </div>
          </Col>
          <Col md={12} lg={6} xl={6} xs={12}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['zone_code.desc']}</span>
              <div className="form__form-group-field">
                <div className="form__form-group-icon">
                  <div className="flag vn"></div>
                </div>
                <Field name="description" component="textarea" type="text" />
              </div>
            </div>
          </Col>
          <Col md={12} lg={6} xl={6} xs={12}>
            <div className="form__form-group">
              <span className="form__form-group-label"> &nbsp; </span>
              <div className="form__form-group-field">
                <div className="form__form-group-icon">
                  <div className="flag us"></div>
                </div>
                <Field name="description_en" component="textarea" type="text" />
              </div>
            </div>
          </Col>
          <Col md={12} lg={12} xl={12} xs={12}>
            { modalData ?
              <span><u>{ modalData.updated_by ? "Update at: "+modalData.updated_at : "Created at: "+modalData.created_at } 
              &nbsp;- { modalData.updated_by ? "Update by: "+modalData.user_update_name : "Created by: "+modalData.user_create_name }</u></span>
             : '' }
            </Col>
          </Row>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['cancel']}</Button>{' '}
          <Button color={className} type="submit">{messages['save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

ActionForm.propTypes = {
  modalData: PropTypes.object,
  carrierCode: PropTypes.array,
  serviceCode: PropTypes.array,
  shipment_typeCode: PropTypes.array,
  customerCode: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  toggleZoneCodeModal: PropTypes.func.isRequired,
  getCarrierCodeList: PropTypes.func.isRequired,
  getServiceCodeList: PropTypes.func.isRequired,
  getShipmentTypeCodeList: PropTypes.func.isRequired,
  getCustomerList: PropTypes.func.isRequired,
  getOriginCountryList: PropTypes.func.isRequired,
  getOriginCityList: PropTypes.func.isRequired,
  getOriginDistrictList: PropTypes.func.isRequired,
  getOriginWardList: PropTypes.func.isRequired,
  getDestinationCountryList: PropTypes.func.isRequired,
  getDestinationCityList: PropTypes.func.isRequired,
  getDestinationDistrictList: PropTypes.func.isRequired,
  getDestinationWardList: PropTypes.func.isRequired,
}

const mapStateToProps = ({zoneCode, carrier, service, shipment_type, customer}) => {  
  const { errors, modalData } = zoneCode;
  const carrierCode = carrier.codes;
  const serviceCode = service.codes;
  const shipment_typeCode = shipment_type.codes;
  const customerCode = customer.items;
  const origin_countrys = zoneCode.origin_country;
  const origin_citys = zoneCode.origin_city;
  const origin_districts = zoneCode.origin_district;
  const origin_wards = zoneCode.origin_ward;
  const destination_countrys = zoneCode.destination_country;
  const destination_citys = zoneCode.destination_city;
  const destination_districts = zoneCode.destination_district;
  const destination_wards = zoneCode.destination_ward;
  return {
    errors,
    modalData,
    carrierCode, serviceCode, shipment_typeCode, customerCode,
    origin_countrys, origin_citys, origin_districts, origin_wards, destination_countrys, destination_citys, destination_districts, destination_wards
  };
};

export default reduxForm({
  form: 'zone_code_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleZoneCodeModal,
  getCarrierCodeList,
  getServiceCodeList,
  getShipmentTypeCodeList,
  getCustomerList,
  getOriginCountryList, getOriginCityList, getOriginDistrictList, getOriginWardList,
  getDestinationCountryList, getDestinationCityList, getDestinationDistrictList, getDestinationWardList
})(ActionForm)));