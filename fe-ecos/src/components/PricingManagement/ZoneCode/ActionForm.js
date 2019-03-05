import React, { Component, Fragment } from 'react';
import { Button, ButtonToolbar, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleZoneCodeModal, changeTypeZoneCodeModal,  getCarrierCodeZoneCodeByCondition, getServiceCodeZoneCodeByCondition, getShipmentTypeCodeZoneCodeByCondition, getCustomerList, 
  getOriginCountryList, getOriginCityList, getOriginDistrictList, getOriginWardList,
  getDestinationCountryList, getDestinationCityList, getDestinationDistrictList, getDestinationWardList  } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_VIEW, MODAL_EDIT } from '../../../constants/defaultValues';

class ActionForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalType: '',
      customer_disabled: true,
      is_private : 0
    }
  }

  hanldeChangeType = value => {
    this.props.change('customer_id', '');
    this.setState({ is_private: value });
    if (value === 2) {
      this.setState({
        customer_disabled: false
      });
    } else {
      this.setState({
        customer_disabled: true
      })
    }
  }

  componentDidMount() {
    const { messages } = this.props.intl;
    let data = this.props.modalData;
    const paramCustomer = {
        field: ['id', 'name'],
        offset: {
            limit: 0
        }
    }

    if (data) {
      this.props.initialize(data);
      this.props.getCustomerList(paramCustomer, messages);
      if(data.is_private === 2 && this.props.modalType !=='view')
      {
        this.setState({
          customer_disabled: true
        });
      }
      if(data.category){
        this.setState({
          category_code: data.category
        });
      }
    } 
    else
    {
      this.props.change('status',1);
    }

    if (data && data.origin_country_id) {
      let paramsCountry = {
        offset: {
          limit: 0
        }
      }
      this.props.getOriginCountryList(paramsCountry, messages, 'editview');
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
      this.props.getOriginCityList(paramsCity, messages, 'editview');
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
      this.props.getOriginDistrictList(paramsDistrict, messages, 'editview');
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
      this.props.getOriginWardList(paramsWard, messages, 'editview');
    }

    if (data && data.destination_country_id) {
      let paramsCountry = {
        offset: {
          limit: 0
        }
      }
      this.props.getDestinationCountryList(paramsCountry, messages, 'editview');
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
      this.props.getDestinationCityList(paramsCity, messages, 'editview');
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
      this.props.getDestinationDistrictList(paramsDistrict, messages, 'editview');
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
      this.props.getDestinationWardList(paramsWard, messages, 'editview');
    }
    if (data && data.carrier_id) {
      let paramsCarier = {
        type : "carrier_id",
        category_code : data.category
      }
      this.props.getCarrierCodeZoneCodeByCondition(paramsCarier, messages, 'editview');
    }

    if (data && data.service_id) {
      let paramsCity = {
        type : "service_id",
        carrier_id : data.carrier_id,
        category_code :  data.category
      }
      this.props.getServiceCodeZoneCodeByCondition(paramsCity, messages, 'editview');
    }

    if (data && data.shipment_type_id) {
      let paramsShipmenttype = {
        type : "shipment_type_id",
        category_code : data.category,
        carrier_id :  data.carrier_id,
        service_id : [ data.service_id ]
      }
      this.props.getShipmentTypeCodeZoneCodeByCondition(paramsShipmenttype, messages, 'editview');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.modalType !== this.props.modalType) {
      this.setState({
        modalType: prevProps.modalType
      });
    }
  }

  componentWillReceiveProps(nextProps){
    
    if(nextProps.modalData && nextProps.modalData.is_private === 2 && this.state.is_private === 2  && nextProps.modalType ==='edit' &&  this.state.customer_disabled )
    {
      this.setState({
        customer_disabled: false
      });
    }

    if(nextProps.modalData && nextProps.modalData.is_private === 2  && nextProps.modalType ==='edit' &&  this.state.customer_disabled )
    {
      this.setState({
        customer_disabled: false
      });
    }

    if(nextProps.modalData && this.state.is_private === 1  && nextProps.modalType ==='edit' &&  this.state.customer_disabled )
    {
      this.setState({
        customer_disabled: true
      });
    }
    
    if(nextProps.modalData && nextProps.modalData.is_private === 2 && this.state.is_private === 2 && nextProps.modalType ==='view' &&  this.state.customer_disabled === false )
    {
      this.setState({
        customer_disabled: true
      });
    }
    if(nextProps.modalData && nextProps.modalType ==='view' &&  this.state.customer_disabled === false )
    {
      this.setState({
        customer_disabled: true
      });
    }
   }

  onChangeCategory = value => {
    const { messages } = this.props.intl;
    this.setState({
      category_code: value
    });
    let params = {
      type : "carrier_id",
      category_code : value
    }
    this.props.getCarrierCodeZoneCodeByCondition(params, messages, 'onchange');
  
    params = { ...params,carrier_id: 0}
    this.props.getServiceCodeZoneCodeByCondition(params, messages, 'onchange');
   
    params = { ...params, service_id: [0] }
    this.props.getShipmentTypeCodeZoneCodeByCondition(params, messages, 'onchange');
  }

  onChangeCarrier = value => {
    const { messages } = this.props.intl;
    this.setState({
      carrier_id: value
    });
    let params = {
      type : "service_id",
      carrier_id : value,
      category_code : this.state.category_code
    }
    this.props.getServiceCodeZoneCodeByCondition(params, messages, 'onchange');
   
    params = { ...params, service_id: [0] }
    this.props.getShipmentTypeCodeZoneCodeByCondition(params, messages, 'onchange');
  }

  onChangeService = value => {
    const { messages } = this.props.intl;
    let params = {
      type : "shipment_type_id",
      category_code : this.state.category_code,
      carrier_id : this.state.carrier_id,
      service_id : [ value ] 
    }
    this.props.getShipmentTypeCodeZoneCodeByCondition(params, messages, 'onchange');
  }

  showOptionCarrier = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.carrier_id,
          label: item.carrier_code
        }
      })
    }
    return result;
  }
  showOptionService = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.service_id,
          label: item.service_code
        }
      })
    }
    return result;
  }
  showOptionShipmenttype = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.shipment_type_id,
          label: item.shipment_type_code
        }
      })
    }
    return result;
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

  onChangeOriginCountry = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        country: value ? value : 0
      }
    }
    this.props.change('origin_city',null);
    this.props.change('origin_district',null);
    this.props.change('origin_ward',null);
    this.props.getOriginCityList(params, messages, 'onchange');
  }

  onChangeOriginCity = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        city: value ? value : 0
      }
    }
    this.props.change('origin_district',null);
    this.props.change('origin_ward',null);
    this.props.getOriginDistrictList(params, messages, 'onchange');
  }

  onChangeOriginDistrict = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        district: value ? value : 0
      }
    }
    this.props.change('origin_ward',null);
    this.props.getOriginWardList(params, messages, 'onchange');
  }

  onChangeDestinationCountry = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        country: value ? value : 0
      }
    }
    this.props.change('destination_city',null);
    this.props.change('destination_district',null);
    this.props.change('destination_ward',null);
    this.props.getDestinationCityList(params, messages, 'onchange');
  }

  onChangeDestinationCity = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        city: value ? value : 0
      }
    }
    this.props.change('destination_district',null);
    this.props.change('destination_ward',null);
    this.props.getDestinationDistrictList(params, messages, 'onchange');
  }

  onChangeDestinationDistrict = value => {
    const { messages } = this.props.intl;
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        district: value ? value : 0
      }
    }
    this.props.change('destination_ward',null);
    this.props.getDestinationWardList(params, messages, 'onchange');
  }

  showOptions = (items) => {
    const countries = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return countries;
  }

  toggleModal = () => {
    this.props.toggleZoneCodeModal();
  };

  changeTypeModal = () => {
    this.props.changeTypeZoneCodeModal(MODAL_VIEW);
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData, modalType,  CarrierCodeZoneCodeByCondition, ServiceCodeZoneCodeByCondition, ShipmentCodeZoneCodeByCondition, customerCode, origin_countrys, origin_citys, origin_districts, origin_wards, destination_countrys, destination_citys, destination_districts, destination_wards } = this.props;
    let className = 'success';
    let title = messages['zone_code.add-new'];
    const disabled = modalType === MODAL_VIEW ? true : false;
    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        title = messages['zone_code.add-new'];
        break;
      case MODAL_EDIT:
        className = 'primary';
        title = messages['zone_code.update'];
        break;
      case MODAL_VIEW:
        className = 'info';
        title = messages['zone_code.view'];
        break;
      default:
        break;
    }

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
         <button className="lnr lnr-cross modal__close-btn" onClick={this.toggleModal} />
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_man.filter-type'] }</span>
                <span className="text-danger">{'*'}</span>
                <div className="form__form-group-field">
                  <Field name="is_private" component={renderSelectField} type="text" options={[
                    { value: 1, label: messages['pri_man.public'] },
                    { value: 2, label: messages['pri_man.customer'] }
                    ]} 
                    onChange={this.hanldeChangeType}
                    disabled={disabled} 
                  />
                </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_man.customer']}</span>
              <span className="text-danger">{'*'}</span>
              <div className="form__form-group-field">
                <Field
                  name="customer_id"
                  component={renderSelectField}
                  type="text"
                  options={customerCode && this.showOptionsCustomer(customerCode)}
                  disabled={this.state.customer_disabled}
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
                    disabled={disabled} 
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
                  disabled={disabled} 
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_man.category']}</span>
                <span className="text-danger">{'*'}</span>
                <div className="form__form-group-field">
                    <Field name="category" component={renderSelectField} type="text" options={[
                      { value: 'Inbound', label: messages['inbound'] },
                      { value: 'Outbound', label: messages['outbound'] },
                      { value: 'Domestic', label: messages['domestic'] }
                      ]}
                      disabled={disabled} 
                      onChange={this.onChangeCategory}
                    />
                </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_man.carrier']}</span>
              <span className="text-danger">{'*'}</span>
              <div className="form__form-group-field">
                <Field
                  name="carrier_id"
                  component={renderSelectField}
                  type="text"
                  options={CarrierCodeZoneCodeByCondition && this.showOptionCarrier(CarrierCodeZoneCodeByCondition)}
                  onChange={this.onChangeCarrier}
                  disabled={disabled} 
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_man.service']}</span>
              <span className="text-danger">{'*'}</span>
              <div className="form__form-group-field">
                <Field
                  name="service_id"
                  component={renderSelectField}
                  type="text"
                  options={ServiceCodeZoneCodeByCondition && this.showOptionService(ServiceCodeZoneCodeByCondition)}
                  onChange={this.onChangeService}
                  disabled={disabled} 
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_man.shipment-type']}</span>
              <span className="text-danger">{'*'}</span>
              <div className="form__form-group-field">
                <Field
                  name="shipment_type_id"
                  component={renderSelectField}
                  type="text"
                  options={ShipmentCodeZoneCodeByCondition && this.showOptionShipmenttype(ShipmentCodeZoneCodeByCondition)}
                  disabled={disabled} 
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
                  options={origin_countrys && this.showOptions(origin_countrys)}
                  onChange={this.onChangeOriginCountry}
                  disabled={disabled} 
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
                  options={origin_citys && this.showOptions(origin_citys)}
                  onChange={this.onChangeOriginCity}
                  disabled={disabled} 
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
                  options={origin_districts && this.showOptions(origin_districts)}
                  onChange={this.onChangeOriginDistrict}
                  disabled={disabled} 
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
                  options={origin_wards && this.showOptions(origin_wards)}
                  onChange={this.onChangeOriginWard}
                  disabled={disabled} 
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
                  options={destination_countrys && this.showOptions(destination_countrys)}
                  onChange={this.onChangeDestinationCountry}
                  disabled={disabled} 
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
                    options={destination_citys && this.showOptions(destination_citys)}
                    onChange={this.onChangeDestinationCity}
                    disabled={disabled} 
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
                  options={destination_districts && this.showOptions(destination_districts)}
                  onChange={this.onChangeDestinationDistrict}
                  disabled={disabled} 
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
                  options={destination_wards && this.showOptions(destination_wards)}
                  onChange={this.onChangeDestinationWard}
                  disabled={disabled} 
                />
              </div>
            </div>
          </Col>
          <Col md={12} lg={6} xl={6} xs={12}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['description']}</span>
              <div className="form__form-group-field">
                <div className="form__form-group-icon">
                  <div className="flag vn"></div>
                </div>
                <Field name="description" component="textarea" type="text" disabled={disabled}  />
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
                <Field name="description_en" component="textarea" type="text" disabled={disabled}  />
              </div>
            </div>
          </Col>
        
        <Col md={12} lg={12} xl={12} xs={12}>
        {modalData &&
            <Fragment>
              <hr />
              <Row>
                <Col md={6}>
                  <span><i className="label-info-data">{messages['created-by']}:</i>{modalData.user_create_name}</span>
                  <br />
                  <span><i className="label-info-data">{messages['created-at']}:</i>{modalData.created_at}</span>
                </Col>
                {modalData.updated_at && 
                  <Col md={6}>
                    <span><i className="label-info-data">{messages['updated-by']}:</i>{modalData.user_update_name}</span>
                    <br />
                    <span><i className="label-info-data">{messages['updated-at']}:</i>{modalData.updated_at}</span>
                  </Col>
                }
              </Row>
            </Fragment>
          }
        </Col>
          </Row>
        </div>
        <ButtonToolbar className="modal__footer">
          {this.state.modalType === MODAL_VIEW &&
            <Button outline onClick={this.changeTypeModal}>{messages['cancel']}</Button>
          }
          <Button color={className} type="submit">{ modalType === MODAL_VIEW ? messages['edit'] : messages['save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

ActionForm.propTypes = {
  modalData: PropTypes.object,
  modalType: PropTypes.string,
  ShipmentCodeZoneCodeByCondition: PropTypes.array,
  CarrierCodeZoneCodeByCondition: PropTypes.array,
  ServiceCodeZoneCodeByCondition: PropTypes.array,
  customerCode: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  toggleZoneCodeModal: PropTypes.func.isRequired,
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

const mapStateToProps = ({zoneCode, customer}) => {  
  const { errors, modalData, modalType } = zoneCode;
  const { CarrierCodeZoneCodeByCondition, ServiceCodeZoneCodeByCondition, ShipmentCodeZoneCodeByCondition  } = zoneCode;
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
    modalType,
    CarrierCodeZoneCodeByCondition, 
    ServiceCodeZoneCodeByCondition, 
    ShipmentCodeZoneCodeByCondition, 
    customerCode,
    origin_countrys, origin_citys, origin_districts, origin_wards, 
    destination_countrys, destination_citys, destination_districts, destination_wards
  };
};

export default reduxForm({
  form: 'zone_code_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleZoneCodeModal,
  getCarrierCodeZoneCodeByCondition,
  getServiceCodeZoneCodeByCondition,
  getShipmentTypeCodeZoneCodeByCondition,
  getCustomerList,
  getOriginCountryList, getOriginCityList, getOriginDistrictList, getOriginWardList,
  getDestinationCountryList, getDestinationCityList, getDestinationDistrictList, getDestinationWardList,
  changeTypeZoneCodeModal
})(ActionForm)));