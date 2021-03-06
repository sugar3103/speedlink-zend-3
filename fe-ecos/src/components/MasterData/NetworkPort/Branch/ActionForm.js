import React, { PureComponent, Fragment } from 'react';
import { Button, ButtonToolbar, Card, CardBody, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleBranchModal, changeTypeBranchModal, getCityBranchList, getDistrictBranchList, getWardBranchList, getCountryBranchList, getHubBranchList } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import renderSelectField from '../../../../containers/Shared/form/Select';
import validate from './validateActionForm';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_VIEW, MODAL_EDIT } from '../../../../constants/defaultValues';
import Moment from 'react-moment';
import Can from '../../../../containers/Shared/Can';

class ActionForm extends PureComponent {

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
        }
      }
      this.props.getCountryBranchList(paramsCountry, 'editview');
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
      this.props.getCityBranchList(paramsCity, 'editview');
    }

    if (data && data.district_id) {
      let paramsDistrict = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          city: data.city_id
        }
      }
      this.props.getDistrictBranchList(paramsDistrict, 'editview');
    }

    if ( (data && data.ward_id) || (data && data.district_id) ) {
      let paramsWard = {
        field: ['id', 'name', 'name_en'],
        offset: {
          limit: 0
        },
        query: {
          district: data.district_id
        }
      }
      this.props.getWardBranchList(paramsWard, 'editview');
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
    this.props.change('cities',null);
    this.props.change('districts',null);
    this.props.change('wards',null);
    this.props.getCityBranchList(params, 'onchange');
  }

  onChangeCity = values => {
    let params = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      },
      query: {
        city: values ? values : 0
      }
    }
    this.props.change('districts',null);
     this.props.change('wards',null);
    this.props.getDistrictBranchList(params, 'onchange');
  }

  onChangeDistrict = values => {
    let params = {
      field: ['id', 'name', 'name_en'],
      offset: {
        limit: 0
      },
      query: {
        district: values ? values : 0
      }
    }
    this.props.change('wards',null);
    this.props.getWardBranchList(params, 'onchange');
  }

  showOptions = (items) => {
    const { locale } = this.props.intl;
    const select_options = items.map(item => {
      return {
        'value': item.id,
        'label': locale ==='en-US' ? item.name_en : item.name
      }
    });
    return select_options;
  }

  showOptionsHub = (items) => {
    const { locale } = this.props.intl;
    const hubs = items.map(item => {
      return {
        'value': item.id,
        'label': locale ==='en-US' ? item.name_en : item.name
      }
    });
    return hubs;
  }

  toggleModal = () => {
    this.props.toggleBranchModal();
  }
  changeTypeModal = () => {
    this.props.changeTypeBranchModal(MODAL_VIEW);
  }

  render() {
    const { messages, locale } = this.props.intl;
    const { handleSubmit, modalData, modalType,  cities, countries, districts, wards, hubs } = this.props;
    let className = 'success';
    let title = messages['branch.add-new'];
    const disabled = modalType === MODAL_VIEW ? true : false;
    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        title = messages['branch.add-new'];
        break;
      case MODAL_EDIT:
        className = 'primary';
        title = messages['branch.update'];
        break;
      case MODAL_VIEW:
        className = 'info';
        title = messages['branch.view'];
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
                        name='name'
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
                        placeholder={messages['branch.name']}
                        disabled={disabled} 
                      />
                    </div>
                  </div>
                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['branch.code']}</span>
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
                    <span className="form__form-group-label">{messages['branch.hubcode']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="hub_id"
                        component={renderSelectField}
                        type="text"
                        options={hubs && this.showOptionsHub(hubs)}
                        onInputChange={this.onInputChange}
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
                    <span className="form__form-group-label">{messages['branch.country']}</span>
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
                    <span className="form__form-group-label">{messages['branch.city']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="city_id"
                        component={renderSelectField}
                        type="text"
                        options={cities && this.showOptions(cities)}
                        onChange={this.onChangeCity}
                        onInputChange={this.onInputChangeCity}
                        disabled={disabled} 
                      />
                    </div>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['branch.district']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="district_id"
                        component={renderSelectField}
                        type="text"
                        options={districts && this.showOptions(districts)}
                        onChange={this.onChangeDistrict}
                        onInputChange={this.onInputChangeDistrict}
                        disabled={disabled} 
                      />
                    </div>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['branch.ward']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="ward_id"
                        component={renderSelectField}
                        type="text"
                        options={wards && this.showOptions(wards)}
                        onChange={this.onChangeWard}
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
          </Row>
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
        </div>
        <ButtonToolbar className="modal__footer">
          {this.state.modalType === MODAL_VIEW &&
            <Button outline onClick={this.changeTypeModal}>{messages['cancel']}</Button>
          }
           <Can user={this.props.authUser.user} permission="branch" action="edit" own={modalData && modalData.created_by}>
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
  cities: PropTypes.array,
  districts: PropTypes.array,
  countries: PropTypes.array,
  wards: PropTypes.array,
  hubs: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  toggleBranchModal: PropTypes.func.isRequired,
  getCityBranchList: PropTypes.func.isRequired,
  getDistrictBranchList: PropTypes.func.isRequired,
  getCountryBranchList: PropTypes.func.isRequired,
  getWardBranchList: PropTypes.func.isRequired,
  getHubBranchList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ branch, authUser }) => {
  const { modalData, modalType, countries, cities, districts, wards } = branch;
  const { hubs } = branch ;

  return {
    modalData,
    modalType,
    countries, 
    cities, 
    districts,  
    wards, 
    hubs,
    authUser
  }
}

export default connect(mapStateToProps, {
  toggleBranchModal,
  changeTypeBranchModal,
  getCityBranchList,
  getDistrictBranchList,
  getCountryBranchList,
  getWardBranchList,
  getHubBranchList
})(reduxForm({ 
  form: 'branch_action_form', 
  validate
})(injectIntl(ActionForm)));