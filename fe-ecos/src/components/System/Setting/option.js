import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Field } from 'redux-form';
import renderRadioButtonField from '../../../containers/Shared/form/RadioButton';
import renderSelectField from '../../../containers/Shared/form/Select';
class Option extends Component {
    render() {
        const { messages } = this.props.intl;        
        return (
            <Fragment>
                <h5 className="bold-text">{messages['list-view']}</h5>
                <hr />
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['view-limit']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="view_limit"
                            component="input"
                            type="number"
                            placeholder={messages['view-limit']}
                        />
                    </div>
                </div>
                <h5 className="bold-text">{messages['account']}</h5>
                <hr />
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['password']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="password"
                            component={renderRadioButtonField}
                            label={messages['yes']}
                            radioValue={1}
                        />
                        <Field
                            name="password"
                            component={renderRadioButtonField}
                            label={messages['no']}
                            radioValue={0}
                            defaultChecked
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['online']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="online"
                            component={renderRadioButtonField}
                            label={messages['yes']}
                            radioValue={1}
                        />
                        <Field
                            name="online"
                            component={renderRadioButtonField}
                            label={messages['no']}
                            radioValue={0}
                            defaultChecked
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['activity']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="activity"
                            component={renderRadioButtonField}
                            label={messages['yes']}
                            radioValue={1}
                        />
                        <Field
                            name="activity"
                            component={renderRadioButtonField}
                            label={messages['no']}
                            radioValue={0}
                            defaultChecked
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['user_group']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="user_group"
                            component={renderSelectField}
                            options={[
                                { value: 'one', label: 'One' },
                                { value: 'two', label: 'Two' },
                            ]}
                        />
                    </div>
                </div>

                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['login_attempts']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="login_attempts"
                            component="input"
                            type="number"
                            placeholder={messages['login_attempts']}
                        />
                    </div>
                </div>
                <h5 className="bold-text">{messages['customizer']}</h5>
                <hr />
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['allow_customizer']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="allow_customizer"
                            component={renderRadioButtonField}
                            label={messages['yes']}
                            radioValue={1}
                        />
                        <Field
                            name="allow_customizer"
                            component={renderRadioButtonField}
                            label={messages['no']}
                            radioValue={0}
                            defaultChecked
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['default_color']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="default_color"
                            component={renderSelectField}
                            options={[
                                { value: 'light', label: messages['light'] },
                                { value: 'dark', label:  messages['dark'] },
                            ]}
                        />
                    </div>
                </div>

                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['allow_change_theme_color']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="allow_change_theme_color"
                            component={renderRadioButtonField}
                            label={messages['yes']}
                            radioValue={1}
                        />
                        <Field
                            name="allow_change_theme_color"
                            component={renderRadioButtonField}
                            label={messages['no']}
                            radioValue={0}
                            defaultChecked
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default injectIntl(Option);