import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addUserItem, updateUserItem, toggleUserModal } from '../../../redux/actions';
import { injectIntl } from 'react-intl';
class Action extends Component {

  handleSubmit = values => {
    if (!Array.isArray(values.roles)) {
      values.roles = values.roles.split(',');
    } 
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateUserItem(values,messages);
    } else {
      this.props.addUserItem(values,messages);
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

export default injectIntl(connect(null, {
  addUserItem,
  updateUserItem,
  toggleUserModal
})(Action));