import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import renderDatePickerField from '../../../containers/Shared/form/DatePicker';
import { Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import {
    getCustomerList, getSalemanList, getCarrierCodeList,
    getCountryPricingList, getCityPricingList, getDistrictPricingList, getWardPricingList,
    getApprovedByList
} from '../../../redux/actions';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import validate from './validateActionForm';

class ActionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCustomerField: false
        }
    }

    hanldeChangeType = value => {
        this.props.change('customer', '');
        if (value === 2) {
            this.setState({
                showCustomerField: true
            });
        } else {
            this.setState({
                showCustomerField: false
            });
        }
    }

    componentDidMount() {
        const { messages } = this.props.intl;
        //get customer
        const paramCustomer = {
            field: ['id', 'name'],
            offset: {
                limit: 0
            }
        }
        this.props.getCustomerList(paramCustomer, messages);

        //get salemon
        const paramUser = {
            field: ['id', 'username'],
            offset: {
                limit: 0
            }
        }
        this.props.getSalemanList(paramUser, messages);

        //get approved by
        this.props.getApprovedByList(paramUser, messages);

        const paramAddress = {
            field: ['id', 'name'],
            offset: {
                limit: 0
            }
        }
        //get countries
        this.props.getCountryPricingList(paramAddress, messages);
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

    onChangeCountry = value => {
        const { messages } = this.props.intl;
        let params = {
            field: ['id', 'name'],
            offset: {
                limit: 0
            },
            query: {
                country: value ? value : 0
            }
        }
        this.props.change('city', null);
        this.props.change('district', null);
        this.props.change('ward', null);
        this.props.getCityPricingList(params, messages);
    }

    onChangeCity = value => {
        const { messages } = this.props.intl;

        let params = {
            field: ['id', 'name'],
            offset: {
                limit: 0
            },
            query: {
                city: value ? value : 0
            }
        }
        this.props.change('district', null);
        this.props.change('ward', null);
        this.props.getDistrictPricingList(params, messages);
    }

    onChangeDistrict = value => {
        const { messages } = this.props.intl;

        let params = {
            field: ['id', 'name'],
            offset: {
                limit: 0
            },
            query: {
                district: value ? value : 0
            }
        }
        this.props.change('ward', null);
        this.props.getWardPricingList(params, messages);
    }
    render() {
        const { messages } = this.props.intl;
        
        const { handleSubmit, customers, salemans, carriers, countries, cities, districts, wards, approvedBys, type } = this.props;
        return (
            <form className="form form_custom" onSubmit={handleSubmit}>
                <Row>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_man.filter-type']}</span>
                            <div className="form__form-group-field">
                                <Field 
                                    name="is_private" 
                                    component={renderSelectField} 
                                    options={[
                                        { value: 1, label: messages['pri_man.public'] },
                                        { value: 2, label: messages['pri_man.customer'] }
                                    ]}
                                    clearable={false}
                                    onChange={this.hanldeChangeType}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_man.customer']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="customer_id"
                                    component={renderSelectField}
                                    options={customers && this.showOption(customers)}
                                    disabled={!this.state.showCustomerField}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pricing.saleman']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="saleman_id"
                                    component={renderSelectField}
                                    options={salemans && this.showOptionUser(salemans)}
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
                            <span className="form__form-group-label">{messages['pri_man.category']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="category_code"
                                    component={renderSelectField}
                                    options={[
                                        { value: 'Inbound', label: messages['inbound'] },
                                        { value: 'Outbound', label: messages['outbound'] },
                                        { value: 'Domestic', label: messages['domestic'] }
                                    ]}
                                    clearable={false}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_man.carrier']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="carrier_id"
                                    component={renderSelectField}
                                    options={carriers && this.showOption(carriers)} />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pricing.effected-date']}</span>
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
                            <span className="form__form-group-label">{messages['pricing.expired-date']}</span>
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
                            <span className="form__form-group-label">{messages['zone_code.country_origin']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="origin_country_id"
                                    component={renderSelectField}
                                    options={countries && this.showOption(countries)}
                                    onChange={this.onChangeCountry}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={3} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['zone_code.city_origin']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="origin_city_id"
                                    component={renderSelectField}
                                    options={cities && this.showOption(cities)}
                                    onChange={this.onChangeCity}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={3} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['zone_code.district_origin']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="origin_district_id"
                                    component={renderSelectField}
                                    options={districts && this.showOption(districts)}
                                    onChange={this.onChangeDistrict}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={3} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['zone_code.ward_origin']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="origin_ward_id"
                                    component={renderSelectField}
                                    options={wards && this.showOption(wards)}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={3} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pricing.approved-status']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="approved_status"
                                    component={renderSelectField}
                                    options={[
                                        { value: 'approved', label: messages['pricing.approved'] },
                                        { value: 'draft', label: messages['pricing.draft'] },
                                        { value: 'new', label: messages['pricing.new'] },
                                    ]}
                                    clearable={false}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pricing.approved-by']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="approved_by"
                                    component={renderSelectField}
                                    options={approvedBys && this.showOptionUser(approvedBys)}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                {type !== "view" &&
                    <Row>
                        <Col md={12} className="text-right search-group-button">
                            <Button size="sm" color="primary" id="search" >
                                {messages['save']}
                            </Button>
                        </Col>
                    </Row>
                }
            </form>
        );
    }
}

const mapStateToProps = ({ customer, carrier, pricing }) => {
    const customers = customer.items;
    const { salemans, countries, cities, districts, wards, approvedBys } = pricing;
    const carriers = carrier.codes;
    return {
        customers,
        salemans,
        carriers,
        countries,
        cities,
        districts,
        wards,
        approvedBys
    }
}

export default reduxForm({
    form: 'pricing_action_form',
    validate
})(injectIntl(connect(mapStateToProps, {
    getCustomerList,
    getSalemanList,
    getCarrierCodeList,
    getCountryPricingList,
    getCityPricingList,
    getDistrictPricingList,
    getWardPricingList,
    getApprovedByList,
})(ActionForm)));