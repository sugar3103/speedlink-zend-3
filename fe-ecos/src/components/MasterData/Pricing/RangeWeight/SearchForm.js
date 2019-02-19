import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCarrierCodeList, getServiceCodeList, getShipmentTypeCodeList, getCustomerList   } from "../../../../redux/actions";

class SearchForm extends Component {

  componentDidMount() {
    this.props.getCarrierCodeList();
    this.props.getServiceCodeList();
    this.props.getShipmentTypeCodeList();
    this.props.getCustomerList();
  }

  showOptionCarrier = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: item.code
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
          value: item.id,
          label: item.code
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
          value: item.id,
          label: item.code
        }
      })
    }
    return result;
  }
  showOptionCustomer = (items) => {
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


  render() {
    const { handleSubmit, reset, carrierCode, serviceCode, shipment_typeCode, customerCode } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.type']}</span>
            <div className="form__form-group-field">
              <Field name="is_private" component={renderSelectField} type="text" options={[
                { value: -1, label: messages['all'] },
                { value: 0, label: messages['rangeweight.public'] },
                { value: 1, label: messages['rangeweight.customer'] }
                ]}
                clearable={false}
              />
            </div>
          </div>
        </Col>
        <Col md={9}></Col>   

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.name']}</span>
            <div className="form__form-group-field">
              <Field component="input" type="text" placeholder={messages['rangeweight.name']}
                     name='code' />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.carrier']}</span>
            <div className="form__form-group-field">
              <Field name="carrier_id" component={renderSelectField} type="text"
                     options={carrierCode && this.showOptionCarrier(carrierCode)}/>
            </div>
          </div>
        </Col>
        
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.category']}</span>
            <div className="form__form-group-field">
              <Field name="category" component={renderSelectField} type="text" options={[
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

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.service']}</span>
            <div className="form__form-group-field">
              <Field name="service_id" component={renderSelectField} type="text"
                     options={serviceCode && this.showOptionService(serviceCode)}/>
            </div>
          </div>
        </Col>    

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.shipmenttype']}</span>
            <div className="form__form-group-field">
              <Field name="shipmenttype" component={renderSelectField} type="text"
                     options={shipment_typeCode && this.showOptionShipmenttype(shipment_typeCode)}/>
            </div>
          </div>
        </Col>       

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['status']}</span>
            <div className="form__form-group-field">
              <Field name="status" component={renderSelectField} type="text" options={[
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
            <span className="form__form-group-label">{messages['rangeweight.customer']}</span>
            <div className="form__form-group-field">
              <Field name="customer" component={renderSelectField} type="text"
                     options={customerCode && this.showOptionCustomer(customerCode)}/>
            </div>
          </div>
        </Col>    
        <Col md={3}></Col>
        
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.from']}</span>
            <div className="form__form-group-field">
              <Field component="input" type="number" step="0.1" min="0" placeholder={messages['rangeweight.from']}
                     name='from' />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.to']}</span>
            <div className="form__form-group-field">
              <Field component="input" type="number" step="0.1" min="0" placeholder={messages['rangeweight.from']}
                     name='to' />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.calculate']}</span>
            <div className="form__form-group-field">
              <Field name="calculate_unit" component={renderSelectField} type="text" options={[
                { value: -1, label: messages['all'] },
                { value: 1, label: messages['yes'] },
                { value: 0, label: messages['no'] }
                ]}
                clearable={false}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['rangeweight.roundup']}</span>
            <div className="form__form-group-field">
              <Field component="input" type="number" min="0" placeholder={messages['rangeweight.roundup']}
                     name='round_up' />
            </div>
          </div>
        </Col>

        <div className="search-group-button">
          <Button size="sm" outline onClick={(e)=> {
            reset();
            setTimeout(() => {
              handleSubmit();
            }, 200);
          }} >
            {messages['clear']}</Button>{' '}
          <Button size="sm" color="primary" id="search" >
            {messages['search']}
          </Button>
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  carrierCode: PropTypes.array,
  getCarrierCodeList: PropTypes.func.isRequired,
  getServiceCodeList: PropTypes.func.isRequired,
  getShipmentTypeCodeList: PropTypes.func.isRequired,
  getCustomerList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

const mapStateToProps = ({ carrier, service, shipment_type, customer }) => {
  const carrierCode = carrier.codes;
  const serviceCode = service.codes;
  const shipment_typeCode = shipment_type.codes;
  const customerCode = customer.items;
  return { carrierCode, serviceCode, shipment_typeCode, customerCode }
}

export default reduxForm({
  form: 'rangeweight_search_form',
  initialValues: {
    name: '',
    carrier: -1,
    status: -1,
    category: '',
    is_private: -1,
    calculate_unit: -1
  }
})(injectIntl(connect(mapStateToProps, {
  getCarrierCodeList,
  getServiceCodeList,
  getShipmentTypeCodeList,
  getCustomerList
})(SearchForm)));