import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addCustomerItem, updateCustomerItem, toggleCustomerModal, changeTypeCustomerModal } from '../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../constants/defaultValues';

class Action extends Component {

  handleSubmit = values => {
    switch (this.props.modalType) {
      case MODAL_ADD:
        this.props.addCustomerItem(values);
        break;
      case MODAL_EDIT:
        this.props.updateCustomerItem(values);
        break;
      case MODAL_VIEW:
        this.props.changeTypeCustomerModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  }

  toggleModal = () => {
    this.props.toggleCustomerModal();
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
  addCustomerItem: PropTypes.func.isRequired,
  updateCustomerItem: PropTypes.func.isRequired,
  toggleCustomerModal: PropTypes.func.isRequired,
  changeTypeCustomerModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ customer }) => {
  const { modalType } = customer;
  return {
    modalType
  }
}

export default injectIntl(connect(mapStateToProps, {
  addCustomerItem,
  updateCustomerItem,
  toggleCustomerModal,
  changeTypeCustomerModal
})(Action));