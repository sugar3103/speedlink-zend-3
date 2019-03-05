import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addShipmentTypeItem, updateShipmentTypeItem, toggleShipmentTypeModal,changeTypeShipmentTypeModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../../constants/defaultValues';

class Action extends Component {
  handleSubmit = values => {
    const { messages } = this.props.intl;    
    switch (this.props.modalType) {
      case MODAL_ADD:
        this.props.addShipmentTypeItem(values, messages);
        break;
      case MODAL_EDIT:
        this.props.updateShipmentTypeItem(values, messages);
        break;
      case MODAL_VIEW:
        this.props.changeTypeShipmentTypeModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  };

  toggleModal = () => {
    this.props.toggleShipmentTypeModal();
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
             className={`modal-dialog--${className} modal-dialog--header modal-lg`}>
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
}

Action.propTypes = {
  modalType: PropTypes.object,
  addShipmentTypeItem: PropTypes.func.isRequired,
  updateShipmentTypeItem: PropTypes.func.isRequired,
  toggleShipmentTypeModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ shipment_type }) => {
  const { modalType } = shipment_type;
  return { modalType };
};

export default injectIntl(connect(mapStateToProps, {
  addShipmentTypeItem,
  updateShipmentTypeItem,
  toggleShipmentTypeModal,
  changeTypeShipmentTypeModal
})(Action));