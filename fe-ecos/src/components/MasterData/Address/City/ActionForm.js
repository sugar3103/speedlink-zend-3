import React, { Component, Fragment } from 'react';
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleCityModal, getCountryList, changeTypeCityModal } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import Can from '../../../../containers/Shared/Can';
import renderSelectField from '../../../../containers/Shared/form/Select';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../../constants/defaultValues';
import Moment from 'react-moment';

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

    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 5
      }
    }
    if (data && data.country_id) {
      params = { ...params, query: { id: data.country_id } }
    }

    this.props.getCountryList(params);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.modalType !== this.props.modalType) {
      this.setState({
        modalType: prevProps.modalType
      });
    }

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
    this.props.getCountryList(params);
  }

  showOptionCountry = (items) => {
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
    this.props.toggleCityModal();
  }
  changeTypeModal = () => {
    this.props.changeTypeCityModal(MODAL_VIEW);
  }

  render() {
    const { messages, locale } = this.props.intl;
    const { handleSubmit, modalType, modalData, countries } = this.props;
    let className = 'success';
    let title = messages['city.add-new'];
    const disabled = modalType === MODAL_VIEW ? true : false;
    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        title = messages['city.add-new'];
        break;
      case MODAL_EDIT:
        className = 'primary';
        title = messages['city.update'];
        break;
      case MODAL_VIEW:
        className = 'info';
        title = messages['city.view'];
        break;
      default:
        break;
    }

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">
          <Row>
            <Col md={12} lg={6} xl={6} xs={12}>
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
                    placeholder={messages['name']}
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
                    placeholder={messages['description']}
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
                    placeholder={messages['description']}
                    disabled={disabled}
                  />
                </div>
              </div>
            </Col>
            <Col md={12} lg={6} xl={6} xs={12}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['city.zip-code']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="zip_code"
                    component={CustomField}
                    type="text"
                    placeholder={messages['city.zip_code']}
                    disabled={disabled}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['city.country']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="country_id"
                    component={renderSelectField}
                    type="text"
                    options={countries && this.showOptionCountry(countries)}
                    placeholder={messages['city.country']}
                    onInputChange={this.onInputChange}
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
            </Col>
          </Row>
          <div className="footer">
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
                      <span><i className="label-info-data">{messages['updated-by']}:</i>{(modalData.full_name_updated !== " ") ? modalData.full_name_updated : modalData.updated_by}</span>
                      <br />
                      <span><i className="label-info-data">{messages['updated-at']}:</i>
                        <Moment fromNow locale={locale}>{new Date(modalData.updated_at)}</Moment>
                      </span>
                    </Col>
                  }
                </Row>
              </Fragment>
            }
          </div>
        </div>
        <ButtonToolbar className="modal__footer">
          {this.state.modalType === MODAL_VIEW &&
            <Button outline onClick={this.changeTypeModal}>{messages['cancel']}</Button>
          }
          <Can user={this.props.authUser.user} permission="masterdata_city" action="edit" own={modalData && modalData.created_by}>
            <Button color={className} type="submit">{modalType === MODAL_VIEW ? messages['edit'] : messages['save']}</Button>
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
  handleSubmit: PropTypes.func.isRequired,
  toggleCityModal: PropTypes.func.isRequired,
  getCountryList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ address, authUser }) => {
  const { modalData, modalType } = address.city;
  const countries = address.country.items;
  return {
    modalData,
    modalType,
    countries,
    authUser
  }
}

export default connect(mapStateToProps, {
  toggleCityModal,
  getCountryList,
  changeTypeCityModal
})(reduxForm({ 
  form: 'city_action_form', 
  validate
})(injectIntl(ActionForm)));