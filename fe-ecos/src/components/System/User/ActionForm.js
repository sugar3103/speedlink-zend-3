import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import EyeIcon from 'mdi-react/EyeIcon';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleUserModal, getRoleList } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderRadioButtonField from '../../../containers/Shared/form/RadioButton';
import renderMultiSelectField from '../../../containers/Shared/form/MultiSelect';
import validate from './validateActionForm';

class Action extends PureComponent {

  constructor() {
    super();
    this.state = {
      showPassword: false,
      showConfirmPassword: false,
    };
  }

  componentDidMount() {
    this.props.getRoleList();
    const data = this.props.modalData;
    if (data) {
      data.user = data.user === 'Active' ? 1 : 0;
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
    const { messages } = this.props.intl;
    const { handleSubmit, modalData, dataUser } = this.props;
    const { items } = this.props.role;
    const title = (modalData || dataUser) ? messages['user.update'] : messages['user.add-new'];
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <button className="lnr lnr-cross modal__close-btn" onClick={this.toggleModal} />
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          <Row hidden={this.hiddenFiled('username')}>
            <Col md={12}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.username']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="username"
                    component={CustomField}
                    type="text"
                    placeholder={messages['user.username']}
                    messages={messages}
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
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} hidden={this.hiddenFiled('password')}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.password']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="password"
                    component={CustomField}
                    type={this.state.showPassword ? 'text' : 'password'}
                    placeholder={messages['user.password']}
                    messages={messages}
                  />
                  <button
                    className={`form__form-group-button${this.state.showPassword ? ' active' : ''}`}
                    onClick={e => this.showPassword(e)}
                  ><EyeIcon />
                  </button>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.confirm_password']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="confirm_password"
                    component={CustomField}
                    type={this.state.showConfirmPassword ? 'text' : 'password'}
                    placeholder={messages['user.password']}
                    messages={messages}
                  />
                  <button
                    className={`form__form-group-button${this.state.showConfirmPassword ? ' active' : ''}`}
                    onClick={e => this.showConfirmPassword(e)}
                  ><EyeIcon />
                  </button>
                </div>
              </div>

              <div className="form__form-group" hidden={this.hiddenFiled('status')}>
                <span className="form__form-group-label">{messages['user.status']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="status"
                    component={renderRadioButtonField}
                    label={messages['user.active']}
                    radioValue={1}
                    defaultChecked
                  />
                  <Field
                    name="status"
                    component={renderRadioButtonField}
                    label={messages['user.inactive']}
                    radioValue={0}
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
                    messages={messages}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['cancel']}</Button>{' '}
          <Button color="success" type="submit">{messages['save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

const mapStateToProps = ({ users }) => {
  const { user, role } = users;
  const { modalData } = user;
  return {
    modalData,
    role
  }
}

export default reduxForm({
  form: 'user_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleUserModal,
  getRoleList
})(Action)));