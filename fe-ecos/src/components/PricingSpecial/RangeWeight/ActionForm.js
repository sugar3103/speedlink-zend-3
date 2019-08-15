import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCarrierSpecialList,
  getCustomerSpecialList,
  getServiceSpecialList,
  getShipmentTypeSpecialList,
  getAreaSpecialList,
  requestUpdateRangeWeightSpecialItem
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
      disableField: true
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

  onChangeCustomer = value => {
    const params = {
      field: ['id', 'name'],
      offset: { limit: 0 },
      query: { customer_id: value }
    }
    this.props.getAreaSpecialList(params);
  }

  onChangeArea = value => {
    const listArea = this.props.area.items;
    if (listArea.length > 0) {
      const area = listArea.find(item => item.id === value);
      if (area) {
        this.props.change('customer_id', area.customer_id);
      }
    }
  }

  onChangeCarrier = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: 3, carrier_id: value }
    }
    if (this.props.service_id) {
      paramsST.query = { ...paramsST.query, service_id: this.props.service_id };
    }
    this.props.getShipmentTypeSpecialList(paramsST);
  }

  onChangeService = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: 3, service_id: value }
    }
    if (this.props.carrier_id) {
      paramsST.query = { ...paramsST.query, carrier_id: this.props.carrier_id };
    }
    this.props.getShipmentTypeSpecialList(paramsST);
  }

  onChangeShipmentType = value => {
    const listST = this.props.shipmentType.items;
    if (listST.length > 0) {
      const ST = listST.find(item => item.id === value);
      if (ST) {
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
    this.props.getCarrierSpecialList(params);
    this.props.getServiceSpecialList(params);
    this.props.getCustomerSpecialList(params);

    const paramsArea = {
      field: ['id', 'name', 'customer_id'],
      offset: {
        limit: 0
      }
    }
    this.props.getAreaSpecialList(paramsArea);

    const paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: {
        limit: 0
      },
      query: { category_id: 3 }
    }
    this.props.getShipmentTypeSpecialList(paramsST);

    const { id } = this.props.match.params;
    if (id) {
      this.props.requestUpdateRangeWeightSpecialItem({ query: { id: id } })
    } else {
      this.props.initialize();
    }
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

  showOptionsArea = items => {
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

  componentDidMount() {
    this.props.change('category_id', 3);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      disableField: nextProps.type_action === 'view' ? true : false,
      showUnitField: nextProps.calculate_unit ? true : false
    })
  }

  render() {
    const { handleSubmit, carrier, service, customer,shipmentType, area, rangeWeight: { loading }, type_action } = this.props;
    const { messages } = this.props.intl;
    const { id } = this.props.match.params;
    const { disableField } = this.state;    
    return loading ? (
      <ReactLoading type="bubbles" className="loading" />
    ) : (
        <form className="form form_custom" onSubmit={handleSubmit}>
          <Row>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.name']}</span>
                <div className="form__form-group-field">
                  <Field
                    name='name'
                    component={CustomField}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.name-en']}</span>
                <div className="form__form-group-field">
                  <Field
                    name='name_en'
                    component={CustomField}
                    disabled={disableField}
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
                <span className="form__form-group-label">{messages['pri_special.customer']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="customer_id"
                    component={renderSelectField}
                    options={customer.items && this.showOptionCustomer(customer.items)}
                    onChange={this.onChangeCustomer}
                    disabled={disableField}
                    clearable={false}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.area']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="special_area_id"
                    component={renderSelectField}
                    options={area.items && this.showOptionsArea(area.items)}
                    onChange={this.onChangeArea}
                    clearable={false}
                    disabled={disableField}
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
                    onChange={this.onChangeCarrier}
                    clearable={false}
                    disabled={disableField}
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
                    onChange={this.onChangeService}
                    clearable={false}
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.shipment-type']}</span>
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
                    disabled={disableField}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.from']}</span>
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
                <span className="form__form-group-label">{messages['pri_special.to']}</span>
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
                <span className="form__form-group-label">{messages['pri_special.round-up']}</span>
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
                <span className="form__form-group-label">{messages['pri_special.calculate-unit']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="calculate_unit"
                    component={renderSelectField}
                    options={[
                      { value: 1, label: messages['pri_special.yes'] },
                      { value: 0, label: messages['pri_special.no'] }
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
                  <span className="form__form-group-label">{messages['pri_special.unit']}</span>
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
              <Link to={type_action === 'edit' ? `/pricing-special/range-weight/view/${id}` : '/pricing-special/range-weight'} className="btn btn-outline-secondary btn-sm">
                {messages['cancel']}
              </Link>
              {disableField ?
                <Link to={`/pricing-special/range-weight/edit/${id}`} className="btn btn-info btn-sm">
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
  getCarrierSpecialList: PropTypes.func.isRequired,
  getServiceSpecialList: PropTypes.func.isRequired,
  getShipmentTypeSpecialList: PropTypes.func.isRequired,
  getAreaSpecialList: PropTypes.func.isRequired,
  requestUpdateRangeWeightSpecialItem: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  const { pricingSpecial } = state;
  const { carrier, service, shipmentType, area, rangeWeight,customer } = pricingSpecial;
  const selector = formValueSelector('range_weight_special_action_form');
  const carrier_id = selector(state, 'carrier_id');
  const service_id = selector(state, 'service_id');
  const calculate_unit = selector(state, 'calculate_unit');
  const initialValues = rangeWeight.itemEditting;

  return {
    carrier,
    service,
    shipmentType,
    area,
    carrier_id,
    service_id,
    calculate_unit,
    rangeWeight,
    customer,
    initialValues
  }
}

export default connect(mapStateToProps, {
  getCarrierSpecialList,
  getCustomerSpecialList,
  getServiceSpecialList,
  getShipmentTypeSpecialList,
  getAreaSpecialList,
  requestUpdateRangeWeightSpecialItem
})(reduxForm({
  form: 'range_weight_special_action_form',
  enableReinitialize: true,
  validate
})(withRouter(injectIntl(ActionForm))));