import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { toggleZoneSpecialModal, changeTypeZoneSpecialModal, addZoneSpecialItem, updateZoneSpecialItem } from '../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_EDIT, MODAL_VIEW } from '../../../constants/defaultValues';

class Action extends Component {

  handleSubmit = values => {
    switch (this.props.modalType) {
      case MODAL_ADD:
        this.props.addZoneSpecialItem(values, this.props.pageSize);
        break;
      case MODAL_EDIT:
        this.props.updateZoneSpecialItem(values, this.props.pageSize);
        break;
      case MODAL_VIEW:
        this.props.changeTypeZoneSpecialModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  }

  toggleModal = () => {
    this.props.toggleZoneSpecialModal();
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
  updateZoneSpecialItem: PropTypes.func.isRequired,
  toggleZoneSpecialModal: PropTypes.func.isRequired,
  addZoneSpecialItem: PropTypes.func.isRequired,
  changeTypeZoneSpecialModal: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
}

const mapStateToProps = ({ pricingSpecial }) => {
  const { zone } = pricingSpecial;
  const { modalType } = zone;
  return {
    modalType
  }
}

export default injectIntl(connect(mapStateToProps, {
  addZoneSpecialItem,
  updateZoneSpecialItem,
  toggleZoneSpecialModal,
  changeTypeZoneSpecialModal
})(Action));