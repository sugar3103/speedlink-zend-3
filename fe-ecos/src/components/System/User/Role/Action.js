import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addRoleItem, updateRoleItem, toggleRoleModal,changeTypeRoleModal } from '../../../../redux/actions';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../../constants/defaultValues';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;   
    const { modalType } = this.props;
    switch (modalType) {
      case MODAL_ADD:
        this.props.addRoleItem(values, messages);
        break;
      case MODAL_EDIT:
        this.props.updateRoleItem(values, messages);
        break;
      case MODAL_VIEW:
        this.props.changeTypeRoleModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  }

  toggleModal = () => {
    this.props.toggleRoleModal();
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
  modalData: PropTypes.object,
  addRoleItem: PropTypes.func.isRequired,
  updateRoleItem: PropTypes.func.isRequired,
  toggleRoleModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({users}) => {
  const { modalType } = users.role;
  return {
    modalType
  }
}

export default injectIntl(connect(mapStateToProps, {
  addRoleItem,
  updateRoleItem,
  toggleRoleModal,
  changeTypeRoleModal
})(Action));