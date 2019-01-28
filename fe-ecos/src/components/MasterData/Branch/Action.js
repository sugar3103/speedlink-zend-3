import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addBranchItem, updateBranchItem, toggleBranchModal } from '../../../redux/actions';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateBranchItem(values, messages);
    } else {
      this.props.addBranchItem(values, messages);
    }
  }

  toggleModal = () => {
    this.props.toggleBranchModal();
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

const mapStateToProps = ({status}) => {
  const { modalData } = status;
  return {
    modalData
  }
}

export default injectIntl(connect(mapStateToProps, {
  addBranchItem,
  updateBranchItem,
  toggleBranchModal
})(Action));