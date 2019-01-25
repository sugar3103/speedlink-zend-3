import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleCityModal, getCountryList } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../../containers/Shared/form/Select';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import classnames from 'classnames';
import validate from './validateActionForm';

class Action extends PureComponent {

  constructor() {
    super();
    this.state = {
      activeTab: '1',
      errors: {}
    };
  }

  onChange = (e) => {
    this.setState({
      errors: {}
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      const { errors } = nextProps;
      this.setState({
        errors: errors
      });
    }
  }

  componentDidMount() {
    const data = this.props.modalData;
    if (data) {
      this.props.initialize(data);
    }
    const params = {
      field: ['id', 'name'],
      offset: {
        limit: 10
      }
    }
    this.props.getCountryList(params);
  }

  onInputChange = value => {
    const params = {
      field: ['id', 'name'],
      offset: {
        limit: 10
      },
      query: {
        name: value
      }
    }
    this.props.getCountryList(params);
  }

  showOptionCountry = (items) => {
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

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  toggleModal = () => {
    this.props.toggleCityModal();
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData, countries } = this.props;
    const { errors } = this.state;
    const className = modalData ? 'primary' : 'success';
    const title = modalData ? messages['city.update'] : messages['city.add-new'];

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          <div className="tabs">
            <div className="tabs__wrap">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => {
                      this.toggleTab('1');
                    }}
                  >
                    {messages['layout.locale-vie']}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => {
                      this.toggleTab('2');
                    }}
                  >
                    {messages['layout.locale-eng']}
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['city.name']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="name"
                        component={CustomField}
                        type="text"
                        placeholder={messages['city.name']}
                        onChange={this.onChange}
                      />
                    </div>
                    {errors && errors.name && errors.name.cityExists && <span className="form__form-group-error">{messages['city.validate-name-exists']}</span>}
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['city.desc']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="description"
                        component="textarea"
                        type="text"
                      />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['city.name-en']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="name_en"
                        component={CustomField}
                        type="text"
                        placeholder={messages['city.name-en']}
                        onChange={this.onChange}
                      />
                    </div>
                    {errors && errors.name_en && errors.name_en.cityExists && <span className="form__form-group-error">{messages['city.validate-nameEn-exists']}</span>}
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['city.desc-en']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="description_en"
                        component="textarea"
                        type="text"
                      />
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['city.status']}</span>
            <div className="form__form-group-field">
              <Field
                name="status"
                component={renderRadioButtonField}
                label={messages['city.active']}
                radioValue={1}
                defaultChecked
              />
              <Field
                name="status"
                component={renderRadioButtonField}
                label={messages['city.inactive']}
                radioValue={0}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['city.zip-code']}</span>
            <div className="form__form-group-field">
              <Field
                name="zip_code"
                component={CustomField}
                type="text"
                placeholder={messages['city.zip_code']}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['city.country']}</span>
            <div className="form__form-group-field">
              <Field
                name="country_id"
                component={renderSelectField}
                type="text"
                options={countries && this.showOptionCountry(countries)}
                placeholder={messages['city.country']}
                onInputChange={this.onInputChange}
              />
            </div>
          </div>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['city.cancel']}</Button>{' '}
          <Button color={className} type="submit">{messages['city.save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

const mapStateToProps = ({ address }) => {
  const { errors, modalData } = address.city;
  const countries = address.country.items;
  return {
    errors,
    modalData,
    countries
  }
}

export default reduxForm({
  form: 'city_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleCityModal,
  getCountryList
})(Action)));