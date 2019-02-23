import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCarrierCodeList, getServiceCodeList, getShipmentTypeCodeList, getCustomerList   } from "../../../redux/actions";

class SearchForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      disabled: false
    }
  }

  componentDidMount() {
    this.props.getCarrierCodeList();
    this.props.getServiceCodeList();
    this.props.getShipmentTypeCodeList();
    this.props.getCustomerList();
  }
  
  onChangeCategory = value => {
    let params = {
      type : "carrier_id",
      category_code : value
    }
    console.log(params);
    // this.props.getCodeByCondition(params);
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


  render() {
    const { handleSubmit, reset, carrierCode, serviceCode, shipment_typeCode, customerCode } = this.props;
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
                     disabled={this.state.disabled}
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
                     options={carrierCode && this.showOptionCarrier(carrierCode)}/>
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.service']}</span>
            <div className="form__form-group-field">
              <Field name="service_id" component={renderSelectField} type="text"
                     options={serviceCode && this.showOptionService(serviceCode)}/>
            </div>
          </div>
        </Col>    

        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_man.shipment-type']}</span>
            <div className="form__form-group-field">
              <Field name="shipmenttype" component={renderSelectField} type="text"
                     options={shipment_typeCode && this.showOptionShipmenttype(shipment_typeCode)}/>
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
  getCarrierCodeList,
  getServiceCodeList,
  getShipmentTypeCodeList,
  getCustomerList
})(SearchForm)));