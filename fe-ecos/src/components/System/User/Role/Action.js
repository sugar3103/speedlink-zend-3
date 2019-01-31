import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addRoleItem, updateRoleItem, toggleRoleModal } from '../../../../redux/actions';
import { injectIntl } from 'react-intl';
class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;    
    if (values.id) {
      this.props.updateRoleItem(values,messages);
    } else {
      this.props.addRoleItem(values,messages);
    }
  }

  toggleModal = () => {
    this.props.toggleRoleModal();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.toggleModal}
        className={`modal-dialog--success modal-dialog--header modal-lg`}
      >
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
}

export default injectIntl(connect(null, {
  addRoleItem,
  updateRoleItem,
  toggleRoleModal
})(Action));