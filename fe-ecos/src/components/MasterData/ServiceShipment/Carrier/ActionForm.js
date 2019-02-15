import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleCarrierModal } from '../../../../redux/actions';
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
    this.props.toggleCarrierModal();
  };
  componentWillReceiveProps(nextProps) {
      if (nextProps && nextProps.modalData) {
      const data = nextProps.modalData;
    }
  }
  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData } = this.props;
    const className = modalData ? 'primary' : 'success';
    const title = modalData ? messages['carrier.update'] : messages['carrier.add-new'];
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['carrier.code']}</span>
            <div className="form__form-group-field">
              <Field name="code" component={CustomField} type="text"
                     placeholder={messages['carrier.code']} messages={messages} />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['carrier.name']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field name="name" component={CustomField} type="text"
                     placeholder={messages['carrier.name']} messages={messages} />
            </div>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag us"></div>
              </div>
              <Field name="name_en" component={CustomField} type="text"
                     placeholder={messages['carrier.name-en']} messages={messages} />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['carrier.desc']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field name="description" component="textarea" type="text" placeholder={messages['carrier.desc']} />
            </div>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag us"></div>
              </div>
              <Field name="description_en" component="textarea" type="text" placeholder={messages['carrier.desc-en']} />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['carrier.status']}</span>
            <div className="form__form-group-field">
              <Field name="status" component={renderRadioButtonField} label={messages['active']} radioValue={1} defaultChecked />
              <Field name="status" component={renderRadioButtonField} label={messages['inactive']} radioValue={0} />
            </div>
          </div>
          {modalData &&
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['carrier.created-by']}</span>
              <div className="form__form-group-field">
                <Field name="created_by" component="input" type="text" disabled
                       placeholder={messages['carrier.created-by']} messages={messages}/>
              </div>
            </div>
          }
          {modalData &&
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['carrier.created-at']}</span>
              <div className="form__form-group-field">
                <Field name="created_at" component="input" type="text" disabled
                       placeholder={messages['carrier.created-at']} messages={messages}/>
              </div>
            </div>
          }
          {modalData &&
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['carrier.updated-by']}</span>
              <div className="form__form-group-field">
                <Field name="updated_by" component="input" type="text" disabled
                       placeholder={messages['carrier.updated-by']} messages={messages}/>
              </div>
            </div>
          }
          {modalData &&
            <div className="form__form-group">
              <span className="form__form-group-label">{messages['carrier.updated-at']}</span>
              <div className="form__form-group-field">
                <Field name="updated_at" component="input" type="text" disabled
                       placeholder={messages['carrier.updated-at']} messages={messages}/>
              </div>
            </div>
          }
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
  toggleCarrierModal: PropTypes.func.isRequired,
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
})(ActionForm)));