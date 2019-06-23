import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import renderDatePickerField from '../../../containers/Shared/form/DatePicker';
import { Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import {
    removeState,
    getCustomerInternationalList,
    getCarrierInternationalList,
    getSalemanInternationalList,
    getApprovedByInternationalList,
    getPricingCountryInternationalList,
    getPricingCityInternationalList,
    getPricingDistrictInternationalList,
    getPricingWardInternationalList,
} from '../../../redux/actions';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import PropTypes from 'prop-types';
import { PRI_INT_PRICING_CITY_RESET_STATE, PRI_INT_PRICING_DISTRICT_RESET_STATE, PRI_INT_PRICING_WARD_RESET_STATE } from '../../../constants/actionTypes';
import validate from './validateActionForm';
import { categoryPricing } from '../../../constants/defaultValues';

class ActionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disableField: true,
            disableCustomerField: true
        }
    }

    componentWillMount() {
        const params = {
            field: ['id', 'name', 'name_en'],
            offset: {
                limit: 0
            }
        };
        this.props.getCustomerInternationalList(params);
        this.props.getCarrierInternationalList(params);
        this.props.getPricingCountryInternationalList(params);

        const paramsUser = {
            field: ['id', 'username'],
            offset: {
                limit: 0
            }
        };
        this.props.getSalemanInternationalList(paramsUser);
        this.props.getApprovedByInternationalList(paramsUser);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            disableField: nextProps.type === 'view' ? true : false,
            disableCustomerField: nextProps.is_private ? false : true
        });
        if (nextProps.origin_country_id && nextProps.origin_country_id !== this.props.origin_country_id) {
            let params = {
                field: ['id', 'name', 'name_en'],
                offset: {
                    limit: 0
                },
                query: {
                    country: nextProps.origin_country_id
                }
            };
            this.props.getPricingCityInternationalList(params);

            if (nextProps.origin_city_id && nextProps.origin_city_id !== this.props.origin_city_id) {
                params.query = {
                    ...params.query,
                    city: nextProps.origin_city_id
                };
                this.props.getPricingDistrictInternationalList(params);

                if (nextProps.origin_district_id && nextProps.origin_district_id !== this.props.origin_district_id) {
                    params.query = {
                        ...params.query,
                        district: nextProps.origin_district_id
                    };
                    this.props.getPricingWardInternationalList(params);
                }
            }
        }
    }

    componentDidMount() {
        this.props.change('approval_status', 0);
    }

    showOptionsCategory = () => {
        let result = [];
        for (var key in categoryPricing) {
            if (categoryPricing.hasOwnProperty(key)) {
                result.push({
                    value: key,
                    label: categoryPricing[key]
                });
            }
        }
        return result;
    }

    showOptionCustomer = (items) => {
        let result = [];
        if (items.length > 0) {
            result = items.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
        }
        return result;
    }

    showOption = (items) => {
        let result = [];
        if (items.length > 0) {
            result = items.map(item => {
                return {
                    value: item.id,
                    label: item.name
                }
            })
        }
        return result;
    }

    showOptionUser = (items) => {
        let result = [];
        if (items.length > 0) {
            result = items.map(item => {
                return {
                    value: item.id,
                    label: item.username
                }
            })
        }
        return result;
    }

    onChangePricingCountry = value => {
        this.props.change('origin_city_id', null);
        this.props.change('origin_district_id', null);
        this.props.change('origin_ward_id', null);
        if (value) {
            let params = {
                field: ['id', 'name', 'name_en'],
                offset: {
                    limit: 0
                },
                query: {
                    country: value
                }
            }
            this.props.getPricingCityInternationalList(params);
        } else {
            this.props.removeState(PRI_INT_PRICING_CITY_RESET_STATE);
        }

        this.props.removeState(PRI_INT_PRICING_DISTRICT_RESET_STATE);
        this.props.removeState(PRI_INT_PRICING_WARD_RESET_STATE);
    }

    onChangePricingCity = value => {
        this.props.change('origin_district_id', null);
        this.props.change('origin_ward_id', null);

        if (value) {
            let params = {
                field: ['id', 'name', 'name_en'],
                offset: {
                    limit: 0
                },
                query: {
                    city: value
                }
            }
            this.props.getPricingDistrictInternationalList(params);
        } else {
            this.props.removeState(PRI_INT_PRICING_DISTRICT_RESET_STATE);
        }

        this.props.removeState(PRI_INT_PRICING_WARD_RESET_STATE);
    }

    onChangePricingDistrict = value => {
        this.props.change('origin_ward_id', null);
        if (value) {
            let params = {
                field: ['id', 'name', 'name_en'],
                offset: {
                    limit: 0
                },
                query: {
                    district: value
                }
            }
            this.props.getPricingWardInternationalList(params);
        } else {
            this.props.removeState(PRI_INT_PRICING_WARD_RESET_STATE);
        }
    }

    onChangeIsPrivate = value => {
        this.props.change('customer_id', '');
        this.setState({ disableCustomerField: value ? false : true });
    }

    render() {
        const { messages } = this.props.intl;
        const { handleSubmit, customer, saleman, carrier, country, city, district, ward, approvedBy } = this.props;
        const { disableField, disableCustomerField } = this.state;
        return (
            <form className="form form_custom" onSubmit={handleSubmit}>
                <Row>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.type']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="is_private"
                                    component={renderSelectField}
                                    options={[
                                        { value: 0, label: messages['pri_int.public'] },
                                        { value: 1, label: messages['pri_int.customer'] }
                                    ]}
                                    clearable={false}
                                    onChange={this.onChangeIsPrivate}
                                    disabled={disableField}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.customer']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="customer_id"
                                    component={renderSelectField}
                                    options={customer.items && this.showOption(customer.items)}
                                    clearable={false}
                                    disabled={disableCustomerField || disableField}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.saleman']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="saleman_id"
                                    component={renderSelectField}
                                    options={saleman.items && this.showOptionUser(saleman.items)}
                                    clearable={false}
                                    disabled
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['status']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="status"
                                    component={renderSelectField}
                                    options={[
                                        { value: 1, label: messages['active'] },
                                        { value: 0, label: messages['inactive'] }
                                    ]}
                                    clearable={false}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.category']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="category_id"
                                    component={renderSelectField}
                                    options={this.showOptionsCategory()}
                                    clearable={false}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.carrier']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="carrier_id"
                                    component={renderSelectField}
                                    options={carrier.items && this.showOption(carrier.items)}
                                    clearable={false}
                                    disabled={disableField}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.effected-date']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="effected_date"
                                    component={renderDatePickerField}
                                />
                                <div className="form__form-group-icon">
                                    <CalendarBlankIcon />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.expired-date']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="expired_date"
                                    component={renderDatePickerField}
                                />
                                <div className="form__form-group-icon">
                                    <CalendarBlankIcon />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.origin-country']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="origin_country_id"
                                    component={renderSelectField}
                                    options={country.pricing && this.showOption(country.pricing)}
                                    onChange={this.onChangePricingCountry}
                                    clearable={false}
                                    disabled={disableField}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.origin-city']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="origin_city_id"
                                    component={renderSelectField}
                                    options={city.pricing && this.showOption(city.pricing)}
                                    onChange={this.onChangePricingCity}
                                    clearable={false}
                                    disabled={disableField}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.origin-district']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="origin_district_id"
                                    component={renderSelectField}
                                    options={district.pricing && this.showOption(district.pricing)}
                                    onChange={this.onChangePricingDistrict}
                                    clearable={false}
                                    disabled={disableField}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.origin-ward']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="origin_ward_id"
                                    component={renderSelectField}
                                    options={ward.pricing && this.showOption(ward.pricing)}
                                    clearable={false}
                                    disabled={disableField}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.approved-status']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="approval_status"
                                    component={renderSelectField}
                                    options={[
                                        { value: 0, label: messages['pri_int.new'] },
                                        { value: 1, label: messages['pri_int.approved'] },
                                        { value: 2, label: messages['pri_int.draft'] },
                                    ]}
                                    clearable={false}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.approved-by']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="approved_by"
                                    component={renderSelectField}
                                    options={approvedBy.items && this.showOptionUser(approvedBy.items)}
                                    clearable={false}
                                    disabled={disableField}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="text-right search-group-button">
                        <Link to="/pricing-international/pricing" className="btn btn-outline-secondary btn-sm">
                            {messages['cancel']}
                        </Link>
                        <Button size="sm" color="primary" id="search" >
                            {messages['save']}
                        </Button>
                    </Col>
                </Row>
            </form>);
    }
}

