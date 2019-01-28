import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addHubItem, updateHubItem, toggleHubModal } from '../../../../redux/actions';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateHubItem(values, messages);
    } else {
      this.props.addHubItem(values, messages);
    }
  }

  toggleModal = () => {
    this.props.toggleHubModal();
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
  addHubItem,
  updateHubItem,
  toggleHubModal
})(Action));