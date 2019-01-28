import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import classnames from 'classnames';
import {
  Button,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import IntlMessages from "../../../util/IntlMessages";

import { connect } from 'react-redux';
import { addBranchItem, updateBranchItem, toggleBranchModal, getCityListSelect, getHubListSelect,
      getWardListSelect, getDistrictListSelect, getCountryListSelect } from '../../../redux/actions';

class Action extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      code: '',
      name: '',
      name_en: '',
      description: '',
      description_en: '',
      status: 0,
      hub_id: 0,
      district_id: 1,
      ward_id: 1,
      city_id: 1,
      country_id: 1,
      errors: {},
      activeTab: '1',
    }
  }

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    //validate error
    if (nextProps && nextProps.error) {
      let errors = {};
      Object.keys(nextProps.error).forEach(function (item) {
        if (typeof nextProps.error[item] === 'object') {
          Object.keys(nextProps.error[item]).forEach(function (error) {
            errors[item] = nextProps.error[item][error];
          });
        }
      });
      this.setState({ errors });
      if ((!errors.name && errors.name_en) || (!errors.description && errors.description_en)) {
        this.setState({
          activeTab: '2'
        });
      } 
    } else {
      this.setState({ errors: {} });
    }

    if (nextProps && nextProps.modalData) {
      const data = nextProps.modalData;

      this.setState({
        id: data.branchId,
        code: data.code,
        name: data.name,
        name_en: data.nameEn,
        description: data.description,
        description_en: data.descriptionEn,
        hub_id: data.hubId,
        district_id: data.districtId,
        ward_id: data.wardId,
        city_id: data.cityId,
        country_id: data.countryId,
        status: data.status === 'Active' ? 1 : 0
      });
    } else {
      this.setState({
        id: '',
        code: '',
        name: '',
        name_en: '',
        description: '',
        description_en: '',
        status: 0,
        hub_id: 0,
        district_id: 1,
        ward_id: 1,
        city_id: 1,
        country_id: 1,
      });
    }

    //set tab with locale
    const tab = nextProps.locale === 'en' ? '2' : '1';
    this.setState({
      activeTab: tab,
    });

  }

  onChange = e => {
    const target = e.target;
    const { name, value } = target;
    if (this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState({
        [name]: value,
        errors
      });
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const branch = {
      code: this.state.code,
      name: this.state.name,
      name_en: this.state.name_en,
      description: this.state.description,
      description_en: this.state.description_en,
      hub_id: parseInt(this.state.hub_id, 10),
      district_id: parseInt(this.state.district_id, 10),
      ward_id: parseInt(this.state.ward_id, 10),
      city_id: parseInt(this.state.city_id, 10),
      country_id: parseInt(this.state.country_id, 10),
      status: parseInt(this.state.status, 10)
    }; 
     console.log(branch);

    if (this.state.id) {
      branch.id = this.state.id;
      this.props.updateBranchItem(branch);
    } else {
      this.props.addBranchItem(branch);
    }

    this.setState({
      id: '',
      code: '',
      name: '',
      name_en: '',
      description: '',
      description_en: '',
      status: 0,
      hub_id: 0,
      district_id: 1,
      ward_id: 1,
      city_id: 1,
      country_id: 1
    });
  }

  toggleModal = () => {
    this.props.toggleBranchModal()
  }

  showCityList = (cities) => {
    var result = null;
    if (cities.length > 0) {
      result = cities.map((city, index) => {
        return (
          <option key={index} value={city.cityId}>{city.name}</option>
        )
      })
    }
    return result;
  }

  showHubList = (cities) => {
    var result = null;
    if (cities.length > 0) {
      result = cities.map((city, index) => {
        return (
          <option key={index} value={city.hubId}>{city.name}</option>
        )
      })
    }
    return result;
  }

  showWardList = (wards) => {
    var result = null;
    if (wards.length > 0) {
      result = wards.map((ward, index) => {
        return (
          <option key={index} value={ward.wardId}>{ward.name}</option>
        )
      })
    }
    return result;
  }

  showDisctrictList = (districts) => {
    var result = null;
    if (districts.length > 0) {
      result = districts.map((district, index) => {
        return (
          <option key={index} value={district.districtId}>{district.name}</option>
        )
      })
    }
    return result;
  }

  showCountryList = (countries) => {
    var result = null;
    if (countries.length > 0) {
      result = countries.map((country, index) => {
        return (
          <option key={index} value={country.countryId}>{country.name}</option>
        )
      })
    }
    return result;
  }

  render() {
    const { messages } = this.props.intl;
    const { items, items_hub, item_city, item_country, item_district, item_ward } = this.props;
    const { id, code, name, name_en, description, description_en, status, city_id, hub_id, ward_id, district_id, country_id,  errors } = this.state;

    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={this.toggleModal}>
          {id ? <IntlMessages id="branch.update" /> : <IntlMessages id="branch.add-new" />}
        </ModalHeader>
        <ModalBody>
        <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggleTab('1'); }}
              >
                <IntlMessages id="setting.locale-vie" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggleTab('2'); }}
              >
                <IntlMessages id="setting.locale-eng" />
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Label className="mt-4">
              <IntlMessages id="branch.name" />
              </Label>
              <Input 
                type="text"
                name="name"
                value={name}
                placeholder={messages['branch.name']}
                onChange={this.onChange}
              />
              <div className="text-danger">{errors.name}</div>
              <Label className="mt-4">
                <IntlMessages id="branch.description" />
              </Label>
              <Input 
                type="textarea" 
                name="description"
                value={description}
                onChange={this.onChange}
              />
            </TabPane>
            <TabPane tabId="2">
              <Label className="mt-4">
              <IntlMessages id="branch.name" />
              </Label>
              <Input 
                type="text"
                name="name_en"
                value={name_en}
                placeholder={messages['branch.name']}
                onChange={this.onChange}
              />
              <div className="text-danger">{errors.name}</div>
              <Label className="mt-4">
                <IntlMessages id="branch.description" />
              </Label>
              <Input 
                type="textarea" 
                name="description_en"
                value={description_en}
                onChange={this.onChange}
              />
            </TabPane>
          </TabContent>
           <Label className="mt-4">
              <IntlMessages id="branch.code" />
              </Label>
              <Input 
                type="text"
                name="code"
                value={code}
                onChange={this.onChange}
              />
          <Label className="mt-4">
            <IntlMessages id="branch.status" />
          </Label>
          <Input 
            type="select"
            name="status"
            value={status}
            onChange={this.onChange}
          >
            <option value={1}>{messages['status.active']}</option>
            <option value={0}>{messages['status.inactive']}</option>
          </Input>

          <Label className="mt-4">
            <IntlMessages id="branch.hub" />
            </Label>
            <Input 
              type="select"
              name="hub_id"
              value={hub_id}
              onChange={this.onChange}
            >
            {items_hub && this.showHubList(items_hub)}
          </Input>

          <Label className="mt-4">
            <IntlMessages id="branch.city" />
            </Label>
            <Input 
              type="select"
              name="city_id"
              value={city_id}
              onChange={this.onChange}
            >
            {item_city && this.showCityList(item_city)}
          </Input>

          <Label className="mt-4">
            <IntlMessages id="branch.ward" />
            </Label>
            <Input 
              type="select"
              name="ward_id"
              value={ward_id}
              onChange={this.onChange}
            >
            {item_ward && this.showWardList(item_ward)}
          </Input>

          <Label className="mt-4">
            <IntlMessages id="branch.district" />
            </Label>
            <Input 
              type="select"
              name="district_id"
              value={district_id}
              onChange={this.onChange}
            >
            {item_district && this.showDisctrictList(item_district)}
          </Input>

          <Label className="mt-4">
            <IntlMessages id="branch.country" />
            </Label>
            <Input 
              type="select"
              name="country_id"
              value={country_id}
              onChange={this.onChange}
            >
            {item_country && this.showCountryList(item_country)}
          </Input>

        </ModalBody>
        <ModalFooter>
          <Button
            color="info"
            outline
            onClick={this.toggleModal}
          >
            <IntlMessages id="branch.cancel" />
          </Button>
          <Button color="info" onClick={this.onSubmit}>
            <IntlMessages id="branch.submit" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

