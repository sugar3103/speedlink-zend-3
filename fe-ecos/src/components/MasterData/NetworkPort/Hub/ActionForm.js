import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleHubModal, getCityList } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import Select from '../../../../containers/Shared/form/Select';
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


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      const { errors } = nextProps;
      this.setState({
        errors: errors
      });
    }
  }

  componentDidMount() {
    this.props.getCityList();
    const data = this.props.modalData;     
    if (data) {
      this.props.initialize(data);
    }
  }
  

  showOptions = (items) => {
    const cities = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return cities;
  }

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  toggleModal = () => {
    this.props.toggleHubModal();
  }
  componentWillReceiveProps(nextProps) {
      if (nextProps && nextProps.modalData) {
      const data = nextProps.modalData;
      // console.log(data);
    }
  }
  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData } = this.props;
    const { errors } = this.state;
    const className = modalData ? 'primary' : 'success';
    const title = modalData ? messages['hub.update'] : messages['hub.add-new'];
    const {items} = this.props.city;

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
                    <span className="form__form-group-label">{messages['hub.name']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="name"
                        component={CustomField}
                        type="text"
                        placeholder={messages['hub.name']}
                        messages={messages}
                      />
                    </div>
                    {errors && errors.name && errors.name.hubExists && <span className="form__form-group-error">{messages['hub.validate-name-exists']}</span>}
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['hub.desc']}</span>
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
                    <span className="form__form-group-label">{messages['hub.name-en']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="name_en"
                        component={CustomField}
                        type="text"
                        placeholder={messages['hub.name-en']}
                        messages={messages}
                      />
                    </div>
                    {errors && errors.name_en && errors.name_en.hubExists && <span className="form__form-group-error">{messages['hub.validate-nameEn-exists']}</span>}
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['hub.desc-en']}</span>
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
                    <span className="form__form-group-label">{messages['hub.code']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="code"
                        component={CustomField}
                        type="text"
                        placeholder={messages['hub.code']}
                        messages={messages}
                      />
                    </div>
                    {errors && errors.code && errors.code.hubExists && <span className="form__form-group-error">{messages['hub.validate-code-exists']}</span>}
                  </div>

              <div className="form__form-group">
                <span className="form__form-group-label">{messages['hub.city']}</span>
                <div className="form__form-group-field">
                  <Field
                        name="city_id"
                        component={Select}
                        options={items && this.showOptions(items)}
                        placeholder={messages['hub.name']}
                        messages={messages}
                      />
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">{messages['hub.status']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="status"
                    component={renderRadioButtonField}
                    label={messages['hub.active']}
                    radioValue={1}
                    defaultChecked
                  />
                  <Field
                    name="status"
                    component={renderRadioButtonField}
                    label={messages['hub.inactive']}
                    radioValue={0}                    
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['hub.cancel']}</Button>{' '}
          <Button color={className} type="submit">{messages['hub.save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

const mapStateToProps = ({hub, address}) => {  
  const { errors, modalData } = hub;
  const { city } = address;
  return {
    errors,
    modalData,
    city
  }
}

export default reduxForm({
  form: 'hub_action_form',
  validate  
})(injectIntl(connect(mapStateToProps, {
  toggleHubModal,
  getCityList
})(Action)));