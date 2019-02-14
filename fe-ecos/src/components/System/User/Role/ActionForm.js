import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleRoleModal, getPermissionList, getRoleListAll } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';

import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import CustomField from '../../../../containers/Shared/form/CustomField';
import CheckBoxGroup from '../../../../containers/Shared/form/CheckBoxGroup';

import validate from './validateActionForm';

class Action extends PureComponent {

  componentDidMount() {
    //Param Permission
    let param = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      }
    };
    this.props.getPermissionList(param);
    //Paran Role
    this.props.getRoleListAll(param);

    const data = this.props.modalData;
    if (data) {
      this.props.initialize(data);
    }
  }

  showPermissionOption = (items) => {
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

  toggleModal = () => {
    this.props.toggleRoleModal();
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData } = this.props;
    const className = modalData ? 'primary' : 'success';
    const { permissions } = this.props;
    const title = modalData ? messages['role.update'] : messages['role.add-new'];
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <button className="lnr lnr-cross modal__close-btn" onClick={this.toggleModal} />
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          <Row>
            <Col md={12} lg={6} xl={6} xs={12}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['role.name']}</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <div className="flag vn"></div>
                  </div>
                  <Field
                    name="name"
                    component={CustomField}
                    type="text"
                    placeholder={messages['role.name']}
                    messages={messages}
                  />
                </div>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <div className="flag us"></div>
                  </div>
                  <Field
                    name="name_en"
                    component={CustomField}
                    type="text"
                    placeholder={messages['role.name']}
                    messages={messages}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['description']}</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon" align="center">
                    <div className="flag vn"></div>
                  </div>
                  <Field
                    name="description"
                    component="textarea"
                    type="text"
                    placeholder={messages['description']}
                    messages={messages}
                  />

                </div>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon" align="center">
                    <div className="flag us"></div>
                  </div>
                  <Field
                    name="description_en"
                    component="textarea"
                    type="text"
                    placeholder={messages['description']}
                    messages={messages}
                  />
                </div>
              </div>
            </Col>
            <Col md={12} lg={6} xl={6} xs={12}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['permission.list']}</span>
                <div className="form__form-group-field">
                  {permissions &&
                    <CheckBoxGroup 
                      name="inherit_roles" 
                      options={this.showPermissionOption(permissions)} 
                      messages={messages}
                    />
                  }
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['status']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="status"
                    component={renderRadioButtonField}
                    label={messages['active']}
                    radioValue={1}
                    defaultChecked
                  />
                  <Field
                    name="status"
                    component={renderRadioButtonField}
                    label={messages['inactive']}
                    radioValue={0}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['cancel']}</Button>{' '}
          <Button color={className} type="submit">{messages['save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

const mapStateToProps = ({ users }) => {
  const { role, permission } = users;
  const { modalData } = role;
  const permissions = permission.items;
  return {
    modalData,
    permissions,
    role
  }
}

export default reduxForm({
  form: 'role_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleRoleModal,
  getPermissionList,
  getRoleListAll
})(Action)));