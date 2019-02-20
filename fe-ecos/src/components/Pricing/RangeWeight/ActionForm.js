import React, { Component } from 'react';
import { Button, ButtonToolbar, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleRangeWeightModal, getCarrierCodeList, getServiceCodeList, getShipmentTypeCodeList, getCustomerList  } from '../../../redux/actions';
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
  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData, carrierCode, serviceCode, shipment_typeCode, customerCode } = this.props;
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
            <span className="form__form-group-label">{messages['rangeweight.filtertype'] }</span>
            <span className="text-danger">{'*'}</span>
            <div className="form__form-group-field">
              <Field name="is_private" component={renderSelectField} type="text" options={[
                { value: 1, label: messages['rangeweight.public'] },
                { value: 2, label: messages['rangeweight.customer'] }
                ]}
                messages={messages}
                onChange={this.hanldeChangeType}
              />
            </div>
        </div>
        </Col>

        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.customer']}</span>
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
            <span className="form__form-group-label">{messages['rangeweight.name']}</span>
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
        
        </Col>
        <Col md={6} lg={3} xl={3} xs={6}>
        <div className="form__form-group">
          <span className="form__form-group-label">{messages['rangeweight.category']}</span>
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
          <span className="form__form-group-label">{messages['rangeweight.carrier']}</span>
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
            <span className="form__form-group-label">{messages['rangeweight.service']}</span>
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
          <span className="form__form-group-label">{messages['rangeweight.shipmenttype']}</span>
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
            <span className="form__form-group-label">{messages['rangeweight.from']}</span>
            <span className="text-danger">{'*'}</span>
            <div className="form__form-group-field">
              <Field name="from" component="input" type="number" step="0.1" min="0" 
                     messages={messages} />
            </div>
          </div>
        </Col>
        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.to']}</span>
            <span className="text-danger">{'*'}</span>
            <div className="form__form-group-field">
              <Field name="to" component="input" type="number" step="0.1" min="0" 
                     messages={messages} />
            </div>
          </div>
        </Col>

        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.calculate']}</span>
            <span className="text-danger">{'*'}</span>
            <div className="form__form-group-field">
            <Field name="calculate_unit" component={renderSelectField} type="text" options={[
                { value: 1, label: messages['yes'] },
                { value: 0, label: messages['no'] }
                ]}
                messages={messages}
              />
            </div>
          </div>
          </Col>

          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['rangeweight.unit']}</span>
              <span className="text-danger">{'*'}</span>
              <div className="form__form-group-field">
                <Field name="unit" component="input" type="number" step="0.1" min="0" 
                       messages={messages} />
              </div>
            </div>
          </Col>
        <Col md={12} lg={6} xl={6} xs={12}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.desc']}</span>
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
            <span className="form__form-group-label">&nbsp;</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag us"></div>
              </div>
              <Field name="description_en" component="textarea" type="text"  />
            </div>
          </div>
        </Col>

        <Col md={6} lg={3} xl={3} xs={6}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.roundup']}</span>
            <span className="text-danger">{'*'}</span>
            <div className="form__form-group-field">
              <Field component="input" type="number" min="0" 
                    name='round_up' />
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
  toggleRangeWeightModal: PropTypes.func.isRequired,
  getCarrierCodeList: PropTypes.func.isRequired,
  getServiceCodeList: PropTypes.func.isRequired,
  getShipmentTypeCodeList: PropTypes.func.isRequired,
  getCustomerList: PropTypes.func.isRequired,
}

const mapStateToProps = ({rangeweight, carrier, service, shipment_type, customer}) => {  
  const { errors, modalData } = rangeweight;
  const carrierCode = carrier.codes;
  const serviceCode = service.codes;
  const shipment_typeCode = shipment_type.codes;
  const customerCode = customer.items;
  return {
    errors,
    modalData,
    carrierCode, serviceCode, shipment_typeCode, customerCode
  };
};

export default reduxForm({
  form: 'rangeweight_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleRangeWeightModal,
  getCarrierCodeList,
  getServiceCodeList,
  getShipmentTypeCodeList,
  getCustomerList
})(ActionForm)));