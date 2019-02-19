import React, { Component } from 'react';
import { Button, ButtonToolbar, Card, CardBody, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleZoneCodeModal, getCarrierCodeList, getServiceCodeList, getShipmentTypeCodeList, getCustomerList, getCityList, getDistrictList, getWardList, getCountryList  } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../../containers/Shared/form/Select';
import validate from './validateActionForm';
import PropTypes from 'prop-types';

class ActionForm extends Component {
  componentDidMount() {
    const data = this.props.modalData;
    if (data) {
      this.props.initialize(data);
      this.props.getCarrierCodeList();
      this.props.getServiceCodeList();
      this.props.getShipmentTypeCodeList();
      this.props.getCustomerList();
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

  onChangeCountry = values => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        country: values
      }
    }
    this.props.getCityList(params);
  }

  onChangeCity = values => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        city: values
      }
    }
    this.props.getDistrictList(params);
  }

  onChangeDistrict = values => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        district: values
      }
    }
    this.props.getWardList(params);
  }

  showOptionsCity = (items) => {
    const cities = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return cities;
  }

  showOptionsDistrict = (items) => {
    const districts = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return districts;
  }

  showOptionsWard = (items) => {
    const wards = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return wards;
  }

  showOptionsCountry = (items) => {
    const Countries = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return Countries;
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
    const { handleSubmit, modalData, carrierCode, serviceCode, shipment_typeCode, customerCode, cities, countries, districts, wards } = this.props;
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
            <Card>
              <CardBody>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.type'] }</span>
                    <span className="text-danger">{'*'}</span>
                    <div className="form__form-group-field">
                      <Field name="is_private" component={renderSelectField} type="text" options={[
                        { value: 0, label: messages['zonecode.public'] },
                        { value: 1, label: messages['zonecode.customer'] }
                        ]}
                      />
                    </div>
                </div>
                
                <div className="form__form-group">
                  <span className="form__form-group-label">{messages['zonecode.carrier']}</span>
                  <span className="text-danger">{'*'}</span>
                  <div className="form__form-group-field">
                    <Field
                      name="carrier_id"
                      component={renderSelectField}
                      type="text"
                      options={carrierCode && this.showOptionsCarrier(carrierCode)}
                      placeholder={messages['zonecode.carrier']}
                      messages={messages}
                    />
                  </div>
                </div>

                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.country_origin']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="origin_country_id"
                        component={renderSelectField}
                        type="text"
                        options={countries && this.showOptionsCountry(countries)}
                        placeholder={messages['zonecode.country_origin']}
                        onChange={this.onChangeCountry}
                        messages={messages}

                      />
                    </div>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.country_destination']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="destination_country_id"
                        component={renderSelectField}
                        type="text"
                        options={countries && this.showOptionsCountry(countries)}
                        placeholder={messages['zonecode.country_destination']}
                        onChange={this.onChangeCountry}
                        messages={messages}

                      />
                    </div>
                  </div>

                <div className="form__form-group">
                  <span className="form__form-group-label">{messages['zonecode.customer']}</span>
                  <span className="text-danger">{'*'}</span>
                  <div className="form__form-group-field">
                    <Field
                      name="customer_id"
                      component={renderSelectField}
                      type="text"
                      options={customerCode && this.showOptionsCustomer(customerCode)}
                      placeholder={messages['zonecode.customer']}
                      messages={messages}
                    />
                  </div>
                </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <Card>
                <CardBody>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.code']}</span>
                    <span className="text-danger">{'*'}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="code"
                        component={CustomField}
                        type="text"
                        placeholder={messages['zonecode.code']}
                        messages={messages}
                      />
                    </div>
                </div>

                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.category']}</span>
                    <span className="text-danger">{'*'}</span>
                    <div className="form__form-group-field">
                       <Field name="category" component={renderSelectField} type="text" options={[
                          { value: 'Inbound', label: messages['inbound'] },
                          { value: 'Outbound', label: messages['outbound'] },
                          { value: 'Domestic', label: messages['domestic'] }
                          ]}
                        />
                    </div>
                </div>
                
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.city_origin']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="origin_city_id"
                        component={renderSelectField}
                        type="text"
                        options={cities && this.showOptionsCity(cities)}
                        placeholder={messages['zonecode.city_origin']}
                        onChange={this.onChangeCity}
                        onInputChange={this.onInputChangeCity}
                        messages={messages}
                      />
                    </div>
                  </div>
                
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.city_destination']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="destination_city_id"
                        component={renderSelectField}
                        type="text"
                        options={cities && this.showOptionsCity(cities)}
                        placeholder={messages['zonecode.city_destination']}
                        onChange={this.onChangeCity}
                        onInputChange={this.onInputChangeCity}
                        messages={messages}
                      />
                    </div>
                </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['status']}</span>
                    <div className="form__form-group-field">
                    <Field name="status" component={renderSelectField} type="text" options={[
                        { value: 1, label: messages['active'] },
                        { value: 0, label: messages['inactive'] }
                        ]}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

          <Col md={6} lg={3} xl={3} xs={6}>
              <Card>
                <CardBody>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.service']}</span>
                    <span className="text-danger">{'*'}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="service_id"
                        component={renderSelectField}
                        type="text"
                        options={serviceCode && this.showOptionsService(serviceCode)}
                        placeholder={messages['zonecode.service']}
                        messages={messages}
                      />
                    </div>
                  </div>
                  
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.district_origin']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="origin_district_id"
                        component={renderSelectField}
                        type="text"
                        options={districts && this.showOptionsDistrict(districts)}
                        placeholder={messages['zonecode.district_origin']}
                        onChange={this.onChangeDistrict}
                        onInputChange={this.onInputChangeDistrict}
                        messages={messages}
                      />
                    </div>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.district_destination']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="destination_district_id"
                        component={renderSelectField}
                        type="text"
                        options={districts && this.showOptionsDistrict(districts)}
                        placeholder={messages['zonecode.district_destination']}
                        onChange={this.onChangeDistrict}
                        onInputChange={this.onInputChangeDistrict}
                        messages={messages}
                      />
                    </div>
                  </div>

                    
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.desc']}</span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <div className="flag vn"></div>
                      </div>
                      <Field name="description" component="textarea" type="text" placeholder={messages['zonecode.desc']} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          
            <Col md={6} lg={3} xl={3} xs={6}>
              <Card>
                <CardBody>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.shipmenttype']}</span>
                    <span className="text-danger">{'*'}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="shipment_type_id"
                        component={renderSelectField}
                        type="text"
                        options={shipment_typeCode && this.showOptionsShipmenttype(shipment_typeCode)}
                        placeholder={messages['zonecode.shipmenttype']}
                        messages={messages}
                      />
                    </div>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.ward_origin']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="origin_ward_id"
                        component={renderSelectField}
                        type="text"
                        options={wards && this.showOptionsWard(wards)}
                        placeholder={messages['zonecode.ward_origin']}
                        onChange={this.onChangeWard}
                        messages={messages}
                      />
                    </div>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.ward_destination']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="destination_ward_id"
                        component={renderSelectField}
                        type="text"
                        options={wards && this.showOptionsWard(wards)}
                        placeholder={messages['zonecode.ward_destination']}
                        onChange={this.onChangeWard}
                        messages={messages}
                      />
                    </div>
                  </div>
                
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['zonecode.desc']}</span>
                  
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <div className="flag us"></div>
                      </div>
                      <Field name="description_en" component="textarea" type="text" placeholder={messages['zonecode.desc-en']} />
                    </div>
                  </div>
                </CardBody>
              </Card>
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
  getCityList: PropTypes.func.isRequired,
  getDistrictList: PropTypes.func.isRequired,
  getCountryList: PropTypes.func.isRequired,
  getWardList: PropTypes.func.isRequired
}

const mapStateToProps = ({zonecode, carrier, service, shipment_type, customer, address}) => {  
  const { errors, modalData } = zonecode;
  const carrierCode = carrier.codes;
  const serviceCode = service.codes;
  const shipment_typeCode = shipment_type.codes;
  const customerCode = customer.items;
  const cities = address.city.items;
  const districts = address.district.items;
  const countries = address.country.items;
  const wards = address.ward.items;
  return {
    errors,
    modalData,
    carrierCode, serviceCode, shipment_typeCode, customerCode,
    cities, districts, countries, wards
  };
};

export default reduxForm({
  form: 'zonezode_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleZoneCodeModal,
  getCarrierCodeList,
  getServiceCodeList,
  getShipmentTypeCodeList,
  getCustomerList,
  getCityList,
  getDistrictList,
  getCountryList,
  getWardList,
})(ActionForm)));