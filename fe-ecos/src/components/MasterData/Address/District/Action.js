import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addDistrictItem, updateDistrictItem, toggleDistrictModal,changeTypeDistrictModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';
import { MODAL_EDIT, MODAL_ADD, MODAL_VIEW } from '../../../../constants/defaultValues';

class Action extends Component {

  handleSubmit = values => {
    console.log(values);
    
    switch (this.props.modalType) {
      case MODAL_ADD:
        this.props.addDistrictItem(values);
        break;
      case MODAL_EDIT:
        this.props.updateDistrictItem(values);
        break;
      case MODAL_VIEW:
        this.props.changeTypeDistrictModal(MODAL_EDIT);
        break;
      default:
        break;
    }
  }

  toggleModal = () => {
    this.props.toggleDistrictModal();
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
  addDistrictItem: PropTypes.func.isRequired,
  updateDistrictItem: PropTypes.func.isRequired,
  toggleDistrictModal: PropTypes.func.isRequired,
  changeTypeDistrictModal: PropTypes.func.isRequired
}

const mapStateToProps = ({address}) => {
  const { modalType } = address.district;
  return {
    modalType
  }
}

export default injectIntl(connect(mapStateToProps, {
  addDistrictItem,
  updateDistrictItem,
  toggleDistrictModal,
  changeTypeDistrictModal
})(Action));