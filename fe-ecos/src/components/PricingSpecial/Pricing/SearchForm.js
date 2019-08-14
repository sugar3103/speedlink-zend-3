import React, { Component } from 'react';
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

class SearchForm extends Component {

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
    this.props.change('category_id', 3);
  }

  resetFilter = async () => {
    const { handleSubmit, reset, change } = this.props
    await reset();
    change('category_id', 3);
    handleSubmit();
  }

  render() {
    const { handleSubmit, customer, carrier, service, saleman, approvedBy } = this.props;
    const { messages } = this.props.intl;
    return (
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
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_special.effected-date']}</span>
              <div className="form__form-group-field">
                <Field
                  name="effected_date"
                  component={renderDatePickerField}
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
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
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
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
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
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-right">
            <Button size="sm" outline onClick={this.resetFilter}>
              {messages['clear']}</Button>
            <Button size="sm" color="primary" id="search" >
              {messages['search']}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

SearchForm.propTypes = {
  getCustomerSpecialList: PropTypes.func.isRequired,
  getCarrierSpecialList: PropTypes.func.isRequired,
  getServiceSpecialList: PropTypes.func.isRequired,
  getSalemanSpecialList: PropTypes.func.isRequired,
  getApprovedBySpecialList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  const { pricingSpecial } = state;
  const { customer, carrier, service, saleman, approvedBy } = pricingSpecial;
  return {
    customer,
    carrier,
    service,
    saleman,
    approvedBy
  }
}

export default connect(mapStateToProps, {
  getCustomerSpecialList,
  getCarrierSpecialList,
  getServiceSpecialList,
  getSalemanSpecialList,
  getApprovedBySpecialList
})(reduxForm({
  form: 'pricing_special_search_form'
})(injectIntl(SearchForm)));