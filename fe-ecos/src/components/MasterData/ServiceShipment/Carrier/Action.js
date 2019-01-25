import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addCarrierItem, updateCarrierItem, toggleCarrierModal } from '../../../../redux/actions';

class Action extends Component {
  handleSubmit = values => {
    if (values.id) {
      this.props.updateCarrierItem(values);
    } else {
      this.props.addCarrierItem(values);
    }
  };

  toggleModal = () => {
    this.props.toggleCarrierModal();
  };

  render() {
    const { modalData } = this.props;
    const className = modalData ? 'primary' : 'success';
    return (
      <Modal isOpen={this.props.modalOpen} toggle={this.toggleModal}
             className={`modal-dialog--${className} modal-dialog--header`}>
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
}

const mapStateToProps = ({carrier}) => {
  const { modalData } = carrier;
  return {
    modalData
  };
};

export default connect(mapStateToProps, {
  addCarrierItem,
  updateCarrierItem,
  toggleCarrierModal
})(Action);