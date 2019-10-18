import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addUserItem, updateUserItem, toggleUserModal,changeTypeUserModal } from '../../../redux/actions';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../constants/defaultValues';
import PropTypes from 'prop-types';
class Action extends Component {

  handleSubmit = values => {
    if (!Array.isArray(values.roles) && values.roles) {
      values.roles = values.roles.split(',');
    } 
    const { modalType } = this.props;

    switch (modalType) {
      case MODAL_ADD:
        this.props.addUserItem(values);
        break;
      case MODAL_EDIT:
        this.props.updateUserItem(values);
        break;
      case MODAL_VIEW:
        this.props.changeTypeUserModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  }

  toggleModal = () => {
    this.props.toggleUserModal();
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
  addUserItem: PropTypes.func.isRequired,
  updateUserItem: PropTypes.func.isRequired,
  toggleUserModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({users}) => {
  const { modalType } = users.user;
  return {
    modalType
  }
}

export default connect(mapStateToProps, {
  addUserItem,
  updateUserItem,
  toggleUserModal,
  changeTypeUserModal
})(Action);