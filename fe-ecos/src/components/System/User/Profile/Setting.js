import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import { Button, ButtonToolbar } from 'reactstrap';
import validate from './validateSetting';

import EyeIcon from 'mdi-react/EyeIcon';
import EmailIcon from 'mdi-react/EmailIcon';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderMultiSelectField from '../../../../containers/Shared/form/MultiSelect';
import { getRoleList,getVerifyAuth } from '../../../../redux/actions';

class Setting extends PureComponent {

  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
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

  showPassword = (e) => {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  componentDidMount() {
    const { authUser } = this.props;
    console.log(this.props);
    
    this.props.getRoleList();

    this.props.initialize(authUser.user);
    
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
    const { handleSubmit } = this.props;
    const { items } = this.props.role;
    return (
      <Fragment>
        <form className="form form--horizontal" onSubmit={handleSubmit}>
          <div className="form__half">
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['user.username']}</span>
              <div className="form__form-group-field">
                <Field
                  name="username"
                  component="input"
                  type="text"
                  placeholder={messages['user.username']}
                  messages={messages}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="form__half">
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['user.email']}</span>
              <div className="form__form-group-field">
                <div className="form__form-group-icon">
                  <EmailIcon />
                </div>
                <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">

                  <Field
                    name="email"
                    component={CustomField}
                    type="email"
                    placeholder={messages['user.email']}
                    messages={messages}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form__half" style={{ margin: '0 30px 0 0' }}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['user.firstname']}</span>
              <div className="form__form-group-field">
                <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
                  <Field
                    name="first_name"
                    component={CustomField}
                    type="text"
                    placeholder={messages['user.firstname']}
                    messages={messages}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form__half">
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['user.lastname']}</span>
              <div className="form__form-group-field">
                <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
                  <Field
                    name="last_name"
                    component={CustomField}
                    type="text"
                    placeholder={messages['user.lastname']}
                    messages={messages}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['role.list']}</span>
            <div className="form__form-group-field">
              <Field
                name="roles"
                component={renderMultiSelectField}
                options={items && this.showOptions(items)}
                messages={messages}
                disabled
                readOnly
              />
            </div>
          </div>
          <div className="form__half" style={{ margin: '0 30px 0 0' }}>
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['user.password']}</span>
              <div className="form__form-group-field">
                <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
                  <Field
                    name="password"
                    component={CustomField}
                    type={this.state.showPassword ? 'text' : 'password'}
                    placeholder={messages['user.password']}
                    messages={messages}
                  />
                </div>
                <button
                  className={`form__form-group-button${this.state.showPassword ? ' active' : ''}`}
                  onClick={e => this.showPassword(e)}
                ><EyeIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="form__half">
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['user.confirm_password']}</span>
              <div className="form__form-group-field">
                <div className="form__form-group-input-wrap form__form-group-input-wrap--error-above">
                  <Field
                    name="confirm_password"
                    component={CustomField}
                    type={this.state.showPassword ? 'text' : 'password'}
                    placeholder={messages['user.confirm_password']}
                    messages={messages}
                  />
                </div>
                <button
                  className={`form__form-group-button${this.state.showPassword ? ' active' : ''}`}
                  onClick={e => this.showPassword(e)}
                ><EyeIcon />
                </button>
              </div>
            </div>
          </div>
          <ButtonToolbar className="form__button-toolbar">
            <Button color="primary" type="submit">{messages['save']}</Button>
          </ButtonToolbar>
        </form>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ authUser, users }) => {
  const { role } = users
  return { authUser, role }
}


export default reduxForm({
  form: 'user_setting_action_form',
  validate
})(injectIntl(connect(mapStateToProps, { getRoleList,getVerifyAuth })(Setting)));
