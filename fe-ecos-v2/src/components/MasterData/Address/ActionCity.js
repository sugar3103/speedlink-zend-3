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
import { addCityItem, updateCityItem, toggleCityModal } from '../../../redux/actions';

class ActionCity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      city_id: '',
      name: '',
      name_en: '',
      description: '',
      description_en: '',
      status: 0,
      zip_code: '',
      country_id: '',
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

    //show data in modal when dit
    if (nextProps && nextProps.modalCityData) {
      const data = nextProps.modalCityData;
      
      this.setState({
        city_id: data.cityId,
        name: data.name,
        name_en: data.nameEn,
        description: data.description,
        description_en: data.descriptionEn,
        status: data.status === 'Active' ? 1 : 0,
        zip_code: data.zipCode,
        country_id: data.countryId
      });
    } else {
      this.setState({
        city_id: '',
        name: '',
        name_en: '',
        description: '',
        description_en: '',
        status: 0,
        zip_code: '',
        country_id: ''
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
    const city = {
      name: this.state.name,
      name_en: this.state.name_en,
      description: this.state.description,
      description_en: this.state.description_en,
      zip_code: this.state.zip_code,
      country_id: this.state.country_id,
      status: parseInt(this.state.status, 10)
    };
    if (this.state.city_id) {
      city.city_id = this.state.city_id;
      this.props.updateCityItem(city);
    } else {
      this.props.addCityItem(city);
    }

    this.setState({
      city_id: '',
      name: '',
      name_en: '',
      description: '',
      description_en: '',
      zip_code: '',
      country_id: '',
      status: 0,
    });

  }

  toggleModal = () => {
    this.props.toggleCityModal()
  }

  render() {
    const { messages } = this.props.intl;
    const { city_id, name, name_en, description, description_en, zip_code, country_id, status, errors } = this.state;
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={this.toggleModal}>
          {city_id ? <IntlMessages id="city.update" /> : <IntlMessages id="city.add-new" />}
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
                <IntlMessages id="city.name" />
              </Label>
              <Input 
                type="text"
                name="name"
                placeholder={messages['city.name']}
                value={name}
                onChange={this.onChange}
              />
              <div className="text-danger">{errors.name}</div>
              <Label className="mt-4">
                <IntlMessages id="city.description" />
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
                <IntlMessages id="city.name" />
              </Label>
              <Input 
                type="text"
                name="name_en"
                placeholder={messages['city.name']}
                value={name_en}
                onChange={this.onChange}
              />
              <div className="text-danger">{errors.name_en}</div>
              <Label className="mt-4">
                <IntlMessages id="city.description" />
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
            <IntlMessages id="city.zip-code" />
          </Label>
          <Input 
            type="text" 
            name="zip_code"
            value={zip_code}
            onChange={this.onChange}
          />
          <Label className="mt-4">
            <IntlMessages id="city.country" />
          </Label>
          <Input 
            type="select"
            name="country"
            value={country_id}
            onChange={this.onChange}
          >
            <option value={1}>{messages['city.active']}</option>
            <option value={0}>{messages['city.inactive']}</option>
          </Input>
          <Label className="mt-4">
            <IntlMessages id="city.status" />
          </Label>
          <Input 
            type="select"
            name="status"
            value={status}
            onChange={this.onChange}
          >
            <option value={1}>{messages['city.active']}</option>
            <option value={0}>{messages['city.inactive']}</option>
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button
            color="info"
            outline
            onClick={this.toggleModal}
          >
            <IntlMessages id="city.cancel" />
          </Button>
          <Button color="info" onClick={this.onSubmit}>
            <IntlMessages id="city.submit" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ActionCity.propTypes = {
  error: PropTypes.object,
  modalCityData: PropTypes.object,
  addCityItem: PropTypes.func.isRequired,
  updateCityItem: PropTypes.func.isRequired,
  toggleCityModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ address, settings })  => {
  const { error, modalCityData } = address;
  const { locale } = settings;
  return {
    error,
    modalCityData,
    locale
  }
}

export default injectIntl(connect(mapStateToProps, {
  addCityItem,
  updateCityItem,
  toggleCityModal
})(ActionCity));