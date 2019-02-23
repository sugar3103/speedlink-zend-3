import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addPermissionItem, updatePermissionItem, togglePermissionModal,changeTypePermissionModal } from '../../../../redux/actions';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../../constants/defaultValues';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;   
    const { modalType } = this.props;
    switch (modalType) {
      case MODAL_ADD:
        this.props.addPermissionItem(values, messages);
        break;
      case MODAL_EDIT:
        this.props.updatePermissionItem(values, messages);
        break;
      case MODAL_VIEW:
        this.props.changeTypePermissionModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  }

  toggleModal = () => {
    this.props.togglePermissionModal();
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
        className={`modal-dialog--${className} modal-dialog--header`}
      >
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
}

Action.propTypes = {
  modalType: PropTypes.string,  
  addPermissionItem: PropTypes.func.isRequired,
  updatePermissionItem: PropTypes.func.isRequired,
  togglePermissionModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ users }) => {
  const { modalType } = users.permission;
  return {
    modalType
  }
}

export default injectIntl(connect(mapStateToProps, {
  addPermissionItem,
  updatePermissionItem,
  togglePermissionModal,
  changeTypePermissionModal
})(Action));