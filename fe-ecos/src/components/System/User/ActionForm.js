import React, { PureComponent, Fragment } from 'react';
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import EyeIcon from 'mdi-react/EyeIcon';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleUserModal, getRoleList, changeTypeUserModal } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import Can from '../../../containers/Shared/Can';
import renderRadioButtonField from '../../../containers/Shared/form/RadioButton';
import renderMultiSelectField from '../../../containers/Shared/form/MultiSelect';
import validate from './validateActionForm';
import { MODAL_ADD, MODAL_VIEW, MODAL_EDIT } from '../../../constants/defaultValues';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class ActionForm extends PureComponent {

  constructor() {
    super();
    this.state = {
      showPassword: false,
      showConfirmPassword: false,
      modalType: ''
    };
  }

  componentDidMount() {
    this.props.getRoleList();
    const data = this.props.modalData;
    if (data) {
      this.props.initialize(data);
    }
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  showConfirmPassword = (e) => {
    e.preventDefault();
    this.setState({
      showConfirmPassword: !this.state.showConfirmPassword,
    });
  };

  changeTypeModal = () => {
    this.props.changeTypeUserModal(MODAL_VIEW);
  }

  showOptions = (items) => {
    const roles = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });

    return roles;
  }

  toggleModal = () => {
    this.props.toggleUserModal();
  }

  hiddenFiled = (field) => {
    const { fields } = this.props;

    if (fields !== undefined) {
      return fields.indexOf(field) > -1 ? false : true;
    } else {
      return false;
    }

  }

  render() {
    const { messages, locale } = this.props.intl;
    const { handleSubmit, modalData, modalType } = this.props;
    const { items } = this.props.role;
    let className = 'success';
    let title = messages['user.add-new'];
    const disabled = modalType === MODAL_VIEW ? true : false;

    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        title = messages['user.add-new'];
        break;
      case MODAL_EDIT:
        className = 'primary';
        title = messages['user.update'];
        break;
      case MODAL_VIEW:
        className = 'info';
        title = messages['user.view'];
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
          <Row hidden={this.hiddenFiled('username')}>
            <Col md={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.username']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="username"
                    component={CustomField}
                    type="text"
                    placeholder={messages['user.username']}
                    disabled={disabled}
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.email']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="email"
                    component={CustomField}
                    type="text"
                    placeholder={messages['user.email']}
                    disabled={disabled}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} hidden={this.hiddenFiled('firstname')}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.firstname']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="first_name"
                    component={CustomField}
                    type="text"
                    placeholder={messages['user.firstname']}
                    disabled={disabled}
                    messages={messages}
                  />
                </div>
              </div>
            </Col>
            <Col md={6} hidden={this.hiddenFiled('lastname')}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.lastname']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="last_name"
                    component={CustomField}
                    type="text"
                    placeholder={messages['user.lastname']}
                    disabled={disabled}
                    messages={messages}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} hidden={this.hiddenFiled('password')}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.password']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="password"
                    component={CustomField}
                    type={this.state.showPassword ? 'text' : 'password'}
                    placeholder={messages['user.password']}
                    disabled={disabled}
                  />
                  <button
                    className={`form__form-group-button${this.state.showPassword ? ' active' : ''}`}
                    onClick={e => this.showPassword(e)}
                  ><EyeIcon />
                  </button>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.confirm_password']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="confirm_password"
                    component={CustomField}
                    type={this.state.showConfirmPassword ? 'text' : 'password'}
                    placeholder={messages['user.password']}
                    disabled={disabled}
                  />
                  <button
                    className={`form__form-group-button${this.state.showConfirmPassword ? ' active' : ''}`}
                    onClick={e => this.showConfirmPassword(e)}
                  ><EyeIcon />
                  </button>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="form__form-group" hidden={this.hiddenFiled('status')}>
                <span className="form__form-group-label">{messages['user.status']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="is_active"
                    component={renderRadioButtonField}
                    label={messages['user.active']}
                    radioValue={1}
                    defaultChecked
                    disabled={disabled}
                  />
                  <Field
                    name="is_active"
                    component={renderRadioButtonField}
                    label={messages['user.inactive']}
                    radioValue={0}
                    disabled={disabled}
                  />
                </div>
              </div>

              <div className="form__form-group" hidden={this.hiddenFiled('list')}>
                <span className="form__form-group-label">{messages['role.list']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="roles"
                    component={renderMultiSelectField}
                    options={items && this.showOptions(items)}
                    disabled={disabled}
                  />
                </div>
              </div>
            </Col>
          </Row>
          {modalData &&
            <Fragment>
              <hr />
              <Row>
                <Col md={6}>
                  <span><i className="label-info-data">{messages['created-by']}:</i>{modalData.full_name_created}</span>
                  <br />
                  <span><i className="label-info-data">{messages['created-at']}:</i>
                    <Moment fromNow locale={locale}>{new Date(modalData.created_at)}</Moment>
                  </span>
                </Col>
                {modalData.updated_at &&
                  <Col md={6}>
                    <span><i className="label-info-data">{messages['updated-by']}:</i>{modalData.full_name_updated}</span>
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

        <ButtonToolbar className="modal__footer">
          {this.state.modalType === MODAL_VIEW &&
            <Button outline onClick={this.changeTypeModal}>{messages['cancel']}</Button>
          }
          <Can user={this.props.authUser.user} permission="user" action="edit">
            <Button color={className} type="submit">{modalType === MODAL_VIEW ? messages['edit'] : messages['save']}</Button>
          </Can>
         
          {this.state.modalType === MODAL_VIEW && modalData && (this.props.authUser.user.id === modalData.id) &&
            <Button outline onClick={this.changeTypeModal}>{messages['cancel']}</Button>
          }
          
          {modalData && (this.props.authUser.user.id === modalData.id) &&
              <Button color={className} type="submit">{modalType === MODAL_VIEW ? messages['edit'] : messages['save']}</Button>     
          }
        </ButtonToolbar>

      </form>
    );
  }
}

ActionForm.propTypes = {
  modalData: PropTypes.object,
  modalType: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  toggleUserModal: PropTypes.func.isRequired,
  changeTypeUserModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ users, authUser }) => {
  const { user, role } = users;
  const { modalData, modalType } = user;
  return {
    modalData,
    modalType,
    role,
    authUser
  }
}

export default reduxForm({
  form: 'user_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleUserModal,
  getRoleList,
  changeTypeUserModal
})(ActionForm)));