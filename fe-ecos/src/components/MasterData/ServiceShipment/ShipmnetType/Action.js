import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addShipmentTypeItem, updateShipmentTypeItem, toggleShipmentTypeModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {
  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateShipmentTypeItem(values, messages);
    } else {
      this.props.addShipmentTypeItem(values, messages);
    }
  };

  toggleModal = () => {
    this.props.toggleShipmentTypeModal();
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

Action.propTypes = {
  modalData: PropTypes.object,
  addShipmentTypeItem: PropTypes.func.isRequired,
  updateShipmentTypeItem: PropTypes.func.isRequired,
  toggleShipmentTypeModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ shipment_type }) => {
  const { modalData } = shipment_type;
  return { modalData };
};

export default injectIntl(connect(mapStateToProps, {
  addShipmentTypeItem,
  updateShipmentTypeItem,
  toggleShipmentTypeModal
})(Action));