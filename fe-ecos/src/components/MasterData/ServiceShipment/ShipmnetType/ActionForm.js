import React, { Component } from 'react';
import {Button, ButtonToolbar } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getCarrierCodeList, getServiceCodeList, toggleShipmentTypeModal } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import renderSelectField from "../../../../containers/Shared/form/Select";

class ActionForm extends Component {
  componentDidMount() {
    const data = this.props.modalData;
    if (data) {
      this.props.initialize(data);
    }
  }

  toggleModal = () => {
    this.props.toggleShipmentTypeModal();
    this.props.getCarrierCodeList();
    this.props.getServiceCodeList();
  };

  showOption = (items) => {
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

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData, carrierCode, serviceCode } = this.props;
    const className = modalData ? 'primary' : 'success';
    const title = modalData ? messages['shipment_type.update'] : messages['shipment_type.add-new'];
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.code']}</span>
            <div className="form__form-group-field">
              <Field name="code" component={CustomField} type="text"
                     placeholder={messages['shipment_type.code']} messages={messages} />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.name']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field name="name" component={CustomField} type="text"
                     placeholder={messages['shipment_type.name']} messages={messages} />
            </div>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag us"></div>
              </div>
              <Field name="name_en" component={CustomField} type="text"
                     placeholder={messages['shipment_type.name-en']} messages={messages} />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.category_code']}</span>
            <div className="form__form-group-field">
              <Field name="category_code" component={renderSelectField} type="text" messages={messages} options={[
                { value: "Inbound", label: messages['shipment_type.inbound'] },
                { value: "Outbound", label: messages['shipment_type.outbound'] },
                { value: "Domestic", label: messages['shipment_type.domestic'] },
              ]}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.product_type_code']}</span>
            <div className="form__form-group-field">
              <Field name="product_type_code" component={renderSelectField} type="text" messages={messages} options={[
                { value: "Dox", label: messages['shipment_type.dox'] },
                { value: "Parcel", label: messages['shipment_type.parcel'] }
              ]}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.carrier_code']}</span>
            <div className="form__form-group-field">
              <Field name="carrier_id" component={renderSelectField} type="text"
                     options={carrierCode && this.showOption(carrierCode)} messages={messages}/>
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.service_code']}</span>
            <div className="form__form-group-field">
              <Field name="service_id" component={renderSelectField} type="text"
                     options={serviceCode && this.showOption(serviceCode)} messages={messages}/>
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.volumetric_number']}</span>
            <div className="form__form-group-field">
              <Field name="volumetric_number" component={CustomField} type="text"
                     placeholder={messages['shipment_type.volumetric_number']} messages={messages} />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.desc']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field name="description" component="textarea" type="text" placeholder={messages['shipment_type.desc']} />
            </div>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag us"></div>
              </div>
              <Field name="description_en" component="textarea" type="text" placeholder={messages['shipment_type.desc-en']} />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['shipment_type.status']}</span>
            <div className="form__form-group-field">
              <Field name="status" component={renderRadioButtonField} label={messages['active']} radioValue={1} defaultChecked />
              <Field name="status" component={renderRadioButtonField} label={messages['inactive']} radioValue={0} />
            </div>
          </div>
          {modalData &&
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['shipment_type.created-by']}</span>
              <div className="form__form-group-field">
                <Field name="created_by" component="input" type="text" disabled
                       placeholder={messages['shipment_type.created-by']} messages={messages}/>
              </div>
            </div>
          }
          {modalData &&
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['shipment_type.created-at']}</span>
              <div className="form__form-group-field">
                <Field name="created_at" component="input" type="text" disabled
                       placeholder={messages['shipment_type.created-at']} messages={messages}/>
              </div>
            </div>
          }
          {modalData &&
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['shipment_type.updated-by']}</span>
              <div className="form__form-group-field">
                <Field name="updated_by" component="input" type="text" disabled
                       placeholder={messages['shipment_type.updated-by']} messages={messages}/>
              </div>
            </div>
          }
          {modalData &&
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['shipment_type.updated-at']}</span>
              <div className="form__form-group-field">
                <Field name="updated_at" component="input" type="text" disabled
                       placeholder={messages['shipment_type.updated-at']} messages={messages}/>
              </div>
            </div>
          }
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['cancel']}</Button>{' '}
          <Button color={className} type="submit">{messages['save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

ActionForm.propTypes = {
  modalData: PropTypes.object,
  carrierCode: PropTypes.array,
  getCarrierCodeList: PropTypes.func.isRequired,
  serviceCode: PropTypes.array,
  getServiceCodeList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleShipmentTypeModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ shipment_type, carrier, service }) => {
  const { modalData } = shipment_type;
  const carrierCode = carrier.codes;
  const serviceCode = service.codes;
  return { modalData, carrierCode, serviceCode };
};

export default reduxForm({
  form: 'shipment_type_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleShipmentTypeModal,
  getCarrierCodeList,
  getServiceCodeList,
})(ActionForm)));