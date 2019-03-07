import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addZoneCodeItem, updateZoneCodeItem, toggleZoneCodeModal, changeTypeZoneCodeModal, removeState } from '../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../constants/defaultValues';
import { CITY_RESET_STATE, DISTRICT_RESET_STATE, WARD_RESET_STATE } from '../../../constants/actionTypes';

class Action extends Component {
  handleSubmit = values => {
    const { messages } = this.props.intl;
    const { modalType } = this.props;
    switch (modalType) {
      case MODAL_ADD:
        this.props.addZoneCodeItem(values, messages);
        break;
      case MODAL_EDIT:
        this.props.updateZoneCodeItem(values, messages);
        break;
      case MODAL_VIEW:
        this.props.changeTypeZoneCodeModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  };

  toggleModal = () => {
    this.props.removeState(CITY_RESET_STATE);
    this.props.removeState(DISTRICT_RESET_STATE);
    this.props.removeState(WARD_RESET_STATE);
    this.props.toggleZoneCodeModal();
  };

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
      <Modal isOpen={this.props.modalOpen} toggle={this.toggleModal}
             className={`modal-dialog--${className} modal-dialog--header  modal-custom-size`}>
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
}

Action.propTypes = {
  modalType: PropTypes.string,
  addZoneCodeItem: PropTypes.func.isRequired,
  updateZoneCodeItem: PropTypes.func.isRequired,
  toggleZoneCodeModal: PropTypes.func.isRequired,
  changeTypeZoneCodeModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ zoneCode }) => {
  const { modalType } = zoneCode;
  return { modalType };
};

export default injectIntl(connect(mapStateToProps, {
  addZoneCodeItem,
  updateZoneCodeItem,
  toggleZoneCodeModal,
  changeTypeZoneCodeModal,
  removeState
})(Action));