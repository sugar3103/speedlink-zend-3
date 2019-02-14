import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addCarrierItem, updateCarrierItem, toggleCarrierModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {
  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateCarrierItem(values, messages);
    } else {
      this.props.addCarrierItem(values, messages);
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

Action.propTypes = {
  modalData: PropTypes.object,
  addCarrierItem: PropTypes.func.isRequired,
  updateCarrierItem: PropTypes.func.isRequired,
  toggleCarrierModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ carrier }) => {
  const { modalData } = carrier;
  return { modalData };
};

export default injectIntl(connect(mapStateToProps, {
  addCarrierItem,
  updateCarrierItem,
  toggleCarrierModal
})(Action));