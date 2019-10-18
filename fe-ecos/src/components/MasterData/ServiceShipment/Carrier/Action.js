import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addCarrierItem, updateCarrierItem, toggleCarrierModal,changeTypeCarrierModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../../constants/defaultValues';

class Action extends Component {
  handleSubmit = values => {
    switch (this.props.modalType) {
      case MODAL_ADD:
        this.props.addCarrierItem(values);
        break;
      case MODAL_EDIT:
        this.props.updateCarrierItem(values);
        break;
      case MODAL_VIEW:
        this.props.changeTypeCarrierModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  };

  toggleModal = () => {
    this.props.toggleCarrierModal();
  };

  render() {
    const { modalType } = this.props;
    let className = 'success';
    switch (modalType) {
      case MODAL_ADD:
        className = 'success';
        break;
      case MODAL_EDIT:
        className = 'primary';
        break;
      case MODAL_VIEW:
        className = 'info';
        break;
      default:
        break;
    }

    return (
      <Modal isOpen={this.props.modalOpen} toggle={this.toggleModal}
             className={`modal-dialog--${className} modal-dialog--header`}>
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
}

Action.propTypes = {
  modalType: PropTypes.string,
  addCarrierItem: PropTypes.func.isRequired,
  updateCarrierItem: PropTypes.func.isRequired,
  toggleCarrierModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ carrier }) => {
  const { modalType } = carrier;
  return { modalType };
};

export default connect(mapStateToProps, {
  addCarrierItem,
  updateCarrierItem,
  toggleCarrierModal,
  changeTypeCarrierModal
})(Action);