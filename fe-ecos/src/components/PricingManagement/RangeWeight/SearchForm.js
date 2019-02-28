import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCustomerList, getCarrierCodeByCondition, getServiceCodeByCondition, getShipmentTypeCodeByCondition   } from "../../../redux/actions";

class SearchForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      customer_disable: true,
      category_code: null,
      carrier_id: null
    }
  }

  hanldeChangeType = value => {
    if (value === 2) {
      this.setState({
        customer_disable: false
      });
    } else {
      this.setState({
        customer_disable: true
      })
    }
  }

  componentDidMount() {
    const { messages } = this.props.intl;
        //get customer
        const paramCustomer = {
            field: ['id', 'name'],
            offset: {
                limit: 0
            }
        }
    this.props.getCustomerList(paramCustomer, messages);
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
    this.props.getCarrierCodeByCondition(params, messages);

    params = { ...params, carrier_id: 0 }
    this.props.getServiceCodeByCondition(params, messages);

    params = { ...params, service_id: [0] }
    this.props.getShipmentTypeCodeByCondition(params, messages);
  }

  onChangeCarrier = value => {
    const { messages } = this.props.intl;
    this.setState({
      carrier_id: value
    });
    let params = {
      type : "service_id",
      category_code : this.state.category_code,
      carrier_id : value
    }
    this.props.getServiceCodeByCondition(params, messages);

    params = { ...params, service_id: [0] }
    this.props.getShipmentTypeCodeByCondition(params, messages);
  }

  onChangeService = value => {
    const { messages } = this.props.intl;
    let params = {
      type : "shipment_type_id",
      category_code : this.state.category_code,
      carrier_id : this.state.carrier_id,
      service_id : [ value ] 
    }
    this.props.getShipmentTypeCodeByCondition(params, messages);
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
    const { handleSubmit, reset,  customerCode, CarrierCodeByCondition, ServiceCodeByCondition, codeByCondition } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={3}>
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

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.customer']}</span>
            <div className="form__form-group-field">
              <Field name="customer" component={renderSelectField} type="text"
                     options={customerCode && this.showOptionCustomer(customerCode)}
                     disabled={this.state.customer_disable}
              />
            </div>
          </div>
        </Col>    

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['range_weight.name']}</span>
            <div className="form__form-group-field">
              <Field component="input" type="text"
                     name='code' />
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
            <span className="form__form-group-label">{messages['pri_man.category']}</span>
            <div className="form__form-group-field">
              <Field name="category" component={renderSelectField} type="text" options={[
                { value: '', label: messages['all'] },
                { value: 'Inbound', label: messages['inbound'] },
                { value: 'Outbound', label: messages['outbound'] },
                { value: 'Domestic', label: messages['domestic'] }
                ]}
                clearable={false}
                onChange={this.onChangeCategory}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.carrier']}</span>
            <div className="form__form-group-field">
              <Field name="carrier_id" component={renderSelectField} type="text"
                     options={CarrierCodeByCondition && this.showOptionCarrier(CarrierCodeByCondition)}
                     onChange={this.onChangeCarrier} />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.service']}</span>
            <div className="form__form-group-field">
              <Field name="service_id" component={renderSelectField} type="text"
                     options={ServiceCodeByCondition && this.showOptionService(ServiceCodeByCondition)}
                     onChange={this.onChangeService}
                     />
            </div>
          </div>
        </Col>    

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.shipment-type']}</span>
            <div className="form__form-group-field">
              <Field name="shipmenttype" component={renderSelectField} type="text"
                     options={codeByCondition && this.showOptionShipmenttype(codeByCondition)}
                     />
            </div>
          </div>
        </Col>       
        
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.from']}</span>
            <div className="form__form-group-field">
              <Field component="input" type="number" step="0.1" min="0" 
                     name='from' />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.to']}</span>
            <div className="form__form-group-field">
              <Field component="input" type="number" step="0.1" min="0"
                     name='to' />
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['range_weight.calculate']}</span>
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
            <span className="form__form-group-label">{messages['range_weight.roundup']}</span>
            <div className="form__form-group-field">
              <Field component="input" type="number" min="0" 
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
  codeByCondition: PropTypes.array,
  CarrierCodeByCondition: PropTypes.array,
  ServiceCodeByCondition: PropTypes.array,
  getCustomerList: PropTypes.func.isRequired,
  getCarrierCodeByCondition: PropTypes.func.isRequired,
  getServiceCodeByCondition: PropTypes.func.isRequired,
  getShipmentTypeCodeByCondition: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

const mapStateToProps = ({ shipment_type, customer }) => {
  const { CarrierCodeByCondition, ServiceCodeByCondition, codeByCondition  } = shipment_type;
  const customerCode = customer.items;
  return { customerCode, CarrierCodeByCondition, ServiceCodeByCondition, codeByCondition }
}

export default reduxForm({
  form: 'range_weight_search_form',
  initialValues: {
    name: '',
    carrier: -1,
    status: -1,
    category: '',
    is_private: -1,
    calculate_unit: -1
  }
})(injectIntl(connect(mapStateToProps, {
  getCustomerList,
  getCarrierCodeByCondition,
  getServiceCodeByCondition,
  getShipmentTypeCodeByCondition
})(SearchForm)));