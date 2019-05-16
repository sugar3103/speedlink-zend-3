import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { toggleZoneDomesticModal, changeTypeZoneDomesticModal, addZoneDomesticItem, updateZoneDomesticItem } from '../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_EDIT, MODAL_VIEW } from '../../../constants/defaultValues';

class Action extends Component {

  handleSubmit = values => {
    switch (this.props.modalType) {
      case MODAL_ADD:
        this.props.addZoneDomesticItem(values);
        break;
      case MODAL_EDIT:
        this.props.updateZoneDomesticItem(values);
        break;
      case MODAL_VIEW:
        this.props.changeTypeZoneDomesticModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  }

  toggleModal = () => {
    this.props.toggleZoneDomesticModal();
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
  updateZoneDomesticItem: PropTypes.func.isRequired,
  toggleZoneDomesticModal: PropTypes.func.isRequired,
  addZoneDomesticItem: PropTypes.func.isRequired,
  changeTypeZoneDomesticModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ pricingDomestic }) => {
  const { zone } = pricingDomestic;
  const { modalType } = zone;
  return {
    modalType
  }
}

export default injectIntl(connect(mapStateToProps, {
  addZoneDomesticItem,
  updateZoneDomesticItem,
  toggleZoneDomesticModal,
  changeTypeZoneDomesticModal
})(Action));