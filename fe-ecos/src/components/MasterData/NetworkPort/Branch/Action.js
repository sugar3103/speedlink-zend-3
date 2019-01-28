import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addBranchItem, updateBranchItem, toggleBranchModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;
    console.log(values);
    
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


Action.propTypes = {
  modalData: PropTypes.object,
  addBranchItem: PropTypes.func.isRequired,
  updateBranchItem: PropTypes.func.isRequired,
  toggleBranchModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({branch}) => {
  const { modalData } = branch;
  return {
    modalData
  }
}

export default injectIntl(connect(mapStateToProps, {
  addBranchItem,
  updateBranchItem,
  toggleBranchModal
})(Action));