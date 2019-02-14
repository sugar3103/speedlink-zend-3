import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Field } from 'redux-form';
import renderRadioButtonField from '../../../containers/Shared/form/RadioButton';

class Server extends Component {
    render() {
        const { messages } = this.props.intl;
        return (
            <Fragment>
                <h5 className="bold-text">{messages['general']}</h5>
                <hr />
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['maintenance']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="maintenance"
                            component={renderRadioButtonField}
                            label={messages['yes']}
                            radioValue={1}
                        />
                        <Field
                            name="maintenance"
                            component={renderRadioButtonField}
                            label={messages['no']}
                            radioValue={0}
                            defaultChecked
                        />
                    </div>
                </div>
                <h5 className="bold-text">{messages['uploads']}</h5>
                <hr />
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['file_max_size']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="file_max_size"
                            component="input"
                            type="text"
                            placeholder={messages['file_max_size']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['file_ext_allowed']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="file_ext_allowed"
                            component="textarea"
                            type="text"
                            placeholder={messages['file_ext_allowed']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['file_mime_allowed']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="file_mime_allowed"
                            component="textarea"
                            type="text"
                            placeholder={messages['file_mime_allowed']}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default injectIntl(Server);