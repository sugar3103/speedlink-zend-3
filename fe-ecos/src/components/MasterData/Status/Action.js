import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addStatusItem, updateStatusItem, toggleStatusModal } from '../../../redux/actions';

class Action extends Component {

  handleSubmit = values => {
    this.props.addStatusItem(values);
  }

  toggleModal = () => {
    this.props.toggleStatusModal();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.toggleModal}
        className={`modal-dialog--success modal-dialog--header`}
      >
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
}

export default connect(null, {
  addStatusItem,
  updateStatusItem,
  toggleStatusModal
})(Action);