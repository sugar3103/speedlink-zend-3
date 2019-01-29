import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Card, CardBody, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleRoleModal, getPermissionList, getRoleList } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderCheckBoxField from '../../../containers/Shared/form/CheckBox';
import renderMultiSelectField from '../../../containers/Shared/form/MultiSelect';

import validate from './validateActionForm';
import classnames from 'classnames';

class Action extends PureComponent {

  constructor() {
    super();
    this.state = {
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
    //Param Permission
    this.props.getPermissionList();
    //Paran Role
    this.props.getRoleList();
    const data = this.props.modalData;
    if (data) {
      this.props.initialize(data);
    }
  }

  showOptions = (items) => {
    const roles = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });

    return roles;
  }

  
  toggleModal = () => {
    this.props.toggleRoleModal();
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData } = this.props;
    const { errors } = this.state;
    const className = modalData ? 'primary' : 'success';
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
              <Card>
                <CardBody>
                  <div className="card__title">
                    <h5 className="bold-text">Generate</h5>
                    {/* <h5 className="subhead">Use default modal with property <span className="red-text">colored</span></h5> */}
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['role.name']}</span>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <div className="flag vn"></div>
                      </div>
                      <Field
                        name="name"
                        component="input"
                        type="text"
                        placeholder={messages['role.name']}
                      />
                      {errors && errors.name && errors.name.roleExists && <span className="form__form-group-error">{messages['role.validate-name-exists']}</span>}
                    </div>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon">
                        <div className="flag us"></div>
                      </div>
                      <Field
                        name="name_en"
                        component="input"
                        type="text"
                        placeholder={messages['role.name']}
                      />
                      {errors && errors.name_en && errors.name_en.roleExists && <span className="form__form-group-error">{messages['role.validate-name-exists']}</span>}
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
                      />

                    </div>
                    <div className="form__form-group-field">
                      <div className="form__form-group-icon" align="center">
                        <div className="flag us"></div>
                      </div>
                      <Field
                        name="description"
                        component="textarea"
                        type="text"
                      />

                    </div>
                  </div>

                </CardBody>
              </Card>
            </Col>
            <Col md={12} lg={6} xl={6} xs={12}>
              <Card>
                <CardBody>
                  <div className="card__title">
                    <h5 className="bold-text">Data</h5>
                    {/* <h5 className="subhead">Use default modal with property <span className="red-text">colored</span></h5> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['cancel']}</Button>{' '}
          <Button color="success" type="submit">{messages['save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

const mapStateToProps = ({ users }) => {
  const { role, permission } = users;
  const { errors, modalData } = role;
  return {
    errors,
    modalData,
    permission,
    role
  }
}

export default reduxForm({
  form: 'role_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleRoleModal,
  getPermissionList,
  getRoleList
})(Action)));