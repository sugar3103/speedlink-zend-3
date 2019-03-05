import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addCityItem, updateCityItem, toggleCityModal, changeTypeCityModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../../constants/defaultValues';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;
    switch (this.props.modalType) {
      case MODAL_ADD:
        this.props.addCityItem(values, messages);
        break;
      case MODAL_EDIT:
        this.props.updateCityItem(values, messages);
        break;
      case MODAL_VIEW:
        this.props.changeTypeCityModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  }

  toggleModal = () => {
    this.props.toggleCityModal();
  }

  render() {
    let className = 'success';
    
    switch (this.props.modalType) {
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
  addCityItem: PropTypes.func.isRequired,
  updateCityItem: PropTypes.func.isRequired,
  toggleCityModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ address }) => {
  const { modalType } = address.city;
  return {
    modalType
  }
}

export default injectIntl(connect(mapStateToProps, {
  addCityItem,
  updateCityItem,
  toggleCityModal,
  changeTypeCityModal
})(Action));