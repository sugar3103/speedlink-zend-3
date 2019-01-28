import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleWardModal, getDistrictList } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import renderSelectField from '../../../../containers/Shared/form/Select';
import validate from './validateActionForm';
import PropTypes from 'prop-types';

class ActionForm extends Component {

  constructor() {
    super();
    this.state = {
      activeTab: '1',
    };
  }

  componentDidMount() {
    const data = this.props.modalData;
    if (data) {
      this.props.initialize(data);
    }

    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 5
      }
    }
    if (data && data.district_id) {
      params = { ...params, query: { id: data.district_id } }
    }

    this.props.getDistrictList(params);
  }

  onInputChange = value => {
    const params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        name: value
      }
    }
    this.props.getDistrictList(params);
  }

  showOptionDistrict = (items) => {
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

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  toggleModal = () => {
    this.props.toggleWardModal();
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData, districts } = this.props;
    const className = modalData ? 'primary' : 'success';
    const title = modalData ? messages['ward.update'] : messages['ward.add-new'];

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['ward.name']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field
                name="name"
                component={CustomField}
                type="text"
                placeholder={messages['ward.name']}
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
                placeholder={messages['ward.name-en']}
                messages={messages}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['ward.desc']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field
                name="description"
                component="textarea"
                type="text"
                placeholder={messages['ward.desc']}
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
                placeholder={messages['ward.desc-en']}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['ward.status']}</span>
            <div className="form__form-group-field">
              <Field
                name="status"
                component={renderRadioButtonField}
                label={messages['ward.active']}
                radioValue={1}
                defaultChecked
              />
              <Field
                name="status"
                component={renderRadioButtonField}
                label={messages['ward.inactive']}
                radioValue={0}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['ward.postal-code']}</span>
            <div className="form__form-group-field">
              <Field
                name="postal_code"
                component={CustomField}
                type="text"
                placeholder={messages['ward.postal-code']}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['ward.district']}</span>
            <div className="form__form-group-field">
              <Field
                name="district_id"
                component={renderSelectField}
                type="text"
                placeholder={messages['ward.district']}
                options={districts && this.showOptionDistrict(districts)}
                onInputChange={this.onInputChange}
                messages={messages}
              />
            </div>
          </div>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['ward.cancel']}</Button>{' '}
          <Button color={className} type="submit">{messages['ward.save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

ActionForm.propTypes = {
  modalData: PropTypes.object,
  districts: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  toggleWardModal: PropTypes.func.isRequired,
  getDistrictList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ address }) => {
  const { modalData } = address.ward;
  const districts = address.district.items;
  return {
    modalData,
    districts
  }
}

export default reduxForm({
  form: 'ward_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleWardModal,
  getDistrictList
})(ActionForm)));