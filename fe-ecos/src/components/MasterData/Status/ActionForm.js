import React, { Component, Fragment } from 'react';
import { Button, ButtonToolbar, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleStatusModal, changeTypeStatusModal } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import Can from '../../../containers/Shared/Can';
import renderRadioButtonField from '../../../containers/Shared/form/RadioButton';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_VIEW, MODAL_EDIT } from '../../../constants/defaultValues';
import Moment from 'react-moment';


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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.modalType !== this.props.modalType) {
      this.setState({
        modalType: prevProps.modalType
      });
    }

  }

  toggleModal = () => {
    this.props.toggleStatusModal();
  }

  changeTypeModal = () => {
    this.props.changeTypeStatusModal(MODAL_VIEW);
  }

  render() {
    const { messages, locale } = this.props.intl;
    const { handleSubmit, modalType, modalData } = this.props;
    let className = 'success';
    let title = messages['status.add-new'];
    const disabled = modalType === MODAL_VIEW ? true : false;
    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        title = messages['status.add-new'];
        break;
      case MODAL_EDIT:
        className = 'primary';
        title = messages['status.update'];
        break;
      case MODAL_VIEW:
        className = 'info';
        title = messages['status.view'];
        break;
      default:
        break;
    }

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <button className="lnr lnr-cross modal__close-btn" onClick={this.toggleModal} />
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['name']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field
                name="name"
                component={CustomField}
                type="text"
                placeholder={messages['name']}
                disabled={disabled}
              />
            </div>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag us"></div>
              </div>
              <Field
                name="name_en"
                component={CustomField}
                type="text"
                placeholder={messages['name']}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['description']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field
                name="description"
                component="textarea"
                type="text"
                placeholder={messages['description']}
                disabled={disabled}
              />
            </div>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag us"></div>
              </div>
              <Field
                name="description_en"
                component="textarea"
                type="text"
                placeholder={messages['description']}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label radio-button-group">{messages['status']}</span>
            <Field
              name="status"
              component={renderRadioButtonField}
              label={messages['active']}
              radioValue={1}
              defaultChecked
              disabled={disabled}
            />
            <Field
              name="status"
              component={renderRadioButtonField}
              label={messages['inactive']}
              radioValue={0}
              disabled={disabled}
            />
          </div>
          <div className="footer">
            {modalData &&
              <Fragment>
                <hr />
                <Row>
                  <Col md={6}>
                    <span><i className="label-info-data">{messages['created-by']}:</i>{(modalData.full_name_created !== " ") ? modalData.full_name_created : modalData.created_by}</span>
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
            <Button outline onClick={this.changeTypeModal}>{messages['cancel']}</Button>
          }
          <Can user={this.props.authUser.user} permission="status" action="edit" own={modalData && modalData.created_by}>
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
  handleSubmit: PropTypes.func.isRequired,
  toggleStatusModal: PropTypes.func.isRequired,
  changeTypeStatusModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ status, authUser }) => {
  const { modalData, modalType } = status;
  return {
    modalData,
    modalType,
    authUser
  }
}

export default connect(mapStateToProps, {
  toggleStatusModal,
  changeTypeStatusModal
})(reduxForm({ 
  form: 'status_action_form', 
  validate
})(injectIntl(ActionForm)));