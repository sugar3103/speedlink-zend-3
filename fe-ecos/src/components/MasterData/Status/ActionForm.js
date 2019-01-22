import React, { Component } from 'react';
import { Button, ButtonToolbar, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleStatusModal } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';
import classnames from 'classnames';
import validate from './validateActionForm';

class Action extends Component {

  constructor() {
    super();
    this.state = {
      activeTab: '1',
    };
  }

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  toggleModal = () => {
    this.props.toggleStatusModal();
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit } = this.props;

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
                      />
                    </div>
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
                        name="nameEn"
                        component={CustomField}
                        type="text"
                        placeholder={messages['status.name-en']}
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['status.desc-en']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="descriptionEn"
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
                    component={renderSelectField}
                    options={[
                      { value: 'one', label: 'One' },
                      { value: 'two', label: 'Two' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button onClick={this.toggleModal}>{messages['status.cancel']}</Button>{' '}
          <Button outline color="success" type="submit">{messages['status.save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

export default reduxForm({
  form: 'status_action_form',
  validate
})(injectIntl(connect(null, {
  toggleStatusModal
})(Action)));