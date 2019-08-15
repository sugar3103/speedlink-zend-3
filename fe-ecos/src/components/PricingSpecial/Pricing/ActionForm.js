import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCustomerSpecialList,
  getCarrierSpecialList,
  getServiceSpecialList,
  getSalemanSpecialList,
  getApprovedBySpecialList
} from '../../../redux/actions';
import { categoryPricing } from '../../../constants/defaultValues';
import renderSelectField from '../../../containers/Shared/form/Select';
import renderDatePickerField from '../../../containers/Shared/form/DatePicker';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import validate from './validateActionForm';
import ReactLoading from 'react-loading';
import CustomField from '../../../containers/Shared/form/CustomField';
import { formatCurrency, normalizeCurrency } from '../../../util/format-field';
class ActionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabledAction: true,
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

  componentWillMount() {
    const params = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      }
    };
    this.props.getCustomerSpecialList(params);
    this.props.getCarrierSpecialList(params);
    this.props.getServiceSpecialList(params);

    const paramsUser = {
      field: ['id', 'username'],
      offset: {
        limit: 0
      }
    };
    this.props.getSalemanSpecialList(paramsUser);
    this.props.getApprovedBySpecialList(paramsUser);
  }

  componentDidMount() {
    this.setState({
      disabledAction: this.props.type === 'view' ? true : false,
    })
  }

  render() {
    const { handleSubmit, 
      customer, carrier, service, saleman, approvedBy, 
      disableApprovalStatus, disableApprovalBy,
      loading
    } = this.props;
    const { messages } = this.props.intl;
    const { disabledAction } = this.state;
    
    return loading ? (
        <ReactLoading type="bubbles" className="loading" /> 
      ) : (
      <form className="form form_custom" onSubmit={handleSubmit}>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.customer']}</span>
              <div className="form__form-group-field">
                <Field
                  name="customer_id"
                  component={renderSelectField}
                  options={customer.items && this.showOptionCustomer(customer.items)}
                  disabled={disabledAction}
                  clearable={false}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.category']}</span>
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
              <span className="form__form-group-label">{messages['pri_special.carrier']}</span>
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
              <span className="form__form-group-label">{messages['pri_special.service']}</span>
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
              <span className="form__form-group-label">{messages['pri_special.saleman']}</span>
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
              <span className="form__form-group-label">{messages['pri_special.status']}</span>
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={renderSelectField}
                  options={[
                    { value: 1, label: messages['pri_special.active'] },
                    { value: 0, label: messages['pri_special.inactive'] }
                  ]}
                  clearable={false}
                  disabled={disabledAction}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.effected-date']}</span>
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
              <span className="form__form-group-label">{messages['pri_special.expired-date']}</span>
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
              <span className="form__form-group-label">{messages['pri_special.approved-status']}</span>
              <div className="form__form-group-field">
                <Field
                  name="approval_status"
                  component={renderSelectField}
                  options={[
                    { value: 0, label: messages['pri_special.new'] },
                    { value: 1, label: messages['pri_special.approved'] },
                    { value: 2, label: messages['pri_special.draft'] },
                  ]}
                  disabled={disableApprovalStatus || disabledAction}
                  clearable={false}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.approved-by']}</span>
              <div className="form__form-group-field">
                <Field
                  name="approved_by"
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
              <span className="form__form-group-label">{messages['pri_special.total-ras']}</span>
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
              <Link to="/pricing-special/pricing" className="btn btn-outline-secondary btn-sm">
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
  getCustomerSpecialList: PropTypes.func.isRequired,
  getCarrierSpecialList: PropTypes.func.isRequired,
  getServiceSpecialList: PropTypes.func.isRequired,
  getSalemanSpecialList: PropTypes.func.isRequired,
  getApprovedBySpecialList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => {
  const { pricingSpecial, authUser } = state;
  const currentUser = authUser.user;
  const { pricing, customer, carrier, service, saleman, approvedBy } = pricingSpecial;
  let { itemEditting, loading } = pricing;
  let initialValues = {};
  if (props.type === 'add') {
    loading = false;
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

  return {
    pricing,
    customer,
    carrier,
    service,
    saleman,
    approvedBy,
    currentUser,
    initialValues,
    disableApprovalStatus,
    disableApprovalBy,
    loading
  }
}

export default connect(mapStateToProps, {
  getCustomerSpecialList,
  getCarrierSpecialList,
  getServiceSpecialList,
  getSalemanSpecialList,
  getApprovedBySpecialList
})(reduxForm({ 
  form: 'pricing_special_action_form', 
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate
})(injectIntl(ActionForm)));