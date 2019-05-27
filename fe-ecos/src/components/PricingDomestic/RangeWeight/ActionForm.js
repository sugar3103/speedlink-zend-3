import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCarrierDomesticList,
  getServiceDomesticList,
  getShipmentTypeDomesticList,
  getZoneDomesticList,
  requestUpdateRangeWeightDomesticItem
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
      showUnitField: false
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

  onChangeCarrier = value => {
    let paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: { limit: 0 },
      query: { category_id: 3, carrier_id: value }
    }
    if (this.props.service_id) {
      paramsST.query = { ...paramsST.query, service_id: this.props.service_id };
    }
    this.props.getShipmentTypeDomesticList(paramsST);
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
    this.props.getShipmentTypeDomesticList(paramsST);
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
    this.props.getCarrierDomesticList(params);
    this.props.getServiceDomesticList(params);
    this.props.getZoneDomesticList(params);

    const paramsST = {
      field: ['id', 'name', 'name_en', 'carrier_id', 'service_id'],
      offset: {
        limit: 0
      },
      query: { category_id: 3 }
    }
    this.props.getShipmentTypeDomesticList(paramsST);

    const { id } = this.props.match.params;
    if (id) {
      this.props.requestUpdateRangeWeightDomesticItem({ query: { id: id }} )
    } else {
      this.props.initialize();
    }
  }

  componentDidMount() {
    this.props.change('category_id', 3);
  }

  render() {
    const { handleSubmit, carrier, service, shipmentType, zone, rangeWeight: { loading } } = this.props;
    const { messages } = this.props.intl;
    return loading ? (
      <ReactLoading type="bubbles" className="loading" /> 
    ) : (
      <form className="form form_custom" onSubmit={handleSubmit}>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.name']}</span>
              <div className="form__form-group-field">
                <Field
                  name='name'
                  component={CustomField}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.name-en']}</span>
              <div className="form__form-group-field">
                <Field
                  name='name_en'
                  component={CustomField}
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
                  onChange={this.onChangeCarrier}
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
                  onChange={this.onChangeService}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.shipment-type']}</span>
              <div className="form__form-group-field">
                <Field
                  name="shipment_type_id"
                  component={renderSelectField}
                  options={shipmentType.items && this.showOptions(shipmentType.items)}
                  onChange={this.onChangeShipmentType}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.zone']}</span>
              <div className="form__form-group-field">
                <Field
                  name="zone_id"
                  component={renderSelectField}
                  options={zone.items && this.showOptions(zone.items)}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.from']}</span>
              <div className="form__form-group-field">
                <Field
                  name="from"
                  component={CustomField}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.to']}</span>
              <div className="form__form-group-field">
                <Field
                  name="to"
                  component={CustomField}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.calculate-unit']}</span>
              <div className="form__form-group-field">
                <Field
                  name="calculate_unit"
                  component={renderSelectField}
                  options={[
                    { value: 1, label: messages['pri_dom.yes'] },
                    { value: 0, label: messages['pri_dom.no'] }
                  ]}
                  onChange={this.onChangeCalculateUnit}
                />
              </div>
            </div>
          </Col>
          {this.state.showUnitField &&
            <Col md={6} lg={3} xl={3} xs={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_dom.unit']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="unit"
                    component={CustomField}
                  />
                </div>
              </div>
            </Col>
          }
        </Row>
        <Row>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.ras']}</span>
              <div className="form__form-group-field">
                <Field
                  name="is_ras"
                  component={renderSelectField}
                  options={[
                    { value: 1, label: messages['pri_dom.on'] },
                    { value: 0, label: messages['pri_dom.off'] }
                  ]}
                />
              </div>
            </div>
          </Col>
          <Col md={6} lg={3} xl={3} xs={6}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['pri_dom.round-up']}</span>
              <div className="form__form-group-field">
                <Field
                  name="round_up"
                  component={CustomField}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-right">
            <Link to="/pricing-domestic/range-weight" className="btn btn-outline-secondary btn-sm">
              {messages['cancel']}
            </Link>
            <Button size="sm" color="primary">
              {messages['save']}
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

ActionForm.propTypes = {
  getCarrierDomesticList: PropTypes.func.isRequired,
  getServiceDomesticList: PropTypes.func.isRequired,
  getShipmentTypeDomesticList: PropTypes.func.isRequired,
  getZoneDomesticList: PropTypes.func.isRequired,
  requestUpdateRangeWeightDomesticItem: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => {
  const { pricingDomestic } = state;
  const { carrier, service, shipmentType, zone, rangeWeight } = pricingDomestic;
  const selector = formValueSelector('range_weight_domestic_action_form');
  const carrier_id = selector(state, 'carrier_id');
  const service_id = selector(state, 'service_id');
  const initialValues = rangeWeight.itemEditting;
  return {
    carrier,
    service,
    shipmentType,
    zone,
    carrier_id,
    service_id,
    rangeWeight,
    initialValues,
  }
}

export default connect(mapStateToProps, {
  getCarrierDomesticList,
  getServiceDomesticList,
  getShipmentTypeDomesticList,
  getZoneDomesticList,
  requestUpdateRangeWeightDomesticItem
})(reduxForm({ 
  form: 'range_weight_domestic_action_form', 
  enableReinitialize: true,
  validate
})(withRouter(injectIntl(ActionForm))));