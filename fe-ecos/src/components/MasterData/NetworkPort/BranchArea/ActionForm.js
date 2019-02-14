import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Card, CardBody, Col, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleBranchAreaModal, getCityList, getDistrictList, getWardList, getCountryList, getHubList, getBranchList } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../../containers/Shared/form/Select';
import validate from './validateActionForm';
import PropTypes from 'prop-types';

class ActionForm extends PureComponent {
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

    if (data && data.district_id) {
      let paramsDistrict = {
        field: ['id', 'name'],
        offset: {
          limit: 0
        },
        query: {
          city: data.city_id
        }
      }
      this.props.getDistrictList(paramsDistrict);
    }

    if (data && data.ward_id) {
      let paramsWard = {
        field: ['id', 'name'],
        offset: {
          limit: 0
        },
        query: {
          district: data.district_id
        }
      }
      this.props.getWardList(paramsWard);
    }
  }

  onChangeBranch = values => {
    let params = {
      offset: {
        limit: 0
      },
      query: {
        id: values
      }
    }
    this.props.getBranchList(params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.branchs && nextProps.branchs.length === 1) {
      const branch = nextProps.branchs[0];
      const data2 = {
        branch_id: branch.id,
        branch_name: branch.name,
        hub_id: branch.hub_id,
        hub_code: branch.hub_code
      };
      this.props.initialize(data2);
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

  onChangeCity = values => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        city: values
      }
    }
    this.props.getDistrictList(params);
  }

  onChangeDistrict = values => {
    let params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      },
      query: {
        district: values
      }
    }
    this.props.getWardList(params);
  }

  showOptionsCity = (items) => {
    const cities = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return cities;
  }

  showOptionsDistrict = (items) => {
    const districts = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return districts;
  }

  showOptionsWard = (items) => {
    const wards = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return wards;
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

  showOptionsHub = (items) => {
    const hubs = items.map(item => {
      return {
        'value': item.id,
        'label': item.name
      }
    });
    return hubs;
  }

  showOptionsBranch = (items) => {
    const branchs = items.map(item => {
      return {
        'value': item.id,
        'label': item.code
      }
    });
    return branchs;
  }

  toggleModal = () => {
    this.props.toggleBranchAreaModal();
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData, cities, countries, districts, wards, hubs, branchs } = this.props;
    const className = modalData ? 'primary' : 'success';
    const title = modalData ? messages['brancharea.update'] : messages['brancharea.add-new'];

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          {/* <button className="lnr lnr-cross modal__close-btn" onClick={this.toggleModal} /> */}
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">

          <Row>
            <Col md={12} lg={6} xl={6} xs={12}>
              <Card>
                <CardBody>
                  <div className="card__title">
                    <h5 className="bold-text">Generate</h5>
                    <h5 className="subhead">Use default modal with property <span className="red-text">colored</span></h5>
                  </div>
                  {/* <div className="form__form-group">
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
                  </div> */}
                
               
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['branch.code']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="branch_id"
                        component={renderSelectField}
                        type="text"
                        options={branchs && this.showOptionsBranch(branchs)}
                        placeholder={messages['branch.code']}
                        // onInputChange={this.onInputChange}
                        onChange={this.onChangeBranch}
                        messages={messages}
                      />
                    </div>
                </div>
                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['branch.name']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="branch_name"
                        component={CustomField}
                        type="text"
                        placeholder={messages['branch.name']}
                        messages={messages}
                        disabled={true}
                      />
                    </div>
                </div>

                <div className="form__form-group">
                    <span className="form__form-group-label">{messages['brancharea.hubcode']}</span>
                    <div className="form__form-group-field">
                    
                      <Field
                        name="hub_code"
                        component={CustomField}
                        type="text"
                        placeholder={messages['brancharea.hubcode']}
                        messages={messages}
                        disabled={true}
                      />
                    </div>
                </div>
                <Field
                        name="hub_id"
                        component={CustomField}
                        type="hidden"
                        placeholder={messages['brancharea.hubcode']}
                        messages={messages}
                        disabled={true}
                      />
                {/* <div className="form__form-group">
                    <span className="form__form-group-label">{messages['brancharea.hubcode']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="hub_id"
                        component={renderSelectField}
                        type="text"
                        options={hubs && this.showOptionsHub(hubs)}
                        placeholder={messages['brancharea.hubcode']}
                        onInputChange={this.onInputChange}
                        messages={messages}
                        disabled={true}
                      />
                    </div>
                </div> */}

                </CardBody>
              </Card>
            </Col>
            <Col md={12} lg={6} xl={6} xs={12}>
              <Card>
                <CardBody>
                  <div className="card__title">
                    <h5 className="bold-text">Data</h5>
                    <h5 className="subhead">Use default modal with property <span className="red-text">colored</span></h5>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['brancharea.country']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="country_id"
                        component={renderSelectField}
                        type="text"
                        options={countries && this.showOptionsCountry(countries)}
                        placeholder={messages['brancharea.country']}
                        onChange={this.onChangeCountry}
                        messages={messages}

                      />
                    </div>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['brancharea.city']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="city_id"
                        component={renderSelectField}
                        type="text"
                        options={cities && this.showOptionsCity(cities)}
                        placeholder={messages['brancharea.city']}
                        onChange={this.onChangeCity}
                        // onInputChange={this.onInputChangeCity}
                        messages={messages}
                      />
                    </div>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['brancharea.district']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="district_id"
                        component={renderSelectField}
                        type="text"
                        options={districts && this.showOptionsDistrict(districts)}
                        placeholder={messages['brancharea.district']}
                        onChange={this.onChangeDistrict}
                        // onInputChange={this.onInputChangeDistrict}
                        messages={messages}
                      />
                    </div>
                  </div>

                  <div className="form__form-group">
                    <span className="form__form-group-label">{messages['brancharea.ward']}</span>
                    <div className="form__form-group-field">
                      <Field
                        name="ward_id"
                        component={renderSelectField}
                        type="text"
                        options={wards && this.showOptionsWard(wards)}
                        placeholder={messages['brancharea.ward']}
                        onChange={this.onChangeWard}
                        // onInputChange={this.onInputChangeWard}
                        messages={messages}
                      />
                    </div>
                  </div>

                
                  {/* <div className="form__form-group">
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
                  </div> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
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
  cities: PropTypes.array,
  districts: PropTypes.array,
  countries: PropTypes.array,
  wards: PropTypes.array,
  hubs: PropTypes.array,
  branchs: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  toggleBranchAreaModal: PropTypes.func.isRequired,
  getCityList: PropTypes.func.isRequired,
  getDistrictList: PropTypes.func.isRequired,
  getCountryList: PropTypes.func.isRequired,
  getWardList: PropTypes.func.isRequired,
  getHubList: PropTypes.func.isRequired,
  getBranchList:  PropTypes.func.isRequired
}

const mapStateToProps = ({ brancharea, address, hub, branch }) => {
  const { modalData } = brancharea;
  const cities = address.city.items;
  const districts = address.district.items;
  const countries = address.country.items;
  const wards = address.ward.items;
  const hubs = hub.items;
  const branchs = branch.items;
  return {
    modalData,
    cities, districts, countries, wards, hubs, branchs
  }
}

export default reduxForm({
  form: 'brancharea_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleBranchAreaModal,
  getCityList,
  getDistrictList,
  getCountryList,
  getWardList,
  getHubList,
  getBranchList
})(ActionForm)));