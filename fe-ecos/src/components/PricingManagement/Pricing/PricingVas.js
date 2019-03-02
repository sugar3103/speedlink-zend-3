import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';

class PricingVas extends Component {

    render() {
        const { messages } = this.props.intl;
        return (
            <form className="form form_custom pricing-vas">
                <div className="group-action">
                    <Button size="sm" color="info"><span className="lnr lnr-question-circle"></span></Button>
                    <Button size="sm" color="success"><span className="lnr lnr-plus-circle"></span></Button>
                    <div className="clearfix"></div>
                </div>
                <div>
                    <div className="group-input">
                        <div>
                            <Button size="sm" color="danger"><span className="lnr lnr-circle-minus"></span></Button>
                        </div>
                        <div className="form__form-group type-select">
                            <div className="form__form-group-field">
                                <Field
                                    name="is_private"
                                    component={renderSelectField}
                                    options={[
                                        { value: 0, label: messages['pricing.normal'] },
                                        { value: 1, label: messages['pricing.range'] },
                                    ]}
                                    clearable={false}
                                    placeholder={messages['pricing.type']}
                                />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <div className="form__form-group-field">
                                <Field
                                    name="name"
                                    component={CustomField}
                                    type="text"
                                    placeholder={messages['name']}
                                />
                            </div>
                        </div>
                        <div className="equal-span">
                            <span>=</span>
                        </div>
                        <div className="form__form-group input-value">
                            <div className="form__form-group-field">
                                <Field
                                    name="is_private"
                                    component={CustomField}
                                    type="text"
                                    placeholder={messages['pricing.value']}
                                />
                            </div>
                        </div>
                        <div className="form__form-group input-minimun-value">
                            <div className="form__form-group-field">
                                <Field
                                    name="is_private"
                                    component={CustomField}
                                    type="text"
                                    placeholder={messages['pricing.minimun-value']}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div>
                    <div className="group-input">
                        <div>
                            <Button size="sm" color="danger"><span className="lnr lnr-circle-minus"></span></Button>
                        </div>
                        <div className="form__form-group type-select">
                            <div className="form__form-group-field">
                                <Field
                                    name="is_private"
                                    component={renderSelectField}
                                    options={[
                                        { value: 0, label: messages['pricing.normal'] },
                                        { value: 1, label: messages['pricing.range'] },
                                    ]}
                                    clearable={false}
                                    placeholder={messages['pricing.type']}
                                />
                            </div>
                        </div>
                        <div className="form__form-group">
                            <div className="form__form-group-field">
                                <Field
                                    name="name"
                                    component={CustomField}
                                    type="text"
                                    placeholder={messages['name']}
                                />
                            </div>
                        </div>
                        <div className="equal-span">
                            <span>=</span>
                        </div>
                        <div className="form__form-group input-value">
                            <div className="form__form-group-field">
                                <Field
                                    name="is_private"
                                    component={CustomField}
                                    type="text"
                                    placeholder={messages['pricing.value']}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = () => {
    return {}
}

export default reduxForm({
    form: 'pricing_service_action_form',
})(injectIntl(connect(mapStateToProps, null)(PricingVas)));
