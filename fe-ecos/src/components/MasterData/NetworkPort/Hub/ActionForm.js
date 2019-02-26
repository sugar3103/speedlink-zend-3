import React, { Component } from 'react';
import { Button, ButtonToolbar, Card, CardBody, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleHubModal, getCountryList, getCityList, changeTypeHubModal } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../../containers/Shared/form/Select';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_VIEW, MODAL_EDIT } from '../../../../constants/defaultValues';


class ActionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalType: ''
    }
  }

  componentDidMount() {
    const data = this.props.modalData;

    if (data) {
      this.props.initialize(data);
    }
    if (data && data.country_id) {
      let paramsCountry = {
        offset: {
          limit: 0
        },
        query: {
          id: data.country_id
        }
      }
      this.props.getCountryList(paramsCountry);
    }
    if (data && data.city_id) {
      let paramsCity = {
        field: ['id', 'name'],
        offset: {
          limit: 0
        },
        query: {
          country: data.country_id
        }
      }
      this.props.getCityList(paramsCity);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.modalType !== this.props.modalType) {
      this.setState({
        modalType: prevProps.modalType
      });
    }
  }

  onChangeCountry = values => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        country: values
      }
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

  showOptionsCountry = (items) => {
    const Countries = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return Countries;
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

  toggleModal = () => {
    this.props.toggleHubModal();
  }
  changeTypeModal = () => {
    this.props.changeTypeHubModal(MODAL_VIEW);
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalType, modalData, countries, cities } = this.props;
    // const className = modalData ? 'primary' : 'success';
    // const title = modalData ? messages['hub.update'] : messages['hub.add-new'];
    let className = 'success';
    let title = messages['hub.add-new'];
    const disabled = modalType === MODAL_VIEW ? true : false;
    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        title = messages['hub.add-new'];
        break;
      case MODAL_EDIT:
        className = 'primary';
        title = messages['hub.update'];
        break;
      case MODAL_VIEW:
        className = 'info';
        title = messages['hub.view'];
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
              <Card>
                <CardBody>
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
                        messages={messages}
                        disabled={disabled} 
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
                        messages={messages}
                        disabled={disabled} 
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
                        disabled={disabled} 
                       
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
                        disabled={disabled} 
                      />
                    </div>
                  </div>


                </CardBody>
              </Card>
            </Col>
            <Col md={12} lg={6} xl={6} xs={12}>
              <Card>
                <CardBody>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['hub.code']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="code"
                        component={CustomField}
                        type="text"
                        messages={messages}
                        disabled={disabled} 
                      />
                    </div>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['hub.country']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="country_id"
                        component={renderSelectField}
                        type="text"
                        options={countries && this.showOptionsCountry(countries)}
                        onChange={this.onChangeCountry}
                        messages={messages}
                        disabled={disabled} 
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
                        disabled={disabled} 
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
                        disabled={disabled} 
                      />
                      <Field
                        name="status"
                        component={renderRadioButtonField}
                        label={messages['inactive']}
                        radioValue={0}
                        disabled={disabled} 
                      />
                    </div>
                  </div>

                </CardBody>
              </Card>
            </Col>
            <Col md={12} lg={12} xl={12} xs={12}>
            { modalData ?
              <span><u>{ modalData.updated_by ? "Update at: "+modalData.updated_at : "Created at: "+modalData.created_at } 
              &nbsp;- { modalData.updated_by ? "Update by: "+modalData.user_update_name : "Created by: "+modalData.user_create_name }</u></span>
             : '' }
            </Col>
          </Row>
        </div>
        {/* <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['cancel']}</Button>{' '}
          <Button color={className} type="submit">{messages['save']}</Button>
        </ButtonToolbar> */}
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
  countries: PropTypes.array,
  cities: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  toggleHubModal: PropTypes.func.isRequired,
  getCityList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ hub, address }) => {
  const { modalData, modalType } = hub;
  const cities = address.city.items;
  const countries = address.country.items;
  return {
    modalData,
    modalType,
    countries,
    cities
  }
}

export default reduxForm({
  form: 'hub_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleHubModal,
  getCountryList,
  getCityList,
  changeTypeHubModal
})(ActionForm)));