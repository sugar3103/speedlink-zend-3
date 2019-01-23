import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import ActionForm from './ActionForm';

class Action extends Component {

  handleSubmit = values => {
    console.log(values);
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

export default Action;