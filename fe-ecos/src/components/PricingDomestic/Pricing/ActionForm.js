import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPricingDomesticList,
  getCustomerDomesticList,
  getCarrierDomesticList,
  getServiceDomesticList,
  getSalemanDomesticList,
  getApprovedByDomesticList
} from '../../../redux/actions';
import { categoryPricing } from '../../../constants/defaultValues';
import renderSelectField from '../../../containers/Shared/form/Select';
import renderDatePickerField from '../../../containers/Shared/form/DatePicker';
import CustomField from '../../../containers/Shared/form/CustomField';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import validate from './validateActionForm';
import ReactLoading from 'react-loading';
import { formatCurrency, normalizeCurrency } from '../../../util/format-field';
class ActionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showField: false,
      disabledAction: true,
      disabledType: true,
      disabledGetPricingDom: true,
      disabledCustomer: true,
    }
  }

  showOptionsCategory = () => {
    let result = [];
    for (var key in categoryPricing) {
      if (categoryPricing.hasOwnProperty(key)) {
        result.push({
          value: key,
          label: categoryPricing[key]
        });
      }
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

  showOptions = (items) => {
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

  showOptionUser = (items) => {
    let result = [];
    if (items.length > 0) {
        result = items.map(item => {
            return {
                value: item.id,
                label: item.username
            }
        })
    }
    return result;
  }

  onChangeIsPrivate = value => {
    this.props.change('get_pricing_dom', '');
    this.props.change('customer_id', '');
    if (value) {
      this.setState({ showField: true });
    } else {
      this.setState({ showField: false });
    }
  }

  onChangePricing = value => {
    const { pricing } = this.props;

    if (pricing.items.length > 0) {
      const data = pricing.items.find(item => item.id === value);
      if (data) {
        const initialValues = {
          is_private: 1,
          category_id: data.category_id,
          carrier_id: data.carrier_id,
          service_id: data.service_id,
          status: data.status,
          saleman_id: this.props.currentUser.id,
          effected_date: data.effected_date,
          expired_date: data.expired_date,
          approval_status: 0,
          approval_by: data.approval_by
        };
        this.props.initialize(initialValues);
      }
    }
    
  }

  componentWillMount() {
    const params = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      }
    };
    this.props.getCustomerDomesticList(params);
    this.props.getCarrierDomesticList(params);
    this.props.getServiceDomesticList(params);

    const paramsPricing = {
      offset: {
        limit: 0
      },
      query: {
        is_private: 0
      }
    };
    this.props.getPricingDomesticList(paramsPricing);

    const paramsUser = {
      field: ['id', 'username'],
      offset: {
        limit: 0
      }
    };
    this.props.getSalemanDomesticList(paramsUser);
    this.props.getApprovedByDomesticList(paramsUser);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.is_private) {
      this.setState({ showField: true })
    }
  }

  componentDidMount() {
    this.setState({
      disabledAction: this.props.type === 'view' ? true : false,
      disabledType: this.props.type === 'edit' ? true : false,
      disabledGetPricingDom: this.props.type === 'add' ? true : false,
      disabledCustomer: this.props.type === 'edit' ? true : false
    })
  }
  

  render() {
    const { handleSubmit, pricing, 
      customer, carrier, service, saleman, approvedBy, 
      disableApprovalStatus, disableApprovalBy,
      loading
    } = this.props;
    const { messages } = this.props.intl;
    const { disabledAction, disabledType, disabledGetPricingDom, disabledCustomer, showField } = this.state;
    
    return loading ? (
        <ReactLoading type="bubbles" className="loading" /> 
      ) : (
      <form className="form form_custom" onSubmit={handleSubmit}>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.type']}</span>
              <div className="form__form-group-field">
                <Field
                  name="is_private"
                  component={renderSelectField}
                  options={[
                    { value: 0, label: messages['pri_dom.public'] },
                    { value: 1, label: messages['pri_dom.customer'] }
                  ]}
                  onChange={this.onChangeIsPrivate}
                  clearable={false}
                  disabled={disabledType}
                />
              </div>
            </div>
          </Col>
          {disabledGetPricingDom && (<Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.get-pricing-dom']}</span>
              <div className="form__form-group-field">
                <Field
                  name="get_pricing_dom"
                  component={renderSelectField}
                  options={pricing.items && this.showOptionCustomer(pricing.items)}
                  disabled={!showField || disabledAction}
                  clearable={false}
                  onChange={this.onChangePricing}
                />
              </div>
            </div>
          </Col>)}
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.customer']}</span>
              <div className="form__form-group-field">
                <Field
                  name="customer_id"
                  component={renderSelectField}
                  options={customer.items && this.showOptionCustomer(customer.items)}
                  disabled={!showField || disabledCustomer}
                  clearable={false}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.category']}</span>
              <div className="form__form-group-field">
                <Field
                  name="category_id"
                  component={renderSelectField}
                  options={this.showOptionsCategory()}
                  disabled
                />
              </div>
            </div>
          </Col>
       
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.carrier']}</span>
              <div className="form__form-group-field">
                <Field
                  name="carrier_id"
                  component={renderSelectField}
                  options={carrier.items && this.showOptions(carrier.items)}
                  clearable={false}
                  disabled={disabledAction}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.service']}</span>
              <div className="form__form-group-field">
                <Field
                  name="service_id"
                  component={renderSelectField}
                  options={service.items && this.showOptions(service.items)}
                  clearable={false}
                  disabled={disabledAction}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.status']}</span>
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={renderSelectField}
                  options={[
                    { value: 1, label: messages['pri_dom.active'] },
                    { value: 0, label: messages['pri_dom.inactive'] }
                  ]}
                  clearable={false}
                  disabled={disabledAction}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.saleman']}</span>
              <div className="form__form-group-field">
                <Field
                  name="saleman_id"
                  component={renderSelectField}
                  options={saleman.items && this.showOptionUser(saleman.items)}
                  disabled
                />
              </div>
            </div>
          </Col>
        
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.effected-date']}</span>
              <div className="form__form-group-field">
                <Field
                  name="effected_date"
                  component={renderDatePickerField}
                  disabled={disabledAction}
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.expired-date']}</span>
              <div className="form__form-group-field">
                <Field
                  name="expired_date"
                  component={renderDatePickerField}
                  disabled={disabledAction}
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </div>
            </div>
          </Col>
          <Col md={3} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.approved-status']}</span>
              <div className="form__form-group-field">
                <Field
                  name="approval_status"
                  component={renderSelectField}
                  options={[
                    { value: 0, label: messages['pri_dom.new'] },
                    { value: 1, label: messages['pri_dom.approved'] },
                    { value: 2, label: messages['pri_dom.draft'] },
                  ]}
                  disabled={disableApprovalStatus || disabledAction}
                  clearable={false}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.approved-by']}</span>
              <div className="form__form-group-field">
                <Field
                  name="approval_by"
                  component={renderSelectField}
                  options={approvedBy.items && this.showOptionUser(approvedBy.items)}
                  clearable={false}
                  disabled={disabledAction || disableApprovalBy}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.total-ras']}</span>
              <div className="form__form-group-field">
                <Field
                  name="total_ras"
                  component={CustomField}
                  format={formatCurrency}
                  normalize={normalizeCurrency}
                  disabled={disabledAction}
                />
              </div>
            </div>
          </Col>
        </Row>
        {!disabledAction && 
          <Row>
            <Col md={12} className="text-right">
              <Link to="/pricing-domestic/pricing" className="btn btn-outline-secondary btn-sm">
                {messages['cancel']}
              </Link>
              <Button size="sm" color="primary">
                {messages['save']}
              </Button>
            </Col>
          </Row>
        }
      </form>
    );
  }
}

