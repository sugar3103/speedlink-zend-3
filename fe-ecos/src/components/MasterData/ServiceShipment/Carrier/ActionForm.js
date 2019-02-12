import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleCarrierModal } from '../../../../redux/actions';
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
  };

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
    this.props.toggleCarrierModal();
  };

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData } = this.props;
    const { errors } = this.state;
    const className = modalData ? 'primary' : 'success';
    const title = modalData ? messages['carrier.update'] : messages['carrier.add-new'];

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
                  <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                           onClick={() => { this.toggleTab('1'); }} >
                    {messages['layout.locale-vie']}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                           onClick={() => { this.toggleTab('2'); }} >
                    {messages['layout.locale-eng']}
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['carrier.name']}</span>
                    <div className="form__form-group-field">
                      <Field name="name" component={CustomField} type="text"
                             placeholder={messages['carrier.name']} onChange={this.onChange} />
                    </div>
                    {errors && errors.name && errors.name.carrierExists && <span className="form__form-group-error">{messages['carrier.validate-name-exists']}</span>}
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['carrier.desc']}</span>
                    <div className="form__form-group-field">
                      <Field name="description" component="textarea" type="text" />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['carrier.name-en']}</span>
                    <div className="form__form-group-field">
                      <Field name="name_en" component={CustomField} type="text"
                             placeholder={messages['carrier.name-en']} onChange={this.onChange} />
                    </div>
                    {errors && errors.name_en && errors.name_en.carrierExists && <span className="form__form-group-error">{messages['carrier.validate-nameEn-exists']}</span>}
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['carrier.desc-en']}</span>
                    <div className="form__form-group-field">
                      <Field name="description_en" component="textarea" type="text" />
                    </div>
                  </div>
                </TabPane>
              </TabContent>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['carrier.status']}</span>
                <div className="form__form-group-field">
                  <Field name="carrier" component={renderRadioButtonField}
                         label={messages['carrier.active']} radioValue={1} defaultChecked />
                  <Field name="carrier" component={renderRadioButtonField}
                         label={messages['carrier.inactive']} radioValue={0} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['carrier.cancel']}</Button>{' '}
          <Button color={className} type="submit">{messages['carrier.save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

const mapStateToProps = ({carrier}) => {  
  const { errors, modalData } = carrier;
  return {
    errors,
    modalData
  };
};

export default reduxForm({
  form: 'carrier_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleCarrierModal
})(Action)));