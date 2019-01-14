import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import {
  Button,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
      description: '',
      status: 0,
      errors: {}
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
    } else {
      this.setState({ errors: {} });
    }

    if (nextProps && nextProps.modalData) {
      const data = nextProps.modalData;
      this.setState({
        id: data.status_id,
        name: data.name,
        description: data.description,
        status: data.status === 'Active' ? 1 : 0
      });
    }
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
      description: this.state.description,
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
      description: '',
      status: 0,
    });
  }

  toggleModal = () => {
    this.props.toggleStatusModal()
  }

  render() {
    const { messages } = this.props.intl;
    const { id, name, description, status, errors } = this.state;
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
          <Label>
            <IntlMessages id="status.name" />
          </Label>
          <Input 
            type="text"
            name="name"
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

const mapStateToProps = ({ status })  => {
  const { error, modalData } = status;
  return {
    error,
    modalData
  }
}

export default injectIntl(connect(mapStateToProps, {
  addStatusItem,
  updateStatusItem,
  toggleStatusModal
})(Action));