import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addServiceItem, updateServiceItem, toggleServiceModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {
  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateServiceItem(values, messages);
    } else {
      this.props.addServiceItem(values, messages);
    }
  };

  toggleModal = () => {
    this.props.toggleServiceModal();
  };

  render() {
    const { modalData } = this.props;
    const className = modalData ? 'primary' : 'success';
    return (
      <Modal isOpen={this.props.modalOpen} toggle={this.toggleModal}
             className={`modal-dialog--${className} modal-dialog--header`}>
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
}

Action.propTypes = {
  modalData: PropTypes.object,
  addServiceItem: PropTypes.func.isRequired,
  updateServiceItem: PropTypes.func.isRequired,
  toggleServiceModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ service }) => {
  const { modalData } = service;
  return { modalData };
};

export default injectIntl(connect(mapStateToProps, {
  addServiceItem,
  updateServiceItem,
  toggleServiceModal
})(Action));