ActionForm.propTypes = {
    removeState: PropTypes.func.isRequired,
    getCustomerInternationalList: PropTypes.func.isRequired,
    getCarrierInternationalList: PropTypes.func.isRequired,
    getSalemanInternationalList: PropTypes.func.isRequired,
    getApprovedByInternationalList: PropTypes.func.isRequired,
    getPricingCountryInternationalList: PropTypes.func.isRequired,
    getPricingCityInternationalList: PropTypes.func.isRequired,
    getPricingDistrictInternationalList: PropTypes.func.isRequired,
    getPricingWardInternationalList: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => {
    const { pricingInternational, authUser } = state;
    const currentUser = authUser.user;
    const { pricing, customer, carrier, service, saleman, approvedBy, country, city, district, ward } = pricingInternational;
    const { itemEditting, loading } = pricing;
    let initialValues = {};
    if (props.type === 'add') {
        initialValues = {
            saleman_id: currentUser ? currentUser.id : null,
            approval_status: 0
        };
    } else {
        initialValues = {
            ...itemEditting,
            is_private: itemEditting.is_private ? 1 : 0,
            status: itemEditting.status ? 1 : 0,
        };
    }

    let disableApprovalStatus = true;
    let disableApprovalBy = false;
    if (currentUser && itemEditting && currentUser.id === itemEditting.approval_by) {
        disableApprovalStatus = false;
    }
    if (itemEditting && itemEditting.approval_status === 1) {
        disableApprovalBy = true;
    }

    const selector = formValueSelector('pricing_international_action_form');
    const is_private = selector(state, 'is_private');
    const origin_country_id = selector(state, 'origin_country_id');
    const origin_city_id = selector(state, 'origin_city_id');
    const origin_district_id = selector(state, 'origin_district_id');
    const origin_ward_id = selector(state, 'origin_ward_id');

    return {
        pricing,
        customer,
        carrier,
        service,
        saleman,
        approvedBy,
        country, city, district, ward,
        origin_country_id, origin_city_id, origin_district_id, origin_ward_id,
        currentUser,
        initialValues,
        is_private,
        disableApprovalStatus,
        disableApprovalBy,
        loading
    }
}

export default connect(mapStateToProps, {
    removeState,
    getCustomerInternationalList,
    getCarrierInternationalList,
    getSalemanInternationalList,
    getApprovedByInternationalList,
    getPricingCountryInternationalList,
    getPricingCityInternationalList,
    getPricingDistrictInternationalList,
    getPricingWardInternationalList,
})(reduxForm({
    form: 'pricing_international_action_form',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    validate
})(injectIntl(ActionForm)));