import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Field } from 'redux-form';
import renderSelectField from '../../../containers/Shared/form/Select';
import { getCountryList } from '../../../redux/actions';

class Local extends Component {

    componentDidMount() {
        let params = {
            field: ['id', 'name', 'name_en'],
            offset: {
                limit: 0
            }
        }
        this.props.getCountryList(params);
    }

    showCountries(countries) {
        const { locale } = this.props.intl;
        
        const roles = countries.map(item => {
            return {
                'value': item.id,
                'label': (locale === 'en-US' && item.name_en) ? item.name_en : item.name
            }
        });

        return roles;
    }

    render() {
        const { messages } = this.props.intl;
        const { countries,data } = this.props;        
        
        return (
            <Fragment>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['address.country']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="country"
                            component={renderSelectField}
                            options={countries && this.showCountries(countries)}
                            placeholder={messages['please-select']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['address.city']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="city"
                            component={renderSelectField}
                            options={[
                                { value: 'one', label: 'One' },
                                { value: 'two', label: 'Two' },
                            ]}
                            placeholder={messages['please-select']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['address.district']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="district"
                            component={renderSelectField}
                            options={[
                                { value: 'one', label: 'One' },
                                { value: 'two', label: 'Two' },
                            ]}
                            placeholder={messages['please-select']}
                        />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['address.ward']}</span>
                    <div className="form__form-group-field">
                        <Field
                            name="ward"
                            component={renderSelectField}
                            options={[
                                { value: 'one', label: 'One' },
                                { value: 'two', label: 'Two' },
                            ]}
                            placeholder={messages['please-select']}
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


const mapStateToProps = ({ address }) => {
    const countries = address.country.items;
    return {
        countries
    }
}
export default injectIntl(connect(mapStateToProps, {
    getCountryList
})(Local));