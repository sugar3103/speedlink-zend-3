import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addWardItem, updateWardItem, toggleWardModal, changeTypeWardModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../../constants/defaultValues'; 
class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;    
    switch (this.props.modalType) {
      case MODAL_ADD:
        this.props.addWardItem(values, messages);
        break;
      case MODAL_EDIT:
        this.props.updateWardItem(values, messages);
        break;
      case MODAL_VIEW:
        this.props.changeTypeWardModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  }

  toggleModal = () => {
    this.props.toggleWardModal();
  }

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
      <Modal
        isOpen={this.props.modalOpen}
        toggle={this.toggleModal}
        className={`modal-dialog--${className} modal-dialog--header modal-lg`}
      >
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
}

Action.propTypes = {
  modalType: PropTypes.string,
  addWardItem: PropTypes.func.isRequired,
  updateWardItem: PropTypes.func.isRequired,
  toggleWardModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({address}) => {
  const { modalType } = address.ward;
  return {
    modalType
  }
}

export default injectIntl(connect(mapStateToProps, {
  addWardItem,
  updateWardItem,
  toggleWardModal,
  changeTypeWardModal
})(Action));