Action.propTypes = {
  error: PropTypes.object,
  items: PropTypes.array,
  items_hub: PropTypes.array,
  item_city: PropTypes.array,
  item_ward: PropTypes.array,
  item_district: PropTypes.array,
  item_country: PropTypes.array,
  modalData: PropTypes.object,
  addBranchItem: PropTypes.func.isRequired,
  updateBranchItem: PropTypes.func.isRequired,
  toggleBranchModal: PropTypes.func.isRequired,
  getCityListSelect: PropTypes.func.isRequired,
  getHubListSelect: PropTypes.func.isRequired,
  getWardListSelect: PropTypes.func.isRequired,
  getDistrictListSelect: PropTypes.func.isRequired,
  getCountryListSelect: PropTypes.func.isRequired,

}

const mapStateToProps = ({ branch, address, hub })  => {
  const { error, modalData } = branch;
  const { items, item_city, item_ward, item_district, item_country } = address;
  const items_hub =  hub.items;
  return {
    error,
    modalData,
    items, item_city, item_ward, item_district, item_country,
    items_hub
  }
}

export default injectIntl(connect(mapStateToProps, {
  addBranchItem,
  updateBranchItem,
  toggleBranchModal,
  getCityListSelect,
  getHubListSelect,
  getWardListSelect,
  getDistrictListSelect,
  getCountryListSelect
})(Action));