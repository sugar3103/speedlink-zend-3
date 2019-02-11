import React, { Component } from 'react';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addRoleItem, updateRoleItem, toggleRoleModal } from '../../../../redux/actions';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;   
    if (values.id) {
      this.props.updateRoleItem(values,messages);
    } else {
      this.props.addRoleItem(values,messages);
    }
  }

  toggleModal = () => {
    this.props.toggleRoleModal();
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
  addRoleItem: PropTypes.func.isRequired,
  updateRoleItem: PropTypes.func.isRequired,
  toggleRoleModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({users}) => {
  const { modalData } = users.role;
  return {
    modalData
  }
}

export default injectIntl(connect(mapStateToProps, {
  addRoleItem,
  updateRoleItem,
  toggleRoleModal
})(Action));