import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Field } from 'redux-form';

class General extends Component {
    render() {
        const { messages } = this.props.intl;        
        return (
            <Fragment>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['name']}</span>
                    <div className="form__form-group-field">
                        
                        <div className="form__form-group-icon">
                            <div className="flag vn"></div>
                        </div>
                        <Field
                            name="name"
                            component="input"
                            type="text"
                            placeholder={messages['name']}
                        />
                        <div className="form__form-group-icon">
                            <div className="flag us"></div>
                        </div>
                        <Field
                            name="name_en"
                            component="input"
                            type="text"
                            placeholder={messages['name']}
                        />
                    </div>                   
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['meta-title']}</span>
                    <div className="form__form-group-field">
                        <div className="form__form-group-icon">
                            <div className="flag vn"></div>
                        </div>
                        <Field
                            name="meta_title"
                            component="input"
                            type="text"
                            placeholder={messages['meta-title']}
                        />
                         <div className="form__form-group-icon">
                            <div className="flag us"></div>
                        </div>
                        <Field
                            name="meta_title_en"
                            component="input"
                            type="text"
                            placeholder={messages['meta-title']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['owner']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="owner"
                            component="input"
                            type="text"
                            placeholder={messages['owner']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['address']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="textarea"
                            component="textarea"
                            type="text"
                            placeholder={messages['address']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['e-mail']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="mail"
                            component="input"
                            type="text"
                            placeholder={messages['e-mail']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['telephone']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="telephone"
                            component="input"
                            type="text"
                            placeholder={messages['telephone']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['fax']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="fax"
                            component="input"
                            type="text"
                            placeholder={messages['fax']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['comment']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="comment"
                            component="textarea"
                            type="text"
                            placeholder={messages['comment']}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default injectIntl(General);