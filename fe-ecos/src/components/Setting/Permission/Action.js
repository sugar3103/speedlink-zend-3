import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addPermissionItem, updatePermissionItem, togglePermissionModal } from '../../../redux/actions';
import { injectIntl } from 'react-intl';
class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;    
    if (values.id) {
      this.props.updatePermissionItem(values,messages);
    } else {
      this.props.addPermissionItem(values,messages);
    }
  }

  toggleModal = () => {
    this.props.togglePermissionModal();
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
  addPermissionItem,
  updatePermissionItem,
  togglePermissionModal
})(Action));