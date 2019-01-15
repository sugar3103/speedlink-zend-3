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
import { addCountryItem, updateCountryItem, toggleCountryModal } from '../../../redux/actions';

class ActionCountry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      country_id: '',
      name: '',
      name_en: '',
      description: '',
      description_en: '',
      iso_code: '',
      status: 0,
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
    if (nextProps && nextProps.modalCountryData) {
      const data = nextProps.modalCountryData;
      
      this.setState({
        country_id: data.countryId,
        name: data.name,
        name_en: data.nameEn,
        description: data.description,
        description_en: data.descriptionEn,
        iso_code: data.isoCode,
        status: data.status === 'Active' ? 1 : 0
      });
    } else {
      this.setState({
        country_id: '',
        name: '',
        name_en: '',
        description: '',
        description_en: '',
        iso_code: '',
        status: 0,
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
    const country = {
      name: this.state.name,
      name_en: this.state.name_en,
      description: this.state.description,
      description_en: this.state.description_en,
      iso_code: this.state.iso_code,
      status: parseInt(this.state.status, 10)
    };
    if (this.state.country_id) {
      country.country_id = this.state.country_id;
      this.props.updateCountryItem(country);
    } else {
      this.props.addCountryItem(country);
    }

    this.setState({
      country_id: '',
      name: '',
      name_en: '',
      description: '',
      description_en: '',
      iso_code: '',
      status: 0,
    });

  }

  toggleModal = () => {
    this.props.toggleCountryModal()
  }

  render() {
    const { messages } = this.props.intl;
    const { country_id, name, name_en, description, description_en, iso_code, status, errors } = this.state;
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={this.toggleModal}>
          {country_id ? <IntlMessages id="country.update" /> : <IntlMessages id="country.add-new" />}
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
                <IntlMessages id="country.name" />
              </Label>
              <Input 
                type="text"
                name="name"
                placeholder={messages['country.name']}
                value={name}
                onChange={this.onChange}
              />
              <div className="text-danger">{errors.name}</div>
              <Label className="mt-4">
                <IntlMessages id="country.description" />
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
                <IntlMessages id="country.name" />
              </Label>
              <Input 
                type="text"
                name="name_en"
                placeholder={messages['country.name']}
                value={name_en}
                onChange={this.onChange}
              />
              <div className="text-danger">{errors.name_en}</div>
              <Label className="mt-4">
                <IntlMessages id="country.description" />
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
            <IntlMessages id="country.iso-code" />
          </Label>
          <Input 
            type="text" 
            name="iso_code"
            value={iso_code}
            onChange={this.onChange}
          />
          <Label className="mt-4">
            <IntlMessages id="country.status" />
          </Label>
          <Input 
            type="select"
            name="status"
            value={status}
            onChange={this.onChange}
          >
            <option value={1}>{messages['country.active']}</option>
            <option value={0}>{messages['country.inactive']}</option>
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button
            color="info"
            outline
            onClick={this.toggleModal}
          >
            <IntlMessages id="country.cancel" />
          </Button>
          <Button color="info" onClick={this.onSubmit}>
            <IntlMessages id="country.submit" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ActionCountry.propTypes = {
  error: PropTypes.object,
  modalCountryData: PropTypes.object,
  addCountryItem: PropTypes.func.isRequired,
  updateCountryItem: PropTypes.func.isRequired,
  toggleCountryModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ address, settings })  => {
  const { error, modalCountryData } = address;
  const { locale } = settings;
  return {
    error,
    modalCountryData,
    locale
  }
}

export default injectIntl(connect(mapStateToProps, {
  addCountryItem,
  updateCountryItem,
  toggleCountryModal
})(ActionCountry));