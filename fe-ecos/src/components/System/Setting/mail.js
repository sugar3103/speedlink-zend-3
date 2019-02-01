import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Field } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';

class Mail extends Component {
    render() {
        const { messages } = this.props.intl;
        return (
            <Fragment>
                <h5 className="bold-text">{messages['general']}</h5>
                <hr />
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['mail_engine']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="mail_engine"
                            component={renderSelectField}
                            options={[
                                { value: 'mail', label: 'Mail' },
                                { value: 'smtp', label: 'Smtp' },
                            ]}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['mail_parameter']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="mail_parameter"
                            component="input"
                            type="text"
                            placeholder={messages['mail_parameter']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['mail_smtp_hostname']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="mail_smtp_hostname"
                            component="input"
                            type="text"
                            placeholder={messages['mail_smtp_hostname']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['mail_smtp_username']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="mail_smtp_username"
                            component="input"
                            type="text"
                            placeholder={messages['mail_smtp_username']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['mail_smtp_password']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="mail_smtp_password"
                            component="input"
                            type="text"
                            placeholder={messages['mail_smtp_password']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['mail_smtp_port']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="mail_smtp_port"
                            component="input"
                            type="text"
                            placeholder={messages['mail_smtp_port']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['mail_smtp_timeout']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="mail_smtp_timeout"
                            component="input"
                            type="text"
                            placeholder={messages['mail_smtp_timeout']}
                        />
                    </div>
                </div>
                <h5 className="bold-text">{messages['mail_alert']}</h5>
                <hr />
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['mail_alert_email']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="mail_alert_email"
                            component="textarea"
                            type="text"
                            placeholder={messages['mail_alert_email']}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default injectIntl(Mail);