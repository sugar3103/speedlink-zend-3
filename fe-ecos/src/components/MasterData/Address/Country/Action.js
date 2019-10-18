import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addCountryItem, updateCountryItem, toggleCountryModal, changeTypeCountryModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_ADD, MODAL_VIEW, MODAL_EDIT } from '../../../../constants/defaultValues';
class Action extends Component {

  handleSubmit = values => {
    switch (this.props.modalType) {
      case MODAL_ADD:
        this.props.addCountryItem(values);
        break;
      case MODAL_EDIT:
        this.props.updateCountryItem(values);
        break;
      case MODAL_VIEW:
        this.props.changeTypeCountryModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  }

  toggleModal = () => {
    this.props.toggleCountryModal();
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
  modalData: PropTypes.object,
  modalType: PropTypes.string,
  addCountryItem: PropTypes.func.isRequired,
  updateCountryItem: PropTypes.func.isRequired,
  toggleCountryModal: PropTypes.func.isRequired,
  changeTypeCountryModal: PropTypes.func.isRequired
}


const mapStateToProps = ({address}) => {
  const { modalType } = address.country;
  return {
    modalType
  }
}

export default injectIntl(connect(mapStateToProps, {
  addCountryItem,
  updateCountryItem,
  toggleCountryModal,
  changeTypeCountryModal
})(Action));