ActionForm.propTypes = {
  getPricingDomesticList: PropTypes.func.isRequired,
  getCustomerDomesticList: PropTypes.func.isRequired,
  getCarrierDomesticList: PropTypes.func.isRequired,
  getServiceDomesticList: PropTypes.func.isRequired,
  getSalemanDomesticList: PropTypes.func.isRequired,
  getApprovedByDomesticList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => {
  const { pricingDomestic, authUser } = state;
  const currentUser = authUser.user;
  const { pricing, customer, carrier, service, saleman, approvedBy } = pricingDomestic;
  const { itemEditting, loading } = pricing;
  let initialValues = {};
  if (props.type === 'add') {
    initialValues = { 
      saleman_id: currentUser ? currentUser.id : null,
      category_id: 3,
      approval_status: 0
    };
  } else {
    initialValues = itemEditting
  }

  let disableApprovalStatus = true;
  let disableApprovalBy = false;
  if (currentUser && itemEditting && currentUser.id === itemEditting.approval_by) {
    disableApprovalStatus = false;
  }
  if (itemEditting && itemEditting.approval_status === 1) {
    disableApprovalBy = true;
  }

  const selector = formValueSelector('pricing_domestic_action_form');
  const is_private = selector(state, 'is_private');

  return {
    pricing,
    customer,
    carrier,
    service,
    saleman,
    approvedBy,
    currentUser,
    initialValues,
    is_private,
    disableApprovalStatus,
    disableApprovalBy,
    loading
  }
}

export default connect(mapStateToProps, {
  getPricingDomesticList,
  getCustomerDomesticList,
  getCarrierDomesticList,
  getServiceDomesticList,
  getSalemanDomesticList,
  getApprovedByDomesticList
})(reduxForm({ 
  form: 'pricing_domestic_action_form', 
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(injectIntl(ActionForm)));