import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addBranchItem, updateBranchItem, toggleBranchModal, changeTypeBranchModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../../constants/defaultValues';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;  
    const { modalType } = this.props;
    switch (modalType) {
      case MODAL_ADD:
        this.props.addBranchItem(values, messages);
        break;
      case MODAL_EDIT:
        this.props.updateBranchItem(values, messages);
        break;
      case MODAL_VIEW:
        this.props.changeTypeBranchModal(MODAL_EDIT);
        break;
      default:
        break;
    }  
  }

  toggleModal = () => {
    this.props.toggleBranchModal();
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
  addBranchItem: PropTypes.func.isRequired,
  updateBranchItem: PropTypes.func.isRequired,
  toggleBranchModal: PropTypes.func.isRequired,
  changeTypeBranchModal: PropTypes.func.isRequired
}

const mapStateToProps = ({branch}) => {
  const { modalType } = branch;
  return {
    modalType
  }
}

export default injectIntl(connect(mapStateToProps, {
  addBranchItem,
  updateBranchItem,
  toggleBranchModal,
  changeTypeBranchModal
})(Action));