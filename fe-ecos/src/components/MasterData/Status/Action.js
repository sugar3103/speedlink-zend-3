import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addStatusItem, updateStatusItem, toggleStatusModal } from '../../../redux/actions';

class Action extends Component {

  handleSubmit = values => {
    if (values.id) {
      this.props.updateStatusItem(values);
    } else {
      this.props.addStatusItem(values);
    }
  }

  toggleModal = () => {
    this.props.toggleStatusModal();
  }

  render() {
    const { modalData } = this.props;
    const className = modalData ? 'primary' : 'success';
    return (
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.toggleModal}
        className={`modal-dialog--${className} modal-dialog--header`}
      >
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
}

const mapStateToProps = ({status}) => {
  const { modalData } = status;
  return {
    modalData
  }
}

export default connect(mapStateToProps, {
  addStatusItem,
  updateStatusItem,
  toggleStatusModal
})(Action);