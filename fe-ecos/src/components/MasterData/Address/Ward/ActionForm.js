import React, { Component, Fragment } from 'react';
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleWardModal, getDistrictList, getCountryList, getCityList, changeTypeWardModal } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import Can from '../../../../containers/Shared/Can';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import renderSelectField from '../../../../containers/Shared/form/Select';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_VIEW, MODAL_EDIT } from '../../../../constants/defaultValues';
import Moment from 'react-moment';
class ActionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalType: '',
      country_disabled: true,
      district_disabled: true,
      city_disabled: true,
    }
  }
  componentDidMount() {
    const data = this.props.modalData;
    const { modalType } = this.props;

    if (modalType === MODAL_ADD)
      this.setState({ country_disabled: false })
    else if (modalType === MODAL_EDIT) {
      this.setState({
        country_disabled: false,
        city_disabled: false,
        district_disabled: false,
      });
    }
    if (data) {
      this.props.initialize(data);
    }

    let params = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      }
    }

    this.props.getCountryList();

    if (data && data.country_id) {
      params = { ...params, query: { country: data.country_id } }
      this.props.getCityList(params);
    }

    if (data && data.city_id) {
      params = { ...params, query: { city: data.city_id } }
      this.props.getDistrictList(params);
    }


  }

  onChangeCountry = value => {
    this.setState({
      district_disabled: true
    });
    this.props.change('city_id', '');
    this.props.change('district_id', '');

    if (value !== null) {
      const params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          country: value
        }
      }
      this.props.getCityList(params);
      this.setState({ city_disabled: false })
    }

  }

  onChangeCity = value => {
    this.props.change('district_id', '');
    if (value !== null) {
      const params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          city: value
        }
      }
      this.props.getDistrictList(params);
      this.setState({ district_disabled: false })
    }

  }

  showOption = (items) => {
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
    this.props.toggleWardModal();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.modalType !== this.props.modalType) {

      this.setState({
        modalType: prevProps.modalType,
        country_disabled: prevProps.modalType === MODAL_ADD ? true : false
      });
    }
  }

  changeTypeModal = () => {
    this.props.changeTypeWardModal(MODAL_VIEW);
  }

  componentWillUpdate(prevProps) {
    if (prevProps.modalType !== this.props.modalType) {
      const disabled = prevProps.modalType === MODAL_ADD ? true : false;
      this.setState({
        country_disabled: disabled,
        city_disabled: disabled,
        district_disabled: disabled,
      });
    }
  }
  render() {
    const { messages, locale } = this.props.intl;
    const { handleSubmit, modalType, modalData, cities, countries, districts } = this.props;

    let className = 'success';
    let title = messages['ward.add-new'];
    const disabled = modalType === MODAL_VIEW ? true : false;
    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        title = messages['ward.add-new'];
        break;
      case MODAL_EDIT:
        className = 'primary';
        title = messages['ward.update'];
        break;
      case MODAL_VIEW:
        className = 'info';
        title = messages['ward.view'];
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
                <span className="form__form-group-label">{messages['address.country']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="country_id"
                    component={renderSelectField}
                    type="text"
                    placeholder={messages['address.country']}
                    options={countries && this.showOption(countries)}
                    onChange={this.onChangeCountry}
                    disabled={this.state.country_disabled}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['address.city']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="city_id"
                    component={renderSelectField}
                    type="text"
                    placeholder={messages['address.city']}
                    options={cities && this.showOption(cities)}
                    onChange={this.onChangeCity}
                    disabled={this.state.city_disabled}
                  />
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">{messages['district.list']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="district_id"
                    component={renderSelectField}
                    type="text"
                    placeholder={messages['ward.district']}
                    options={districts && this.showOption(districts)}
                    disabled={this.state.district_disabled}
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
          <Can user={this.props.authUser.user} permission="masterdata_ward" action="edit" own={modalData && modalData.created_by}>
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
  districts: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  toggleWardModal: PropTypes.func.isRequired,
  getDistrictList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ address, authUser }) => {
  const { modalData, modalType } = address.ward;
  const districts = address.district.items;
  const countries = address.country.items;
  const cities = address.city.items;

  return {
    authUser,
    modalData,
    modalType,
    districts,
    countries,
    cities
  }
}

export default reduxForm({
  form: 'ward_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleWardModal,
  getDistrictList,
  getCountryList,
  getCityList,
  changeTypeWardModal
})(ActionForm)));