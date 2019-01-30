import React, { PureComponent } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { togglePermissionModal } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
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
    console.log(nextProps);
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
    this.props.togglePermissionModal();
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData } = this.props;
    const { errors } = this.props;
    const title = modalData ? messages['permission.update'] : messages['permission.add-new'];
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <button className="lnr lnr-cross modal__close-btn" onClick={this.toggleModal} />
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['permission.name']}</span>
            <div className="form__form-group-field">

              <Field
                name="name"
                component={CustomField}
                type="text"
                placeholder={messages['permissions.name']}
                onChange={this.onChange}
              />
            </div>
            {errors && errors.name && errors.name.permissionExists && <span className="form__form-group-error">{messages['permission.validate-name-exists']}</span>}
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['description']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field
                name="description"
                component="textarea"
                type="text"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['description']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag us"></div>
              </div>
              <Field
                name="description_en"
                component="textarea"
                type="text"
              />
            </div>
          </div>
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
  const { errors, modalData } = users.permission;
  return {
    errors,
    modalData
  }
}

export default reduxForm({
  form: 'permission_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  togglePermissionModal
})(Action)));