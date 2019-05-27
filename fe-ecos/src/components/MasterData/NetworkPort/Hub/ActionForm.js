import React, { Component, Fragment } from 'react';
import { Button, ButtonToolbar, Card, CardBody, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleHubModal, getCountryHubList, getCityHubList, changeTypeHubModal } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../../containers/Shared/form/Select';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_VIEW, MODAL_EDIT } from '../../../../constants/defaultValues';
import Moment from 'react-moment';
import Can from '../../../../containers/Shared/Can';

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
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        }
      }
      this.props.getCountryHubList(paramsCountry, 'editview');
    }
    if (data && data.city_id) {
      let paramsCity = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          country: data.country_id
        }
      }
      this.props.getCityHubList(paramsCity, 'editview');
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
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      },
      query: {
        country: values ? values : 0
      }
    }
    this.props.getCityHubList(params, 'onchange');
  }

  showOptions = (items) => {
    const { locale } = this.props.intl;
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: locale ==='en-US' ? item.name_en : item.name
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
    const { messages, locale } = this.props.intl;
    const { handleSubmit, modalType, modalData, countries, cities } = this.props;
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
                        options={countries && this.showOptions(countries)}
                        onChange={this.onChangeCountry}
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
            {modalData &&
                <Fragment>
                  <hr />
                  <Row>
                    <Col md={6}>
                      <span><i className="label-info-data">{messages['created-by']}:</i>{modalData.full_name_created ? modalData.full_name_created : modalData.created_by}</span>
                      <br />
                      <span><i className="label-info-data">{messages['created-at']}:</i>
                      <Moment fromNow locale={locale}>{new Date(modalData.created_at)}</Moment>
                      </span>
                    </Col>
                    {modalData.updated_at && 
                      <Col md={6}>
                        <span><i className="label-info-data">{messages['updated-by']}:</i>
                        {modalData.full_name_updated ? modalData.full_name_updated : modalData.updated_by}</span>
                        <br />
                        <span><i className="label-info-data">{messages['updated-at']}:</i>
                        <Moment fromNow locale={locale}>{new Date(modalData.updated_at)}</Moment>
                        </span>
                      </Col>
                    }
                  </Row>
                </Fragment>
              }
            </Col>
            
          </Row>
        </div>
        <ButtonToolbar className="modal__footer">
          {this.state.modalType === MODAL_VIEW &&
            <Button outline onClick={this.changeTypeModal}>{messages['cancel']}</Button>
          }
          <Can user={this.props.authUser.user} permission="hub" action="edit" own={modalData && modalData.created_by}>
          <Button color={className} type="submit">{ modalType === MODAL_VIEW ? messages['edit'] : messages['save']}</Button>
          </Can>
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
  getCityHubList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ hub, authUser }) => {
  const { modalData, modalType } = hub;
  const cities = hub.city_hub;
  const countries = hub.country_hub;
  return {
    modalData,
    modalType,
    countries,
    cities,
    authUser
  }
}

export default connect(mapStateToProps, {
  toggleHubModal,
  getCountryHubList,
  getCityHubList,
  changeTypeHubModal
})(reduxForm({ 
  form: 'hub_action_form', 
  validate
})(injectIntl(ActionForm)));