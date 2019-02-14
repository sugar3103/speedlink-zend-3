import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addBranchAreaItem, updateBranchAreaItem, toggleBranchAreaModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;
    console.log(values);
    if (values.id) {
      this.props.updateBranchAreaItem(values, messages);
    } else {
      this.props.addBranchAreaItem(values, messages);
    }
  }

  toggleModal = () => {
    this.props.toggleBranchAreaModal();
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
  addBranchAreaItem: PropTypes.func.isRequired,
  updateBranchAreaItem: PropTypes.func.isRequired,
  toggleBranchAreaModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({brancharea}) => {
  const { modalData } = brancharea;
  return {
    modalData
  }
}

export default injectIntl(connect(mapStateToProps, {
  addBranchAreaItem,
  updateBranchAreaItem,
  toggleBranchAreaModal
})(Action));