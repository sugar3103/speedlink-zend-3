import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleCountryModal } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
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
  }
  

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  toggleModal = () => {
    this.props.toggleCountryModal();
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData } = this.props;
    const { errors } = this.state;
    const className = modalData ? 'primary' : 'success';
    const title = modalData ? messages['country.update'] : messages['country.add-new'];
    
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
                    <span className="form__form-group-label">{messages['country.name']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="name"
                        component={CustomField}
                        type="text"
                        placeholder={messages['country.name']}
                        onChange={this.onChange}
                      />
                    </div>
                    {errors && errors.name && errors.name.countryExists && <span className="form__form-group-error">{messages['country.validate-name-exists']}</span>}
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['country.desc']}</span>
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
                    <span className="form__form-group-label">{messages['country.name-en']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="name_en"
                        component={CustomField}
                        type="text"
                        placeholder={messages['country.name-en']}
                        onChange={this.onChange}
                      />
                    </div>
                    {errors && errors.name_en && errors.name_en.countryExists && <span className="form__form-group-error">{messages['country.validate-nameEn-exists']}</span>}
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['country.desc-en']}</span>
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
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['country.status']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="status"
                    component={renderRadioButtonField}
                    label={messages['country.active']}
                    radioValue={1}
                    defaultChecked
                  />
                  <Field
                    name="status"
                    component={renderRadioButtonField}
                    label={messages['country.inactive']}
                    radioValue={0}                    
                  />
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['country.iso-code']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="iso_code"
                        component={CustomField}
                        type="text"
                        placeholder={messages['country.iso_code']}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['country.cancel']}</Button>{' '}
          <Button color={className} type="submit">{messages['country.save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

const mapStateToProps = ({address}) => {  
  const { errors, modalData } = address.country;
  return {
    errors,
    modalData
  }
}

export default reduxForm({
  form: 'country_action_form',
  validate  
})(injectIntl(connect(mapStateToProps, {
  toggleCountryModal
})(Action)));