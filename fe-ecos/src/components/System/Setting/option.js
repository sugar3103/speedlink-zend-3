import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Field } from 'redux-form';
import renderRadioButtonField from '../../../containers/Shared/form/RadioButton';
import renderSelectField from '../../../containers/Shared/form/Select';
import {
    getRoleList
} from "../../../redux/actions";
class Option extends Component {
    componentDidMount() {
        let params = {
            field: ['id', 'name', 'name_en'],
            offset: {
                limit: 0
            }
        }

        this.props.getRoleList(params);
    }

    showItems(items) {
        const { locale } = this.props.intl;

        const roles = items.map(item => {
            return {
                'value': item.id,
                'label': (locale === 'en-US' && item.name_en) ? item.name_en : item.name
            }
        });

        return roles;
    }


    render() {
        const { messages } = this.props.intl; 
        const { role } = this.props;
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
                            options={role.items && this.showItems(role.items)}
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
                                { value: 'dark-blue', label:  messages['dark-blue'] }
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

const mapStateToProps = ({ users }) => {
    const { role } = users;
    return {role};
  };
  
export default injectIntl(connect(mapStateToProps, {
    getRoleList
})(Option))