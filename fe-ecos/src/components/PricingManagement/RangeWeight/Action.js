import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addRangeWeightItem, updateRangeWeightItem, toggleRangeWeightModal, changeTypeRangeWeightModal } from '../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../constants/defaultValues';


class Action extends Component {
  handleSubmit = values => {
    const { messages } = this.props.intl;
    const { modalType } = this.props;
    switch (modalType) {
      case MODAL_ADD:
        this.props.addRangeWeightItem(values, messages);
        break;
      case MODAL_EDIT:
        this.props.updateRangeWeightItem(values, messages);
        break;
      case MODAL_VIEW:
        this.props.changeTypeRangeWeightModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  };

  toggleModal = () => {
    this.props.toggleRangeWeightModal();
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
  addRangeWeightItem: PropTypes.func.isRequired,
  updateRangeWeightItem: PropTypes.func.isRequired,
  toggleRangeWeightModal: PropTypes.func.isRequired,
  changeTypeRangeWeightModal: PropTypes.func.isRequired
}

const mapStateToProps = ({ rangeWeight }) => {
  const { modalType } = rangeWeight;
  return { modalType };
};

export default injectIntl(connect(mapStateToProps, {
  addRangeWeightItem,
  updateRangeWeightItem,
  toggleRangeWeightModal,
  changeTypeRangeWeightModal
})(Action));