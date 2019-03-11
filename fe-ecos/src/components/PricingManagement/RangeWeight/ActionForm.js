import React, { Component, Fragment } from 'react';
import { Button, ButtonToolbar, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleRangeWeightModal, changeTypeRangeWeightModal, getCarrierCodeByCondition, getServiceCodeByCondition, getShipmentTypeCodeByCondition , getCustomerList  } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_VIEW, MODAL_EDIT } from '../../../constants/defaultValues';
import Moment from 'react-moment';
import Can from '../../../containers/Shared/Can';

class ActionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      customer_disabled: true,
      category_code: null,
      carrier_id: null,
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
    let data = this.props.modalData;
    const { messages } = this.props.intl;
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
    } else {
      data = {
        from: 0,
        to: 0,
        unit: 0,
        round_up: 0
      };
      this.props.initialize(data);
      this.props.change('status',1);
    }

    if (data && data.carrier_id) {
      let paramsCarier = {
        type : "carrier_id",
        category_code : data.category
      }
      this.props.getCarrierCodeByCondition(paramsCarier, messages, 'editview');
    }

    if (data && data.service_id) {
      let paramsCity = {
        type : "service_id",
        carrier_id : data.carrier_id,
        category_code :  data.category
      }
      this.props.getServiceCodeByCondition(paramsCity, messages, 'editview');
    }

    if (data && data.shipment_type_id) {
      let paramsShipmenttype = {
        type : "shipment_type_id",
        category_code : data.category,
        carrier_id :  data.carrier_id,
        service_id : [ data.service_id ]
      }
      this.props.getShipmentTypeCodeByCondition(paramsShipmenttype, messages, 'editview');
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
    this.props.getCarrierCodeByCondition(params, messages, 'onchange');
    
    params = { ...params, carrier_id: 0 }
    this.props.getServiceCodeByCondition(params, messages, 'onchange');
    
    params = { ...params, service_id: [0] }
    this.props.getShipmentTypeCodeByCondition(params, messages, 'onchange');
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
    this.props.getServiceCodeByCondition(params, messages, 'onchange');
    
    params = { ...params, service_id: [0] }
    this.props.getShipmentTypeCodeByCondition(params, messages, 'onchange');
  }

  onChangeService = value => {
    const { messages } = this.props.intl;
    let params = {
      type : "shipment_type_id",
      category_code : this.state.category_code,
      carrier_id : this.state.carrier_id,
      service_id : [ value ] 
    }
    this.props.getShipmentTypeCodeByCondition(params, messages, 'onchange');
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

  toggleModal = () => {
    this.props.toggleRangeWeightModal();
  };
 
  changeTypeModal = () => {
    this.props.changeTypeRangeWeightModal(MODAL_VIEW);
  } 

  render() {
    const { messages, locale } = this.props.intl;
    const { handleSubmit, modalData, modalType, CarrierCodeByCondition, ServiceCodeByCondition, ShipmentCodeByCondition, customerCode } = this.props;
    let className = 'success';
    let title = messages['range_weight.add-new'];
    const disabled = modalType === MODAL_VIEW ? true : false;
    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        title = messages['range_weight.add-new'];
        break;
      case MODAL_EDIT:
        className = 'primary';
        title = messages['range_weight.update'];
        break;
      case MODAL_VIEW:
        className = 'info';
        title = messages['range_weight.view'];
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
              <Field name="is_private" component={renderSelectField} options={[
                { value: 1, label: messages['pri_man.public'] },
                { value: 2, label: messages['pri_man.customer'] }
                ]}
                clearable={false}
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
                options={customerCode && this.showOptionsCustomer(customerCode)}
                disabled={this.state.customer_disabled}
                
              />
            </div>
          </div>
        </Col>

        <Col md={6} lg={3} xl={3} xs={6}>
        <div className="form__form-group">
            <span className="form__form-group-label">{messages['range_weight.name']}</span>
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
        </Row>
        <Row>
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
              disabled={disabled} 
              options={CarrierCodeByCondition && this.showOptionCarrier(CarrierCodeByCondition)}
              onChange={this.onChangeCarrier}
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
                options={ServiceCodeByCondition && this.showOptionService(ServiceCodeByCondition)}
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
              options={ShipmentCodeByCondition && this.showOptionShipmenttype(ShipmentCodeByCondition)}
              disabled={disabled} 
            />
          </div>
        </div>
        </Col>
        </Row>
        <Row>
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.from']}</span>
            <span className="text-danger">{'*'}</span>
            <div className="form__form-group-field">
              <Field name="from" component="input" type="number" step="0.1" min="0" 
                     disabled={disabled} 
                      /> 
            </div>
          </div>
        </Col>
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.to']}</span>
            <span className="text-danger">{'*'}</span>
            <div className="form__form-group-field">
              <Field name="to" component="input" type="number" step="0.1" min="0" 
                     disabled={disabled} 
                      />
            </div>
          </div>
        </Col>

        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['range_weight.calculate']}</span>
            <span className="text-danger">{'*'}</span>
            <div className="form__form-group-field">
            <Field name="calculate_unit" component={renderSelectField} type="text" options={[
                { value: 1, label: messages['yes'] },
                { value: 0, label: messages['no'] }
                ]}
                disabled={disabled} 
              />
            </div>
          </div>
          </Col>

        <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['range_weight.unit']}</span>
              <span className="text-danger">{'*'}</span>
              <div className="form__form-group-field">
                <Field name="unit" component="input" type="number" step="0.1" min="0" 
                       disabled={disabled} 
                        />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
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
            <span className="form__form-group-label">&nbsp;</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag us"></div>
              </div>
              <Field name="description_en" component="textarea" type="text" disabled={disabled}  />
            </div>
          </div>
        </Col>

        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['range_weight.roundup']}</span>
            <span className="text-danger">{'*'}</span>
            <div className="form__form-group-field">
              <Field component="input" type="number" min="0" 
                    name='round_up'  disabled={disabled}  /> 
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
      <Col md={12} lg={12} xl={12} xs={12}>
        {modalData &&
            <Fragment>
              <hr />
              <Row>
              <Col md={6}>
                <span><i className="label-info-data">{messages['created-by']}:</i>{modalData.full_name_created ? modalData.full_name_created : modalData.created_by}</span>
                <br />
                <span><i className="label-info-data">{messages['created-at']}:</i>
                <Moment fromNow locale={locale}>{new Date(modalData.created_at)}</Moment>
                </span>
                </Col>
                {modalData.updated_at && 
                  <Col md={6}>
                   <span><i className="label-info-data">{messages['updated-by']}:</i>
                        {(modalData.full_name_updated !== " ") ? modalData.full_name_updated : modalData.updated_by}</span>
                        <br />
                        <span><i className="label-info-data">{messages['updated-at']}:</i>
                        <Moment fromNow locale={locale}>{new Date(modalData.updated_at)}</Moment>
                        </span>
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
          <Can user={this.props.authUser.user} permission="rangeweight" action="edit" own={modalData && modalData.created_by}>
          <Button color={className} type="submit">{ modalType === MODAL_VIEW ? messages['edit'] : messages['save']}</Button>
          </Can>
        </ButtonToolbar>
      </form>
    );
  }
}

ActionForm.propTypes = {
  modalData: PropTypes.object,
  modalType: PropTypes.string,
  ShipmentCodeByCondition: PropTypes.array,
  CarrierCodeByCondition: PropTypes.array,
  ServiceCodeByCondition: PropTypes.array,
  customerCode: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  toggleRangeWeightModal: PropTypes.func.isRequired,
  getCustomerList: PropTypes.func.isRequired,
}

const mapStateToProps = ({rangeWeight, customer, authUser}) => {  
  const { errors, modalData, modalType, CarrierCodeByCondition, ServiceCodeByCondition, ShipmentCodeByCondition } = rangeWeight;
  const customerCode = customer.items;
  return {
    errors,
    modalData,
    modalType,
    customerCode,
    CarrierCodeByCondition, 
    ServiceCodeByCondition, 
    ShipmentCodeByCondition,
    authUser
  };
};

export default reduxForm({
  form: 'range_weight_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleRangeWeightModal,
  getCarrierCodeByCondition,
  getServiceCodeByCondition,
  getShipmentTypeCodeByCondition,
  getCustomerList,
  changeTypeRangeWeightModal
})(ActionForm)));