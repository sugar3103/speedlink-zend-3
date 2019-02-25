import React, { PureComponent,Fragment } from 'react';
import { Button, ButtonToolbar, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleRoleModal, getPermissionList, getRoleListAll,changeTypeRoleModal } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import { MODAL_ADD, MODAL_VIEW, MODAL_EDIT } from '../../../../constants/defaultValues';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import CustomField from '../../../../containers/Shared/form/CustomField';
import CheckBoxGroup from '../../../../containers/Shared/form/CheckBoxGroup';
import PropTypes from 'prop-types';

import validate from './validateActionForm';

class ActionForm extends PureComponent {
  
  constructor() {
    super();
    this.state = {
      modalType: ''
    }
  }

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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.modalType !== this.props.modalType) {
      this.setState({
        modalType: prevProps.modalType
      });
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

  changeTypeModal = () => {
    this.props.changeTypeRoleModal(MODAL_VIEW);
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData, modalType,permissions } = this.props;
    
    let className = 'success';
    let title = messages['role.add-new'];
    const disabled = modalType === MODAL_VIEW ? true : false;
    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        title = messages['role.add-new'];
        break;
      case MODAL_EDIT:
        className = 'primary';
        title = messages['role.update'];
        break;
      case MODAL_VIEW:
        className = 'info';
        title = messages['role.view'];
        break;
      default:
        break;
    }
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
          {modalData &&
            <Fragment>
              <hr />
              <Row>
                <Col md={6}>
                  <span><i className="label-info-data">{messages['created-by']}:</i>{modalData.full_name_created}</span>
                  <br />
                  <span><i className="label-info-data">{messages['created-at']}:</i>{modalData.created_at}</span>
                </Col>
                {modalData.updated_at &&
                  <Col md={6}>
                    <span><i className="label-info-data">{messages['updated-by']}:</i>{modalData.full_name_updated}</span>
                    <br />
                    <span><i className="label-info-data">{messages['updated-at']}:</i>{modalData.updated_at}</span>
                  </Col>
                }
              </Row>
            </Fragment>
          }
        </div>
        <ButtonToolbar className="modal__footer">
          {this.state.modalType === MODAL_VIEW &&
            <Button outline onClick={this.changeTypeModal}>{messages['cancel']}</Button>
          }
          <Button color={className} type="submit">{ modalType === MODAL_VIEW ? messages['edit'] : messages['save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

ActionForm.propTypes = {
  modalData: PropTypes.object,
  modalType: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  toggleRoleModal: PropTypes.func.isRequired,
  changeTypeRoleModal: PropTypes.func.isRequired,
}


const mapStateToProps = ({ users }) => {
  const { role, permission } = users;  
  const { modalData, modalType } = role;
  const permissions = permission.items;
  return {
    modalData,
    modalType,
    permissions    
  }
}

export default reduxForm({
  form: 'role_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleRoleModal,
  getPermissionList,
  getRoleListAll,
  changeTypeRoleModal
})(ActionForm)));