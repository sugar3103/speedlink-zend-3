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
import { addHubItem, updateHubItem, toggleHubModal, getCityListSelect } from '../../../redux/actions';

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
      city_id: 0,
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
        id: data.hubId,
        code: data.code,
        name: data.name,
        name_en: data.nameEn,
        description: data.description,
        description_en: data.descriptionEn,
        city_id: data.cityId,
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
        city_id: 0,
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
    const hub = {
      code: this.state.code,
      name: this.state.name,
      name_en: this.state.name_en,
      description: this.state.description,
      description_en: this.state.description_en,
      status: parseInt(this.state.status, 10),
      city_id: parseInt(this.state.city_id, 10)
    }; 
    // console.log(hub);

    if (this.state.id) {
      hub.id = this.state.id;
      this.props.updateHubItem(hub);
    } else {
      this.props.addHubItem(hub);
    }

    this.setState({
      id: '',
      code: '',
      name: '',
      name_en: '',
      description: '',
      description_en: '',
      status: 0,
      city_id: 0,
    });
  }

  toggleModal = () => {
    this.props.toggleHubModal()
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

  render() {
    const { messages } = this.props.intl;
    const { items } = this.props;
    const { id, code, name, name_en, description, description_en, status, city_id, errors } = this.state;
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={this.toggleModal}>
          {id ? <IntlMessages id="hub.update" /> : <IntlMessages id="hub.add-new" />}
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
              <IntlMessages id="hub.name" />
              </Label>
              <Input 
                type="text"
                name="name"
                value={name}
                placeholder={messages['hub.name']}
                onChange={this.onChange}
              />
              <div className="text-danger">{errors.name}</div>
              <Label className="mt-4">
                <IntlMessages id="hub.description" />
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
              <IntlMessages id="hub.name" />
              </Label>
              <Input 
                type="text"
                name="name_en"
                value={name_en}
                placeholder={messages['hub.name']}
                onChange={this.onChange}
              />
              <div className="text-danger">{errors.name}</div>
              <Label className="mt-4">
                <IntlMessages id="hub.description" />
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
              <IntlMessages id="hub.code" />
              </Label>
              <Input 
                type="text"
                name="code"
                value={code}
                onChange={this.onChange}
              />
          <Label className="mt-4">
            <IntlMessages id="hub.status" />
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
            <IntlMessages id="hub.city" />
            </Label>
            <Input 
              type="select"
              name="city_id"
              value={city_id}
              onChange={this.onChange}
            >
            {items && this.showCityList(items)}
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button
            color="info"
            outline
            onClick={this.toggleModal}
          >
            <IntlMessages id="hub.cancel" />
          </Button>
          <Button color="info" onClick={this.onSubmit}>
            <IntlMessages id="hub.submit" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

Action.propTypes = {
  error: PropTypes.object,
  items: PropTypes.array,
  modalData: PropTypes.object,
  addHubItem: PropTypes.func.isRequired,
  updateHubItem: PropTypes.func.isRequired,
  toggleHubModal: PropTypes.func.isRequired,
  getCityListSelect: PropTypes.func.isRequired
}

const mapStateToProps = ({ hub, address })  => {
  const { error, modalData } = hub;
  const { items } = address;
  return {
    error,
    modalData,
    items
  }
}

export default injectIntl(connect(mapStateToProps, {
  addHubItem,
  updateHubItem,
  toggleHubModal,
  getCityListSelect
})(Action));