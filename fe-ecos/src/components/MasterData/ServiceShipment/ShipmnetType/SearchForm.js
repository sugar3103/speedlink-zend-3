import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getShipmentTypeCodeList, getCarrierCodeList, getServiceCodeList } from "../../../../redux/actions";

class SearchForm extends Component {

  componentDidMount() {
    this.props.getShipmentTypeCodeList();
    this.props.getCarrierCodeList();
    this.props.getServiceCodeList();
  }

  showOptionShipmentType = (items, locale) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.code,
          label: item.code
        }
      })
    }
    return result;
  }

  showOption = (items, locale) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: (locale === 'en-US') ? item.code + ' - ' + item.name_en : item.code + ' - ' + item.name
        }
      })
    }
    return result;
  }

  render() {
    const { handleSubmit, reset, shipmentTypeCode, carrierCode, serviceCode } = this.props;
    const { messages, locale } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.code']}</span>
            <div className="form__form-group-field">
              <Field name="code" component={renderSelectField} type="text"
                options={shipmentTypeCode && this.showOptionShipmentType(shipmentTypeCode, locale)} />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['name']}</span>
            <div className="form__form-group-field">
              <Field component="input" type="text" placeholder={messages['name']}
                name={locale === 'en-US' ? 'name_en' : 'name'} />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['status']}</span>
            <div className="form__form-group-field">
              <Field name="status" component={renderSelectField} options={[
                { value: -1, label: messages['all'] },
                { value: 1, label: messages['active'] },
                { value: 0, label: messages['inactive'] }
              ]}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.category_code']}</span>
            <div className="form__form-group-field">
              <Field name="category_code" component={renderSelectField} type="text" options={[
                { value: -1, label: messages['all'] },
                { value: "inbound", label: messages['shipment_type.inbound'] },
                { value: "outbound", label: messages['shipment_type.outbound'] },
                { value: "domestic", label: messages['shipment_type.domestic'] },
              ]}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.product_type_code']}</span>
            <div className="form__form-group-field">
              <Field name="product_type_code" component={renderSelectField} type="text" options={[
                { value: -1, label: messages['all'] },
                { value: "dox", label: messages['shipment_type.dox'] },
                { value: "parcel", label: messages['shipment_type.parcel'] }
              ]}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.carrier_code']}</span>
            <div className="form__form-group-field">
              <Field name="carrier_code" component={renderSelectField} type="text"
                options={carrierCode && this.showOption(carrierCode, locale)} />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.service_code']}</span>
            <div className="form__form-group-field">
              <Field name="service_code" component={renderSelectField} type="text"
                options={serviceCode && this.showOption(serviceCode, locale)} />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="form__form-group">
            <span className="form__form-group-label"></span>
            <div className="form__form-group-field">
              <div className="search-group-button">
                <Button size="sm" outline onClick={(e) => {
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
            </div>
          </div>
        </Col>
      </form>
    );
  }
}

SearchForm.propTypes = {
  shipmentTypeCode: PropTypes.array,
  getShipmentTypeCodeList: PropTypes.func.isRequired,
  carrierCode: PropTypes.array,
  getCarrierCodeList: PropTypes.func.isRequired,
  serviceCode: PropTypes.array,
  getServiceCodeList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

const mapStateToProps = ({ shipment_type, carrier, service }) => {
  const shipmentTypeCode = shipment_type.codes;
  const carrierCode = carrier.codes;
  const serviceCode = service.codes;
  return { shipmentTypeCode, carrierCode, serviceCode }
}

export default reduxForm({
  form: 'shipment_type_search_form',
  initialValues: {
    name: '',
    status: -1,
    category_code: -1,
    product_type_code: -1,
  }
})(injectIntl(connect(mapStateToProps, {
  getShipmentTypeCodeList,
  getCarrierCodeList,
  getServiceCodeList,
})(SearchForm)));