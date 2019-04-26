import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import renderDatePickerField from '../../../containers/Shared/form/DatePicker';
import { Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import {
    removeState,
    getCustomerPricingList,
    getSalemanPricingList,
    getCarrierPricingList,
    getCountryList,
    getCityList,
    getDistrictList,
    getWardList,
    getUserList
} from '../../../redux/actions';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import PropTypes from 'prop-types';
import { CITY_RESET_STATE, DISTRICT_RESET_STATE, WARD_RESET_STATE } from '../../../constants/actionTypes';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCustomerField: false
        }
    }

    componentWillMount() {
        this.props.removeState(CITY_RESET_STATE);
        this.props.removeState(DISTRICT_RESET_STATE);
        this.props.removeState(WARD_RESET_STATE);
    }
    
    componentDidMount() {
        const { messages } = this.props.intl;

        const paramAddress = {
            field: ['id', 'name'],
            offset: {
                limit: 0
            }
        }
        //get countries
        this.props.getCountryList(paramAddress, messages);

        //get saleman
        const paramSaleman = {
            type: "saleman_id"
        };
        this.props.getSalemanPricingList(paramSaleman, messages);

        //get approved by
        const paramUser = {
            field: ['id', 'username'],
            offset: {
                limit: 0
            }
        }
        this.props.getUserList(paramUser, messages);

        //get carrier
        const params = {
            type: "carrier_id",
            category_code: ''
        };
        this.props.getCarrierPricingList(params, messages);
    }

    showOptionCustomer = (items) => {
        let result = [];
        if (items.length > 0) {
            result = items.map(item => {
                return {
                    value: item.customer_id,
                    label: item.customer_name
                }
            })
        }
        return result;
    }

    showOptionCarrier = (items) => {
        let result = [];
        if (items.length > 0) {
            result = items.map(item => {
                return {
                    value: item.carrier_id,
                    label: item.carrier_code
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

    showOptionSaleman = (items) => {
        let result = [];
        if (items.length > 0) {
            result = items.map(item => {
                return {
                    value: item.saleman_id,
                    label: item.username
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
        this.props.change('origin_city_id', null);
        this.props.change('origin_district_id', null);
        this.props.change('origin_ward_id', null);
        if (value) {
            let params = {
                field: ['id', 'name'],
                offset: {
                    limit: 0
                },
                query: {
                    country: value
                }
            }
            this.props.getCityList(params, messages);
        } else {
            this.props.removeState(CITY_RESET_STATE);
        }

        this.props.removeState(DISTRICT_RESET_STATE);
        this.props.removeState(WARD_RESET_STATE);
    }

    onChangeCity = value => {
        const { messages } = this.props.intl;
        this.props.change('origin_district_id', null);
        this.props.change('origin_ward_id', null);

        if (value) {
            let params = {
                field: ['id', 'name'],
                offset: {
                    limit: 0
                },
                query: {
                    city: value
                }
            }
            this.props.getDistrictList(params, messages);
        } else {
            this.props.removeState(DISTRICT_RESET_STATE);
        }
        
        this.props.removeState(WARD_RESET_STATE);
    }

    onChangeDistrict = value => {
        const { messages } = this.props.intl;
        this.props.change('origin_ward_id', null);

        if(value) {
            let params = {
                field: ['id', 'name'],
                offset: {
                    limit: 0
                },
                query: {
                    district: value 
                }
            }            
            this.props.getWardList(params, messages);
        } else {
            this.props.removeState(WARD_RESET_STATE);
        }
    }

    onChangeCategory = value => {
        const { messages } = this.props.intl;
        this.props.change('carrier_id', '');
        const params = {
            type: "carrier_id",
            category_code: value
        };
        this.props.getCarrierPricingList(params, messages);
    }

    hanldeChangeType = value => {
        const { messages } = this.props.intl;

        this.props.change('customer_id', '');
        if (value === 1) {
            const paramsCustomer = {
                type: "customer_id"
            };
            this.props.getCustomerPricingList(paramsCustomer, messages);
            this.setState({
                showCustomerField: true
            });
        } else {
            this.setState({
                showCustomerField: false
            });
        }
    }

    render() {
        const { messages } = this.props.intl;
        const { handleSubmit, reset, countries, cities, districts, wards, customers, salemans, carriers, approvedBys } = this.props;
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
                                        { value: '', label: messages['all'] },
                                        { value: 0, label: messages['pri_man.public'] },
                                        { value: 1, label: messages['pri_man.customer'] }
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
                                    options={customers && this.showOptionCustomer(customers)}
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
                                    options={salemans && this.showOptionSaleman(salemans)}
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
                                        { value: '', label: messages['all'] },
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
                                        { value: '', label: messages['all'] },
                                        { value: 'Inbound', label: messages['inbound'] },
                                        { value: 'Outbound', label: messages['outbound'] },
                                        { value: 'Domestic', label: messages['domestic'] }
                                    ]}
                                    clearable={false}
                                    onChange={this.onChangeCategory}
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
                                    options={carriers && this.showOptionCarrier(carriers)}
                                />
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
                                    name="approval_status"
                                    component={renderSelectField}
                                    options={[
                                        { value: '', label: messages['all'] },
                                        { value: 0, label: messages['pricing.new'] },
                                        { value: 1, label: messages['pricing.approved'] },
                                        { value: 2, label: messages['pricing.draft'] },
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
                <Row>
                    <Col md={12} className="text-right search-group-button">
                        <Button size="sm" outline onClick={(e) => {
                            reset();
                            setTimeout(() => {
                                handleSubmit();
                            }, 200);
                        }} >
                            {messages['clear']}</Button>
                        <Button size="sm" color="primary" id="search" >
                            {messages['search']}
                        </Button>
                    </Col>
                </Row>
            </form>
        );
    }
}

SearchForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    getCustomerPricingList: PropTypes.func.isRequired,
    getSalemanPricingList: PropTypes.func.isRequired,
    getCarrierPricingList: PropTypes.func.isRequired,
    getCountryList: PropTypes.func.isRequired,
    getCityList: PropTypes.func.isRequired,
    getDistrictList: PropTypes.func.isRequired,
    getWardList: PropTypes.func.isRequired,
    countries: PropTypes.array,
    cities: PropTypes.array,
    districts: PropTypes.array,
    wards: PropTypes.array,
    customers: PropTypes.array,
    approvedBys: PropTypes.array,
}

const mapStateToProps = ({ address, pricing, users }) => {
    const { customers, salemans, carriers } = pricing;
    const countries = address.country.items;
    const cities = address.city.items;
    const districts = address.district.items;
    const wards = address.ward.items;
    const approvedBys = users.user.items;
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
    form: 'pricing_search_form'
})(injectIntl(connect(mapStateToProps, {
    removeState,
    getCustomerPricingList,
    getSalemanPricingList,
    getCarrierPricingList,
    getCountryList,
    getCityList,
    getDistrictList,
    getWardList,
    getUserList
})(SearchForm)));