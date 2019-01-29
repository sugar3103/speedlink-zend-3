import React, { PureComponent } from 'react';
import { Button, ButtonToolbar, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleBranchModal, getCityList, getDistrictList, getWardList, getCountryList, getHubList } from '../../../../redux/actions';
import { Field, reduxForm } from 'redux-form';
import CustomField from '../../../../containers/Shared/form/CustomField';
import renderRadioButtonField from '../../../../containers/Shared/form/RadioButton';
import renderSelectField from '../../../../containers/Shared/form/Select';
import validate from './validateActionForm';
import PropTypes from 'prop-types';

class ActionForm extends PureComponent {

  constructor() {
    super();
    this.state = {
      activeTab: '1',
    };
  }

  componentDidMount() {
    const data = this.props.modalData;
    this.props.initialize(data);
console.log(data);
    let paramsCountry = {
      field: ['id', 'name'],
      offset: {
        limit: 10
      }
    }
    if (data.country_id) {
      paramsCountry = {
        ...paramsCountry,
        offset: {
          limit: 0
        },
        query: {
          id: data.country_id
        }
      }
      this.props.getCountryList(paramsCountry);
    }
    // this.props.getCountryList(params);
    // if (data) {
    //   this.props.initialize(data);
    //   params = {
    //     ...params,
    //     offset: {
    //       limit: 0
    //     },
    //     query: {
    //       id: data.country_id
    //     }
    //   }
    //   this.props.getCountryList(params);

    //   if (data.country_id) {
    //     const paramsCity = {
    //       field: ['id', 'name'],
    //       offset: {
    //         limit: 10
    //       },
    //       query: {
    //         country: data.country_id
    //       }
    //     }
    //     this.props.getCityList(paramsCity);
    //   }
    // }
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

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  toggleModal = () => {
    this.props.toggleBranchModal();
  }

  render() {
    const { messages } = this.props.intl;
    const { handleSubmit, modalData, cities, countries, districts, wards, hubs } = this.props;
    const className = modalData ? 'primary' : 'success';
    const title = modalData ? messages['branch.update'] : messages['branch.add-new'];

    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="modal__header">
          <h4 className="bold-text  modal__title">{title}</h4>
        </div>
        <div className="modal__body">

          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.name']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field
                name="name"
                component={CustomField}
                type="text"
                placeholder={messages['branch.name']}
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
                placeholder={messages['branch.name-en']}
                messages={messages}
              />
            </div>
          </div>

          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.desc']}</span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <div className="flag vn"></div>
              </div>
              <Field
                name="description"
                component="textarea"
                type="text"
                placeholder={messages['branch.desc']}
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
                placeholder={messages['branch.desc-en']}
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
                placeholder={messages['branch.code']}
                messages={messages}
              />
            </div>
          </div>

          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.country']}</span>
            <div className="form__form-group-field">
              <Field
                name="country_id"
                component={renderSelectField}
                type="text"
                options={countries && this.showOptionsCountry(countries)}
                placeholder={messages['branch.country']}
                onChange={this.onChangeCountry}
                messages={messages}

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
                options={cities && this.showOptionsCity(cities)}
                placeholder={messages['branch.city']}
                onChange={this.onChangeCity}
                onInputChange={this.onInputChangeCity}
                messages={messages}
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
                options={districts && this.showOptionsDistrict(districts)}
                placeholder={messages['branch.district']}
                onChange={this.onChangeDistrict}
                onInputChange={this.onInputChangeDistrict}
                messages={messages}
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
                options={wards && this.showOptionsWard(wards)}
                placeholder={messages['branch.ward']}
                onChange={this.onChangeWard}
                // onInputChange={this.onInputChangeWard}
                messages={messages}
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
                placeholder={messages['branch.hubcode']}
                onInputChange={this.onInputChange}
                messages={messages}
              />
            </div>
          </div>

          <div className="form__form-group">
            <span className="form__form-group-label">{messages['branch.status']}</span>
            <div className="form__form-group-field">
              <Field
                name="status"
                component={renderRadioButtonField}
                label={messages['branch.active']}
                radioValue={1}
                defaultChecked
              />
              <Field
                name="status"
                component={renderRadioButtonField}
                label={messages['branch.inactive']}
                radioValue={0}
              />
            </div>
          </div>
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['branch.cancel']}</Button>{' '}
          <Button color={className} type="submit">{messages['branch.save']}</Button>
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
  handleSubmit: PropTypes.func.isRequired,
  toggleBranchModal: PropTypes.func.isRequired,
  getCityList: PropTypes.func.isRequired,
  getDistrictList: PropTypes.func.isRequired,
  getCountryList: PropTypes.func.isRequired,
  getWardList: PropTypes.func.isRequired,
  getHubList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ branch, address, hub }) => {
  const { modalData } = branch;
  const cities = address.city.items;
  const districts = address.district.items;
  const countries = address.country.items;
  const wards = address.ward.items;
  const hubs = hub.items;

  return {
    modalData,
    cities, districts, countries, wards, hubs
  }
}

export default reduxForm({
  form: 'branch_action_form',
  validate
})(injectIntl(connect(mapStateToProps, {
  toggleBranchModal,
  getCityList,
  getDistrictList,
  getCountryList,
  getWardList,
  getHubList
})(ActionForm)));