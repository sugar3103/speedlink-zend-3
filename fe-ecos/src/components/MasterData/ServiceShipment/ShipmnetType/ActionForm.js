import React, { Component, Fragment } from 'react';
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getCarrierCodeList, getServiceCodeList, toggleShipmentTypeModal, changeTypeShipmentTypeModal } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import renderSelectField from "../../../../containers/Shared/form/Select";
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../../constants/defaultValues';
import Moment from 'react-moment';
import Can from '../../../../containers/Shared/Can';
class ActionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalType: ''
    }
  }

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

  changeTypeModal = () => {
    this.props.changeTypeShipmentTypeModal(MODAL_VIEW);
  }

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
    const { messages, locale } = this.props.intl;
    const { handleSubmit, modalData, modalType, carrierCode, serviceCode } = this.props;
    let className = 'success';
    let title = messages['status.add-new'];
    const disabled = modalType === MODAL_VIEW ? true : false;
    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        title = messages['carrier.add-new'];
        break;
      case MODAL_EDIT:
        className = 'primary';
        title = messages['carrier.update'];
        break;
      case MODAL_VIEW:
        className = 'info';
        title = messages['carrier.view'];
        break;
      default:
        break;
    }

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          <Row>
            <Col md={12} lg={6} xl={6} xs={12}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['shipment_type.code']}</span>
                <div className="form__form-group-field">
                  <Field name="code" component={CustomField} type="text"
                    placeholder={messages['shipment_type.code']} disabled={disabled} />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['name']}</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <div className="flag vn"></div>
                  </div>
                  <Field name="name" component={CustomField} type="text"
                    placeholder={messages['name']} disabled={disabled} />
                </div>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <div className="flag us"></div>
                  </div>
                  <Field name="name_en" component={CustomField} type="text"
                    placeholder={messages['name']} disabled={disabled} />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['description']}</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <div className="flag vn"></div>
                  </div>
                  <Field name="description" component="textarea" type="text" placeholder={messages['description']} disabled={disabled} />
                </div>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <div className="flag us"></div>
                  </div>
                  <Field name="description_en" component="textarea" type="text" placeholder={messages['description']} disabled={disabled} />
                </div>
              </div>
            </Col>

            <Col md={12} lg={6} xl={6} xs={12}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['shipment_type.category_code']}</span>
                <div className="form__form-group-field">
                  <Field name="category_code" component={renderSelectField} type="text" disabled={disabled} options={[
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
                  <Field name="product_type_code" component={renderSelectField} type="text" disabled={disabled} options={[
                    { value: 0, label: messages['shipment_type.dox'] },
                    { value: 1, label: messages['shipment_type.parcel'] }
                  ]}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['shipment_type.carrier_code']}</span>
                <div className="form__form-group-field">
                  <Field name="carrier_id" component={renderSelectField} type="text"
                    options={carrierCode && this.showOption(carrierCode)} disabled={disabled} />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['shipment_type.service_code']}</span>
                <div className="form__form-group-field">
                  <Field name="service_id" component={renderSelectField} type="text"
                    options={serviceCode && this.showOption(serviceCode)} disabled={disabled} />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['shipment_type.volumetric_number']}</span>
                <div className="form__form-group-field">
                  <Field name="volumetric_number" component={CustomField} type="text"
                    placeholder={messages['shipment_type.volumetric_number']} disabled={disabled} />
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">{messages['status']}</span>
                <div className="form__form-group-field">
                  <Field name="status" component={renderRadioButtonField} label={messages['active']} radioValue={1} defaultChecked disabled={disabled} />
                  <Field name="status" component={renderRadioButtonField} label={messages['inactive']} radioValue={0} disabled={disabled} />
                </div>
              </div>
            </Col>
          </Row>
          <div className="footer">
            {modalData &&
              <Fragment>
                <hr />
                <Row>
                  <Col md={6}>
                    <span><i className="label-info-data">{messages['created-by']}:</i>{modalData.full_name_created ? modalData.full_name_created : modalData.created_by}</span>
                    <br />
                    <span><i className="label-info-data">{messages['created-at']}:</i>
                      <Moment fromNow locale={locale}>{new Date(modalData.created_at)}</Moment>
                    </span>
                  </Col>
                  {modalData.updated_at &&
                    <Col md={6}>
                      <span><i className="label-info-data">{messages['updated-by']}:</i>{(modalData.full_name_updated !== " ") ? modalData.full_name_updated : modalData.updated_by}</span>
                      <br />
                      <span><i className="label-info-data">{messages['updated-at']}:</i>
                        <Moment fromNow locale={locale}>{new Date(modalData.updated_at)}</Moment>
                      </span>
                    </Col>
                  }
                </Row>
              </Fragment>
            }
          </div>


        </div>
        <ButtonToolbar className="modal__footer">
          {this.state.modalType === MODAL_VIEW &&
            <Button outline onClick={this.toggleModal}>{messages['cancel']}</Button>
          }
          <Can user={this.props.authUser.user} permission="shipment_type" action="edit" own={modalData && modalData.created_by}>
            <Button color={className} type="submit">{modalType === MODAL_VIEW ? messages['edit'] : messages['save']}</Button>
          </Can>
        </ButtonToolbar>
      </form>
    );
  }
}

ActionForm.propTypes = {
  modalData: PropTypes.object,
  modalType: PropTypes.string,
  carrierCode: PropTypes.array,
  getCarrierCodeList: PropTypes.func.isRequired,
  serviceCode: PropTypes.array,
  getServiceCodeList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleShipmentTypeModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ shipment_type, carrier, service, authUser }) => {
  const { modalData, modalType } = shipment_type;
  const carrierCode = carrier.codes;
  const serviceCode = service.codes;
  return { modalData, modalType, carrierCode, serviceCode, authUser };
};

export default reduxForm({
  form: 'shipment_type_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleShipmentTypeModal,
  getCarrierCodeList,
  getServiceCodeList,
  changeTypeShipmentTypeModal
})(ActionForm)));