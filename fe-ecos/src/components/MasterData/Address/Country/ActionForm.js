import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleCountryModal } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import validate from './validateActionForm';
import PropTypes from 'prop-types';

class ActionForm extends Component {
  componentDidMount() {
    const data = this.props.modalData;
    if (data) {
      this.props.initialize(data);
    }
  }

  toggleModal = () => {
    this.props.toggleCountryModal();
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData } = this.props;
    const className = modalData ? 'primary' : 'success';
    const title = modalData ? messages['country.update'] : messages['country.add-new'];

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['name']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field
                name="name"
                component={CustomField}
                type="text"
                placeholder={messages['name']}
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
                placeholder={messages['name']}
                messages={messages}
              />
            </div>
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
                placeholder={messages['description']}
              />
            </div>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag us"></div>
              </div>
              <Field
                name="description_en"
                component="textarea"
                type="text"
                placeholder={messages['description']}
              />
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
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['country.iso-code']}</span>
            <div className="form__form-group-field">
              <Field
                name="iso_code"
                component={CustomField}
                type="text"
                placeholder={messages['country.iso_code']}
                messages={messages}
              />
            </div>
          </div>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['cancel']}</Button>{' '}
          <Button color={className} type="submit">{messages['save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

ActionForm.propTypes = {
  modalData: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  toggleCountryModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ address }) => {
  const { modalData } = address.country;
  return {
    modalData
  }
}

export default reduxForm({
  form: 'country_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleCountryModal
})(ActionForm)));