import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCustomerInternationalList,
  getCarrierInternationalList,
  getServiceInternationalList,
  getShipmentTypeInternationalList,
  requestUpdateRangeWeightInternationalItem
} from '../../../redux/actions';
import { categoryPricing } from '../../../constants/defaultValues';
import renderSelectField from '../../../containers/Shared/form/Select';
import CustomField from '../../../containers/Shared/form/CustomField';
import validate from './validateActionForm';
import ReactLoading from 'react-loading';

class ActionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showUnitField: false,
      disableField: true,
      disableCustomerField: true
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

  onChangeIsPrivate = value => {
    this.props.change('customer_id', '');
    this.setState({ disableCustomerField: value ? false : true });
  }

  onChangeCategory = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'category_id', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: value }
    }
    if (this.props.service_id) {
      paramsST.query = { ...paramsST.query, service_id: this.props.service_id };
    }
    if (this.props.carrier_id) {
      paramsST.query = { ...paramsST.query, carrier_id: this.props.carrier_id };
    }
    this.props.getShipmentTypeInternationalList(paramsST);
  }

  onChangeCarrier = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'category_id', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: this.props.category_id, carrier_id: value }
    }
    if (this.props.service_id) {
      paramsST.query = { ...paramsST.query, service_id: this.props.service_id };
    }
    this.props.getShipmentTypeInternationalList(paramsST);
  }

  onChangeService = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'category_id', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: this.props.category_id, service_id: value }
    }
    if (this.props.carrier_id) {
      paramsST.query = { ...paramsST.query, carrier_id: this.props.carrier_id };
    }
    this.props.getShipmentTypeInternationalList(paramsST);
  }

  onChangeShipmentType = value => {
    const listST = this.props.shipmentType.items;
    if (listST.length > 0) {
      const ST = listST.find(item => item.id === value);
      if (ST) {
        this.props.change('category_id', ST.category_id);
        this.props.change('carrier_id', ST.carrier_id);
        this.props.change('service_id', ST.service_id);
      }
    }
  }

  onChangeCalculateUnit = value => {
    this.setState({ showUnitField: value ? true : false })
  }

  componentWillMount() {
    const params = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      }
    };
    this.props.getCustomerInternationalList(params);
    this.props.getCarrierInternationalList(params);
    this.props.getServiceInternationalList(params);

    const paramsST = {
      field: ['id', 'name', 'name_en', 'category_id', 'carrier_id', 'service_id'],
      offset: {
        limit: 0
      },
    }
    this.props.getShipmentTypeInternationalList(paramsST);

    const { id } = this.props.match.params;
    if (id) {
      this.props.requestUpdateRangeWeightInternationalItem({ query: { id: id } })
    } else {
      this.props.initialize();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      disableField: nextProps.type_action === 'view' ? true : false,
      showUnitField: nextProps.calculate_unit ? true : false,
      disableCustomerField: nextProps.is_private ? false : true
    })
  }

  render() {
    const { handleSubmit, customer, carrier, service, shipmentType, rangeWeight: { loading }, type_action } = this.props;
    const { messages } = this.props.intl;
    const { id } = this.props.match.params;
    const { disableField, disableCustomerField } = this.state;

    return loading ? (
      <ReactLoading type="bubbles" className="loading" />
    ) : (
        <form className="form form_custom" onSubmit={handleSubmit}>
          <Row>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.type']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="is_private"
                    component={renderSelectField}
                    options={[
                      { value: 0, label: messages['pri_int.public'] },
                      { value: 1, label: messages['pri_int.customer'] }
                    ]}
                    onChange={this.onChangeIsPrivate}
                    clearable={false}
                    disabled={disableField}
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
                    disabled={disableCustomerField || disableField}
                    clearable={false}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.name']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="name"
                    component={CustomField}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.name-en']}</span>
                <div className="form__form-group-field">
                  <Field
                    name='name_en'
                    component={CustomField}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={6} xl={6} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.desc']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="description"
                    component="textarea"
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={6} xl={6} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.desc-en']}</span>
                <div className="form__form-group-field">
                  <Field
                    name='description_en'
                    component="textarea"
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.category']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="category_id"
                    component={renderSelectField}
                    options={this.showOptionsCategory()}
                    onChange={this.onChangeCategory}
                    clearable={false}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.carrier']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="carrier_id"
                    component={renderSelectField}
                    options={carrier.items && this.showOptions(carrier.items)}
                    onChange={this.onChangeCarrier}
                    clearable={false}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.service']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="service_id"
                    component={renderSelectField}
                    options={service.items && this.showOptions(service.items)}
                    onChange={this.onChangeService}
                    clearable={false}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.shipment-type']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="shipment_type_id"
                    component={renderSelectField}
                    options={shipmentType.items && this.showOptions(shipmentType.items)}
                    onChange={this.onChangeShipmentType}
                    clearable={false}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.status']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="status"
                    component={renderSelectField}
                    options={[
                      { value: 1, label: messages['pri_int.active'] },
                      { value: 0, label: messages['pri_int.inactive'] }
                    ]}
                    clearable={false}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.from']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="from"
                    component={CustomField}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.to']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="to"
                    component={CustomField}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.round-up']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="round_up"
                    component={CustomField}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_int.calculate-unit']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="calculate_unit"
                    component={renderSelectField}
                    options={[
                      { value: 1, label: messages['pri_int.yes'] },
                      { value: 0, label: messages['pri_int.no'] }
                    ]}
                    onChange={this.onChangeCalculateUnit}
                    clearable={false}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            {this.state.showUnitField &&
              <Col md={6} lg={3} xl={3} xs={6}>
                <div className="form__form-group">
                  <span className="form__form-group-label">{messages['pri_int.unit']}</span>
                  <div className="form__form-group-field">
                    <Field
                      name="unit"
                      component={CustomField}
                      disabled={disableField}
                    />
                  </div>
                </div>
              </Col>
            }
          </Row>
          <Row>
            <Col md={12} className="text-right">
              <Link to={type_action === 'edit' ? `/pricing-international/range-weight/view/${id}` : '/pricing-international/range-weight'} className="btn btn-outline-secondary btn-sm">
                {messages['cancel']}
              </Link>
              {disableField ?
                <Link to={`/pricing-international/range-weight/edit/${id}`} className="btn btn-info btn-sm">
                  {messages['edit']}
                </Link>
                :
                <Button size="sm" color="primary">
                  {messages['save']}
                </Button>
              }
            </Col>
          </Row>
        </form>
      );
  }
}

