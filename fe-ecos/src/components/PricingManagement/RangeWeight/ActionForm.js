import React, { Component, Fragment } from 'react';
import { Button, ButtonToolbar, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleRangeWeightModal, changeTypeRangeWeightModal, getCarrierCodeList, getServiceCodeList, getShipmentTypeCodeList, getCustomerList  } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_VIEW, MODAL_EDIT } from '../../../constants/defaultValues';

class ActionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      disabled: false
    }
  }

  componentDidMount() {
    let data = this.props.modalData;
    
    if (data) {
      this.props.initialize(data);
      this.props.getCarrierCodeList();
      this.props.getServiceCodeList();
      this.props.getShipmentTypeCodeList();
      this.props.getCustomerList();
      if(data.is_private === 1)
      {
        this.setState({
          disabled: true
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
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.modalType !== this.props.modalType) {
      this.setState({
        modalType: prevProps.modalType
      });
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

  toggleModal = () => {
    this.props.toggleRangeWeightModal();
  };
  componentWillReceiveProps(nextProps) {
      if (nextProps && nextProps.modalData) {
      // const data = nextProps.modalData;
    }
  }
  changeTypeModal = () => {
    this.props.changeTypeRangeWeightModal(MODAL_VIEW);
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData, modalType, carrierCode, serviceCode, shipment_typeCode, customerCode } = this.props;
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
              <Field name="is_private" component={renderSelectField} type="text" options={[
                { value: 1, label: messages['pri_man.public'] },
                { value: 2, label: messages['pri_man.customer'] }
                ]}
                messages={messages}
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
                messages={messages}
                disabled={this.state.disabled}
                
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
                messages={messages}
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
                messages={messages}
                disabled={disabled} 
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
              options={carrierCode && this.showOptionsCarrier(carrierCode)}
              messages={messages}
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
                options={serviceCode && this.showOptionsService(serviceCode)}
                messages={messages}
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
              options={shipment_typeCode && this.showOptionsShipmenttype(shipment_typeCode)}
              messages={messages}
              disabled={disabled} 
            />
          </div>
        </div>
        </Col>
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.from']}</span>
            <span className="text-danger">{'*'}</span>
            <div className="form__form-group-field">
              <Field name="from" component="input" type="number" step="0.1" min="0" 
                     messages={messages}
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
                     messages={messages}
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
                messages={messages}
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
                       messages={messages}
                       disabled={disabled} 
                        />
              </div>
            </div>
          </Col>
        <Col md={12} lg={6} xl={6} xs={12}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['range_weight.desc']}</span>
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
                    name='round_up'  messages={messages} disabled={disabled}  /> 
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
  carrierCode: PropTypes.array,
  serviceCode: PropTypes.array,
  shipment_typeCode: PropTypes.array,
  customerCode: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  toggleRangeWeightModal: PropTypes.func.isRequired,
  getCarrierCodeList: PropTypes.func.isRequired,
  getServiceCodeList: PropTypes.func.isRequired,
  getShipmentTypeCodeList: PropTypes.func.isRequired,
  getCustomerList: PropTypes.func.isRequired,
}

const mapStateToProps = ({rangeWeight, carrier, service, shipment_type, customer}) => {  
  const { errors, modalData, modalType } = rangeWeight;
  const carrierCode = carrier.codes;
  const serviceCode = service.codes;
  const shipment_typeCode = shipment_type.codes;
  const customerCode = customer.items;
  return {
    errors,
    modalData,
    modalType,
    carrierCode, serviceCode, shipment_typeCode, customerCode
  };
};

export default reduxForm({
  form: 'range_weight_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleRangeWeightModal,
  getCarrierCodeList,
  getServiceCodeList,
  getShipmentTypeCodeList,
  getCustomerList,
  changeTypeRangeWeightModal
})(ActionForm)));