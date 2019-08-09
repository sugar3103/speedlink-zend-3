import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { toggleAreaSpecialModal, changeTypeAreaSpecialModal, addAreaSpecialItem, updateAreaSpecialItem } from '../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_EDIT, MODAL_VIEW } from '../../../constants/defaultValues';

class Action extends Component {

  handleSubmit = values => {
    switch (this.props.modalType) {
      case MODAL_ADD:
        this.props.addAreaSpecialItem(values);
        break;
      case MODAL_EDIT:
        this.props.updateAreaSpecialItem(values);
        break;
      case MODAL_VIEW:
        this.props.changeTypeAreaSpecialModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  }

  toggleModal = () => {
    this.props.toggleAreaSpecialModal();
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
  updateAreaSpecialItem: PropTypes.func.isRequired,
  toggleAreaSpecialModal: PropTypes.func.isRequired,
  addAreaSpecialItem: PropTypes.func.isRequired,
  changeTypeAreaSpecialModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ pricingSpecial }) => {
  const { area } = pricingSpecial;
  const { modalType } = area;
  return {
    modalType
  }
}

export default injectIntl(connect(mapStateToProps, {
  addAreaSpecialItem,
  updateAreaSpecialItem,
  toggleAreaSpecialModal,
  changeTypeAreaSpecialModal
})(Action));