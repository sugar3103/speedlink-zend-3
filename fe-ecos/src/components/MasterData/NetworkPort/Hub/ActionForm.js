import React, { Component } from 'react';
import { Button, ButtonToolbar, Nav, NavItem, NavLink, TabContent, TabPane  } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleHubModal, getCityList } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../../containers/Shared/form/Select';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
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
    if (data && data.city_id) {
      params = { ...params, query: { id: data.city_id } }
    }
    this.props.getCityList(params);
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
    this.props.getCityList(params);
  }


  showOptions = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
      return {
        value: item.id,
        label: item.name
      }
    });
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
    this.props.toggleHubModal();
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData, cities } = this.props;
    const className = modalData ? 'primary' : 'success';
    const title = modalData ? messages['hub.update'] : messages['hub.add-new'];

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['hub.name']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field
                name="name"
                component={CustomField}
                type="text"
                placeholder={messages['hub.name']}
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
                placeholder={messages['hub.name-en']}
                messages={messages}
              />
            </div>
          </div>

          <div className="form__form-group">
            <span className="form__form-group-label">{messages['hub.desc']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field
                name="description"
                component="textarea"
                type="text"
                placeholder={messages['hub.desc']}
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
                placeholder={messages['hub.desc-en']}
              />
            </div>
          </div>

          <div className="form__form-group">
            <span className="form__form-group-label">{messages['hub.code']}</span>
            <div className="form__form-group-field">
              <Field
                name="code"
                component={CustomField}
                type="text"
                placeholder={messages['hub.code']}
                messages={messages}
              />
            </div>
          </div>

              <div className="form__form-group">
                <span className="form__form-group-label">{messages['hub.city']}</span>
                <div className="form__form-group-field">
                  <Field
                        name="city_id"
                        component={renderSelectField}
                        type="text"
                        options={cities && this.showOptions(cities)}
                        placeholder={messages['hub.name']}
                        onInputChange={this.onInputChange}
                        messages={messages}
                      />
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">{messages['hub.status']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="status"
                    component={renderRadioButtonField}
                    label={messages['hub.active']}
                    radioValue={1}
                    defaultChecked
                  />
                  <Field
                    name="status"
                    component={renderRadioButtonField}
                    label={messages['hub.inactive']}
                    radioValue={0}                    
                  />
                </div>
              </div>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['hub.cancel']}</Button>{' '}
          <Button color={className} type="submit">{messages['hub.save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

ActionForm.propTypes = {
  modalData: PropTypes.object,
  cities: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  toggleHubModal: PropTypes.func.isRequired,
  getCityList: PropTypes.func.isRequired,
}

const mapStateToProps = ({hub, address}) => {  
  const { modalData } = hub;
  const cities  = address.city.items;
  return {
    modalData,
    cities
  }
}

export default reduxForm({
  form: 'hub_action_form',
  validate  
})(injectIntl(connect(mapStateToProps, {
  toggleHubModal,
  getCityList
})(ActionForm)));