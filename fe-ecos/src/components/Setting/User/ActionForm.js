import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleUserModal,getRoleList } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderRadioButtonField from '../../../containers/Shared/form/RadioButton';
import renderMultiSelectField from '../../../containers/Shared/form/MultiSelect';
import validate from './validateActionForm';

class Action extends PureComponent {

  constructor() {
    super();
    this.state = {
      activeTab: '1',
      errors: {}      
    };
  }

  onChange = (e) => {
    this.setState({
      errors: {}
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      const { errors } = nextProps;
      this.setState({
        errors: errors
      });
    }
  }

  componentDidMount() {
    this.props.getRoleList();
    const data = this.props.modalData;    
    if (data) {
      data.user = data.user === 'Active' ? 1 : 0;
      this.props.initialize(data);
    }
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

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  toggleModal = () => {
    this.props.toggleUserModal();
  }
  
  render() {
    const { messages } = this.props.intl;
    const { handleSubmit } = this.props;
    const { errors } = this.state;    
    const {items} = this.props.role;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <button className="lnr lnr-cross modal__close-btn" onClick={this.toggleModal} />
          <h4 className="bold-text  modal__title">{messages['user.add-new']}</h4>
        </div>
        <div className="modal__body">
          <Row>
            <Col md={12}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.username']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="username"
                    component={CustomField}
                    type="text"
                    placeholder={messages['user.username']}
                    onChange={this.onChange}
                  />
                </div>
                {errors && errors.username && errors.username.userExists && <span className="form__form-group-error">{messages['user.validate-user-exists']}</span>}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.firstname']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="firstname"
                    component={CustomField}
                    type="text"
                    placeholder={messages['user.firstname']}
                    onChange={this.onChange}
                  />
                </div>
                {errors && errors.username && errors.username.userExists && <span className="form__form-group-error">{messages['user.validate-user-exists']}</span>}
              </div>
            </Col>
            <Col md={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.lastname']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="lastname"
                    component={CustomField}
                    type="text"
                    placeholder={messages['user.lastname']}
                    onChange={this.onChange}
                  />
                </div>
                {errors && errors.username && errors.username.userExists && <span className="form__form-group-error">{messages['user.validate-user-exists']}</span>}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.password']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="password"
                    component={CustomField}
                    type="text"
                    placeholder={messages['user.password']}
                    onChange={this.onChange}
                  />
                </div>
                {errors && errors.password && <span className="form__form-group-error">{messages['user.validate-password']}</span>}
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['user.confirm_password']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="confirm_password"
                    component={CustomField}
                    type="text"
                    placeholder={messages['user.confirm_password']}
                    onChange={this.onChange}
                  />
                </div>
                {errors && errors.password && <span className="form__form-group-error">{messages['user.validate-confirm-password']}</span>}
              </div>

              <div className="form__form-group">
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

              <div className="form__form-group">
                <span className="form__form-group-label">{messages['role.list']}</span>
                <div className="form__form-group-field">
                <Field
                    name="roles"
                    component={renderMultiSelectField}
                    options={items && this.showOptions(items)}
                    onChange={this.onChange}
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
  const { errors, modalData } = user;
  return {
    errors,
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