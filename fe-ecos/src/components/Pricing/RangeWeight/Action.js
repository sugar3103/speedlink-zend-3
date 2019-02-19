import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addRangeWeightItem, updateRangeWeightItem, toggleRangeWeightModal } from '../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {
  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateRangeWeightItem(values, messages);
    } else {
      this.props.addRangeWeightItem(values, messages);
    }
  };

  toggleModal = () => {
    this.props.toggleRangeWeightModal();
  };

  render() {
    const { modalData } = this.props;
    const className = modalData ? 'primary' : 'success';
    return (
      <Modal isOpen={this.props.modalOpen} toggle={this.toggleModal}
             className={`modal-dialog--${className} modal-dialog--header  modal-lg`}>
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
}

Action.propTypes = {
  modalData: PropTypes.object,
  addRangeWeightItem: PropTypes.func.isRequired,
  updateRangeWeightItem: PropTypes.func.isRequired,
  toggleRangeWeightModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ rangeweight }) => {
  const { modalData } = rangeweight;
  return { modalData };
};

export default injectIntl(connect(mapStateToProps, {
  addRangeWeightItem,
  updateRangeWeightItem,
  toggleRangeWeightModal
})(Action));