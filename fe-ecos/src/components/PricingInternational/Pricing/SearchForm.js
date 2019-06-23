import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import renderDatePickerField from '../../../containers/Shared/form/DatePicker';
import { Button, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import {
    removeState,
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
    
    render() {
        const { messages } = this.props.intl;
        const { handleSubmit, reset, countries, cities, districts, wards, customers, salemans, carriers, approvedBys } = this.props;
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
                                    onChange={this.hanldeChangeType}
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
                                    options={customers && this.showOptionCustomer(customers)}
                                    disabled={!this.state.showCustomerField}
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
                            <span className="form__form-group-label">{messages['pri_int.category']}</span>
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
                            <span className="form__form-group-label">{messages['pri_int.carrier']}</span>
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
                                    options={countries && this.showOption(countries)}
                                    onChange={this.onChangeCountry}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={3} lg={3} xl={3} xs={6}>
                        <div className="form__form-group">
                            <span className="form__form-group-label">{messages['pri_int.origin-city']}</span>
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
                            <span className="form__form-group-label">{messages['pri_int.origin-district']}</span>
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
                            <span className="form__form-group-label">{messages['pri_int.origin-ward']}</span>
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
                            <span className="form__form-group-label">{messages['pri_int.approved-status']}</span>
                            <div className="form__form-group-field">
                                <Field
                                    name="approval_status"
                                    component={renderSelectField}
                                    options={[
                                        { value: '', label: messages['all'] },
                                        { value: 0, label: messages['pri_int.new'] },
                                        { value: 1, label: messages['pri_int.approved'] },
                                        { value: 2, label: messages['pri_int.draft'] },
                                    ]}
                                    clearable={false}
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
    countries: PropTypes.array,
    cities: PropTypes.array,
    districts: PropTypes.array,
    wards: PropTypes.array,
    customers: PropTypes.array,
    approvedBys: PropTypes.array,
}

const mapStateToProps = ({ pricingInternational }) => {
    const { customer, country, city, district, ward, carrier } = pricingInternational;
    return {
        customer,
        carrier,
        country,
        city,
        district,
        ward,
    }
}

export default reduxForm({
    form: 'pricing_search_form'
})(injectIntl(connect(mapStateToProps, {
    removeState,
})(SearchForm)));