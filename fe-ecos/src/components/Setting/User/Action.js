import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addUserItem, updateUserItem, toggleUserModal } from '../../../redux/actions';

class Action extends Component {

  handleSubmit = values => {
    if (values.id) {
      this.props.updateUserItem(values);
    } else {
      this.props.addUserItem(values);
    }
  }

  toggleModal = () => {
    this.props.toggleUserModal();
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
  addUserItem,
  updateUserItem,
  toggleUserModal
})(Action);