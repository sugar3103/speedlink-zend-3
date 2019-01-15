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
import { addStatusItem, updateStatusItem, toggleStatusModal } from '../../../redux/actions';

class Action extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      name_en: '',
      description: '',
      description_en: '',
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
    if (nextProps && nextProps.modalData) {
      const data = nextProps.modalData;
      this.setState({
        id: data.status_id,
        name: data.name,
        name_en: data.name_en,
        description: data.description,
        description_en: data.description_en,
        status: data.status === 'Active' ? 1 : 0
      });
    } else {
      this.setState({
        id: '',
        name: '',
        name_en: '',
        description: '',
        description_en: '',
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
    const status = {
      name: this.state.name,
      name_en: this.state.name_en,
      description: this.state.description,
      description_en: this.state.description_en,
      status: parseInt(this.state.status, 10)
    };
    if (this.state.id) {
      status.id = this.state.id;
      this.props.updateStatusItem(status);
    } else {
      this.props.addStatusItem(status);
    }

    this.setState({
      id: '',
      name: '',
      name_en: '',
      description: '',
      description_en: '',
      status: 0,
    });

  }

  toggleModal = () => {
    this.props.toggleStatusModal()
  }

  render() {
    const { messages } = this.props.intl;
    const { id, name, name_en, description, description_en, status, errors } = this.state;
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={this.toggleModal}>
          {id ? <IntlMessages id="status.update" /> : <IntlMessages id="status.add-new" />}
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
                <IntlMessages id="status.name" />
              </Label>
              <Input 
                type="text"
                name="name"
                placeholder={messages['status.name']}
                value={name}
                onChange={this.onChange}
              />
              <div className="text-danger">{errors.name}</div>
              <Label className="mt-4">
                <IntlMessages id="status.description" />
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
                <IntlMessages id="status.name" />
              </Label>
              <Input 
                type="text"
                name="name_en"
                placeholder={messages['status.name']}
                value={name_en}
                onChange={this.onChange}
              />
              <div className="text-danger">{errors.name_en}</div>
              <Label className="mt-4">
                <IntlMessages id="status.description" />
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
            <IntlMessages id="status.status" />
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
        </ModalBody>
        <ModalFooter>
          <Button
            color="info"
            outline
            onClick={this.toggleModal}
          >
            <IntlMessages id="status.cancel" />
          </Button>
          <Button color="info" onClick={this.onSubmit}>
            <IntlMessages id="status.submit" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

Action.propTypes = {
  error: PropTypes.object,
  modalData: PropTypes.object,
  addStatusItem: PropTypes.func.isRequired,
  updateStatusItem: PropTypes.func.isRequired,
  toggleStatusModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ status, settings })  => {
  const { error, modalData } = status;
  const { locale } = settings;
  return {
    error,
    modalData,
    locale
  }
}

export default injectIntl(connect(mapStateToProps, {
  addStatusItem,
  updateStatusItem,
  toggleStatusModal
})(Action));