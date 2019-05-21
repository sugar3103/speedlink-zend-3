import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCustomerDomesticList,
  getCarrierDomesticList,
  getServiceDomesticList,
  getSalemanDomesticList,
  getApprovedByDomesticList
} from '../../../redux/actions';
import { categoryPricing } from '../../../constants/defaultValues';
import renderSelectField from '../../../containers/Shared/form/Select';
import renderDatePickerField from '../../../containers/Shared/form/DatePicker';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showCustomerField: false
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
    this.props.change('customer_id', '');
    if (value) {
      this.setState({ showCustomerField: true });
    } else {
      this.setState({ showCustomerField: false });
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

    const paramsUser = {
      field: ['id', 'username'],
      offset: {
        limit: 0
      }
    };
    this.props.getSalemanDomesticList(paramsUser);
    this.props.getApprovedByDomesticList(paramsUser);
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
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.customer']}</span>
              <div className="form__form-group-field">
                <Field
                  name="customer_id"
                  component={renderSelectField}
                  options={customer.items && this.showOptionCustomer(customer.items)}
                  disabled={!this.state.showCustomerField}
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
        </Row>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.carrier']}</span>
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
              <span className="form__form-group-label">{messages['pri_dom.service']}</span>
              <div className="form__form-group-field">
                <Field
                  name="service_id"
                  component={renderSelectField}
                  options={service.items && this.showOptions(service.items)}
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
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.saleman']}</span>
              <div className="form__form-group-field">
                <Field
                  name="calculate_unit"
                  component={renderSelectField}
                  options={saleman.items && this.showOptionUser(saleman.items)}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.effected-date']}</span>
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
              <span className="form__form-group-label">{messages['pri_dom.expired-date']}</span>
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
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.approved-by']}</span>
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
  getCustomerDomesticList: PropTypes.func.isRequired,
  getCarrierDomesticList: PropTypes.func.isRequired,
  getServiceDomesticList: PropTypes.func.isRequired,
  getSalemanDomesticList: PropTypes.func.isRequired,
  getApprovedByDomesticList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  const { pricingDomestic } = state;
  const { customer, carrier, service, saleman, approvedBy } = pricingDomestic;
  return {
    customer,
    carrier,
    service,
    saleman,
    approvedBy
  }
}

export default connect(mapStateToProps, {
  getCustomerDomesticList,
  getCarrierDomesticList,
  getServiceDomesticList,
  getSalemanDomesticList,
  getApprovedByDomesticList
})(reduxForm({ 
  form: 'pricing_domestic_search_form'
})(injectIntl(SearchForm)));