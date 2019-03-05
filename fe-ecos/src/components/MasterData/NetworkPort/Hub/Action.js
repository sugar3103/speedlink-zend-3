import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addHubItem, updateHubItem, toggleHubModal, changeTypeHubModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../../constants/defaultValues';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;
    const { modalType } = this.props;
    switch (modalType) {
      case MODAL_ADD:
        this.props.addHubItem(values, messages);
        break;
      case MODAL_EDIT:
        this.props.updateHubItem(values, messages);
        break;
      case MODAL_VIEW:
        this.props.changeTypeHubModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  }

  toggleModal = () => {
    this.props.toggleHubModal();
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
  addHubItem: PropTypes.func.isRequired,
  updateHubItem: PropTypes.func.isRequired,
  toggleHubModal: PropTypes.func.isRequired,
  changeTypeHubModal: PropTypes.func.isRequired
}


const mapStateToProps = ({hub}) => {
  const { modalType } = hub;
  return {
    modalType
  }
}

export default injectIntl(connect(mapStateToProps, {
  addHubItem,
  updateHubItem,
  toggleHubModal,
  changeTypeHubModal
})(Action));