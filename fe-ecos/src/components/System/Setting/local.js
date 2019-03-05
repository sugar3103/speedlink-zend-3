import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Field } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import { getCountryList, getCityList, getDistrictList, getWardList } from '../../../redux/actions';

class Local extends Component {
    constructor() {
        super()

        this.state = {
            city_disable: true,
            district_disable: true,
            ward_disable: true,
        }
    }
    componentDidMount() {
        let params = {
            field: ['id', 'name', 'name_en'],
            offset: {
                limit: 0
            }
        }
        
        this.props.getCountryList(params);
        const {country,city,district} = this.props;
        if(country !== undefined) {
            this.handleChangeCountry(country);
        }
        if(city !== undefined) {
            this.handleChangeCity(city);
        }
        
        if(district !== undefined) {
            this.handleChangeDistrict(district);
        }        
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

    // handleChangeCountry
    handleChangeCountry = (selectedOption) => {
        const params = {
            field: ['id', 'name'],
            offset: {
                limit: 0
            },
            query: {
                country: selectedOption
            }
        }
        this.props.getCityList(params);
        this.setState({
            city_disable: false
        })
    }

    handleChangeCity = (selectedOption) => {
        const params = {
            field: ['id', 'name'],
            offset: {
                limit: 0
            },
            query: {
                city: selectedOption
            }
        }
        this.props.getDistrictList(params);
        this.setState({
            district_disable: false
        })
    }

    handleChangeDistrict = (selectedOption) => {
        const params = {
            field: ['id', 'name'],
            offset: {
                limit: 0
            },
            query: {
                district: selectedOption
            }
        }
        this.props.getWardList(params);
        this.setState({
            ward_disable: false
        })
    }

    render() {
        const { messages } = this.props.intl;
        const { countries, cities, districts, wards } = this.props;

        return (
            <Fragment>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['address.country']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="country"
                            component={renderSelectField}
                            options={countries && this.showItems(countries)}
                            placeholder={messages['please-select']}
                            onChange={this.handleChangeCountry}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['address.city']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="city"
                            component={renderSelectField}
                            options={cities && this.showItems(cities)}
                            placeholder={messages['please-select']}
                            disabled={this.state.city_disable}
                            onChange={this.handleChangeCity}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['address.district']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="district"
                            component={renderSelectField}
                            options={districts && this.showItems(districts)}
                            placeholder={messages['please-select']}
                            onChange={this.handleChangeDistrict}
                            disabled={this.state.district_disable}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['address.ward']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="ward"
                            component={renderSelectField}
                            options={wards && this.showItems(wards)}
                            placeholder={messages['please-select']}
                            disabled={this.state.ward_disable}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['language']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="language"
                            component={renderSelectField}
                            options={[
                                { value: 'vi', label: messages['vietnamese'] },
                                { value: 'en', label: messages['english'] },
                            ]}
                            placeholder={messages['please-select']}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = ({ address,setting }) => {
    const countries = address.country.items;
    const cities = address.city.items;
    const districts = address.district.items;
    const wards = address.ward.items;
    const country = setting.items.country;
    const city = setting.items.city;
    const district = setting.items.district;
    const ward = setting.items.ward;

    return {
        country,
        city,
        district,
        ward,
        countries,
        cities,
        districts,
        wards
    }
}
export default injectIntl(connect(mapStateToProps, {
    getCountryList,
    getCityList,
    getDistrictList,
    getWardList
})(Local));