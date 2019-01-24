import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleUserModal } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderRadioButtonField from '../../../containers/Shared/form/RadioButton';
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
      data.status = data.status === 'Active' ? 1 : 0;
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
    this.props.toggleUserModal();
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit } = this.props;
    const { errors } = this.state;
    
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <button className="lnr lnr-cross modal__close-btn" onClick={this.toggleModal} />
          <h4 className="bold-text  modal__title">{messages['status.add-new']}</h4>
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
                    <span className="form__form-group-label">{messages['status.name']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="name"
                        component={CustomField}
                        type="text"
                        placeholder={messages['status.name']}
                        onChange={this.onChange}
                      />
                    </div>
                    {errors && errors.name && errors.name.statusExists && <span className="form__form-group-error">{messages['status.validate-name-exists']}</span>}
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['status.desc']}</span>
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
                    <span className="form__form-group-label">{messages['status.name-en']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="name_en"
                        component={CustomField}
                        type="text"
                        placeholder={messages['status.name-en']}
                        onChange={this.onChange}
                      />
                    </div>
                    {errors && errors.name_en && errors.name_en.statusExists && <span className="form__form-group-error">{messages['status.validate-nameEn-exists']}</span>}
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['status.desc-en']}</span>
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
                <span className="form__form-group-label">{messages['status.status']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="status"
                    component={renderRadioButtonField}
                    label={messages['status.active']}
                    radioValue={1}
                    defaultChecked
                  />
                  <Field
                    name="status"
                    component={renderRadioButtonField}
                    label={messages['status.inactive']}
                    radioValue={0}                    
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['status.cancel']}</Button>{' '}
          <Button color="success" type="submit">{messages['status.save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

const mapStateToProps = ({status}) => {  
  const { errors, modalData } = status;
  return {
    errors,
    modalData
  }
}

export default reduxForm({
  form: 'status_action_form',
  validate  
})(injectIntl(connect(mapStateToProps, {
  toggleUserModal
})(Action)));