import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addWardItem, updateWardItem, toggleWardModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateWardItem(values, messages);
    } else {
      this.props.addWardItem(values, messages);
    }
  }

  toggleModal = () => {
    this.props.toggleWardModal();
  }

  render() {
    const { modalData } = this.props;
    const className = modalData ? 'primary' : 'success';
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
  addWardItem: PropTypes.func.isRequired,
  updateWardItem: PropTypes.func.isRequired,
  toggleWardModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({address}) => {
  const { modalData } = address.ward;
  return {
    modalData
  }
}

export default injectIntl(connect(mapStateToProps, {
  addWardItem,
  updateWardItem,
  toggleWardModal
})(Action));