import React, { Component, Fragment } from 'react';
import { Button, ButtonToolbar, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleZoneSpecialModal, changeTypeZoneSpecialModal } from '../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';
import Can from '../../../containers/Shared/Can';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_EDIT, MODAL_VIEW } from '../../../constants/defaultValues';
import Moment from 'react-moment';

import {
  removeState,
  getAreaSpecialList,
  getCustomerSpecialList,
  getOriginCitySpecialList,
  getDestinationCitySpecialList,
  getDestinationDistrictCreateSpecialList,
  getDestinationWardCreateSpecialList
} from "../../../redux/actions";
import { PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_RESET_STATE, PRI_SPECIAL_DESTINATION_WARD_CREATE_RESET_STATE } from '../../../constants/actionTypes';


class ActionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalType: ''
    }
  }

  componentWillMount() {
    const params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      }
    };
    this.props.getAreaSpecialList(params);
    this.props.getCustomerSpecialList(params);

    const paramsAddress = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      },
      query: {
        country: 1
      }
    };
    this.props.getOriginCitySpecialList(paramsAddress);
    this.props.getDestinationCitySpecialList(paramsAddress);
  }

  componentDidMount() {
    const data = this.props.modalData;

    if (data) {
      this.props.initialize(data);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.modalType !== this.props.modalType) {
      this.setState({
        modalType: prevProps.modalType
      });
    }
  }

  onChangeDestinationCity = value => {
    this.props.change('to_district', null);
    this.props.change('to_ward', null);

    if (value) {
      let params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          city: value
        }
      }
      this.props.getDestinationDistrictCreateSpecialList(params);
    } else {
      this.props.removeState(PRI_SPECIAL_DESTINATION_DISTRICT_CREATE_RESET_STATE);
    }

    this.props.removeState(PRI_SPECIAL_DESTINATION_WARD_CREATE_RESET_STATE);
  }

  onChangeDestinationDistrict = value => {
    this.props.change('to_ward', null);
    if (value) {
      let params = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          district: value
        }
      }
      this.props.getDestinationWardCreateSpecialList(params);
    } else {
      this.props.removeState(PRI_SPECIAL_DESTINATION_WARD_CREATE_RESET_STATE);
    }
  }

  toggleModal = () => {
    this.props.toggleZoneSpecialModal();
  }

  changeTypeModal = () => {
    this.props.changeTypeZoneSpecialModal(MODAL_VIEW);
  }

  showOptions = items => {
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

  showOptionsAddress = items => {
    const { locale } = this.props.intl;
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: locale === 'en-US' ? item.name_en : item.name
        }
      })
    }
    return result;
  }

  render() {
    const { messages, locale } = this.props.intl;
    const { handleSubmit, modalType, modalData, area, customer, cityOrigin, cityDestination, districtDestination, wardDestination } = this.props;
    let className = 'success';
    let title = messages['pri_dom.add-new-zone'];
    const disabled = modalType === MODAL_VIEW ? true : false;
    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        title = messages['pri_dom.add-new-zone'];
        break;
      case MODAL_EDIT:
        className = 'primary';
        title = messages['pri_dom.update-zone'];
        break;
      case MODAL_VIEW:
        className = 'info';
        title = messages['status.view'];
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
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.customer']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="customer_id"
                    component={renderSelectField}
                    options={customer.items && this.showOptions(customer.items)}
                    placeholder={messages['pri_special.customer']}
                    clearable={false}
                    dsiabled={disabled}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.area-name']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="special_area_id"
                    component={renderSelectField}
                    options={area.items && this.showOptions(area.items)}
                    placeholder={messages['pri_special.area-name']}
                    clearable={false}
                    dsiabled={disabled}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.name']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="name"
                    component={CustomField}
                    type="text"
                    placeholder={messages['pri_special.name']}
                    disabled={disabled}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.name-en']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="name_en"
                    component={CustomField}
                    type="text"
                    placeholder={messages['pri_special.name-en']}
                    disabled={disabled}
                  />
                </div>
              </div>
            </Col>
            <Col md={12} lg={6} xl={6} xs={12}>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.origin-city']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="from_city"
                    component={renderSelectField}
                    options={cityOrigin && this.showOptionsAddress(cityOrigin)}
                    placeholder={messages['pri_special.city']}
                    clearable={false}
                    dsiabled={disabled}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.dest-city']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="to_city"
                    component={renderSelectField}
                    options={cityDestination && this.showOptionsAddress(cityDestination)}
                    placeholder={messages['pri_special.city']}
                    onChange={this.onChangeDestinationCity}
                    clearable={false}
                    dsiabled={disabled}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.dest-district']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="to_district"
                    component={renderSelectField}
                    options={districtDestination && this.showOptionsAddress(districtDestination)}
                    placeholder={messages['pri_special.district']}
                    onChange={this.onChangeDestinationDistrict}
                    clearable={false}
                    dsiabled={disabled}
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">{messages['pri_special.dest-ward']}</span>
                <div className="form__form-group-field">
                  <Field
                    name="to_ward"
                    component={renderSelectField}
                    options={wardDestination && this.showOptionsAddress(wardDestination)}
                    placeholder={messages['pri_special.ward']}
                    clearable={false}
                    dsiabled={disabled}
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
                      <span><i className="label-info-data">{messages['updated-by']}:</i>{modalData.full_name_updated ? modalData.full_name_updated : modalData.updated_by}</span>
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
          <Can user={this.props.authUser.user} permission="zone_special" action="edit" own={modalData && modalData.created_by}>
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
  authUser: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleZoneSpecialModal: PropTypes.func.isRequired,
  changeTypeZoneSpecialModal: PropTypes.func.isRequired,
  getAreaSpecialList: PropTypes.func.isRequired,
  getCustomerSpecialList: PropTypes.func.isRequired,
  getOriginCitySpecialList: PropTypes.func.isRequired,
  getDestinationCitySpecialList: PropTypes.func.isRequired,
  getDestinationDistrictCreateSpecialList: PropTypes.func.isRequired,
  getDestinationWardCreateSpecialList: PropTypes.func.isRequired
}

const mapStateToProps = ({ pricingSpecial, authUser }) => {
  const { zone, area, customer, city, district, ward } = pricingSpecial;
  const { modalData, modalType } = zone;
  const cityOrigin = city.origin;
  const cityDestination = city.destination;
  const districtDestination = district.destinationCreate;
  const wardDestination = ward.destinationCreate;
  return {
    modalData,
    modalType,
    authUser,
    area,
    customer,
    cityOrigin, cityDestination,
    districtDestination,
    wardDestination
  }
}

export default connect(mapStateToProps, {
  toggleZoneSpecialModal,
  changeTypeZoneSpecialModal,
  removeState,
  getAreaSpecialList,
  getCustomerSpecialList,
  getOriginCitySpecialList,
  getDestinationCitySpecialList,
  getDestinationDistrictCreateSpecialList,
  getDestinationWardCreateSpecialList,
})(reduxForm({
  form: 'zone_special_action_form',
  validate
})(injectIntl(ActionForm)));