ActionForm.propTypes = {
  getCustomerInternationalList: PropTypes.func.isRequired,
  getCarrierInternationalList: PropTypes.func.isRequired,
  getServiceInternationalList: PropTypes.func.isRequired,
  getShipmentTypeInternationalList: PropTypes.func.isRequired,
  requestUpdateRangeWeightInternationalItem: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  const { pricingInternational } = state;
  const { customer, carrier, service, shipmentType, rangeWeight } = pricingInternational;
  const selector = formValueSelector('range_weight_international_action_form');
  const carrier_id = selector(state, 'carrier_id');
  const service_id = selector(state, 'service_id');
  const calculate_unit = selector(state, 'calculate_unit');
  const is_private = selector(state, 'is_private');
  const initialValues = rangeWeight.itemEditting;
  return {
    customer,
    carrier,
    service,
    shipmentType,
    carrier_id,
    service_id,
    calculate_unit,
    rangeWeight,
    is_private,
    initialValues,
  }
}

export default connect(mapStateToProps, {
  getCustomerInternationalList,
  getCarrierInternationalList,
  getServiceInternationalList,
  getShipmentTypeInternationalList,
  requestUpdateRangeWeightInternationalItem
})(reduxForm({
  form: 'range_weight_international_action_form',
  enableReinitialize: true,
  validate
})(withRouter(injectIntl(ActionForm))));