import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addStatusItem, updateStatusItem, toggleStatusModal } from '../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateStatusItem(values, messages);
    } else {
      this.props.addStatusItem(values, messages);
    }
  }

  toggleModal = () => {
    this.props.toggleStatusModal();
  }

  render() {
    const { modalData } = this.props;
    const className = modalData ? 'primary' : 'success';
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
  modalData: PropTypes.object,
  addStatusItem: PropTypes.func.isRequired,
  updateStatusItem: PropTypes.func.isRequired,
  toggleStatusModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({status}) => {
  const { modalData } = status;
  return {
    modalData
  }
}

export default injectIntl(connect(mapStateToProps, {
  addStatusItem,
  updateStatusItem,
  toggleStatusModal
})(Action));