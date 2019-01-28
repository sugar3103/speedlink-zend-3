import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addDistrictItem, updateDistrictItem, toggleDistrictModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateDistrictItem(values, messages);
    } else {
      this.props.addDistrictItem(values, messages);
    }
  }

  toggleModal = () => {
    this.props.toggleDistrictModal();
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
  addDistrictItem: PropTypes.func.isRequired,
  updateDistrictItem: PropTypes.func.isRequired,
  toggleDistrictModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({address}) => {
  const { modalData } = address.district;
  return {
    modalData
  }
}

export default injectIntl(connect(mapStateToProps, {
  addDistrictItem,
  updateDistrictItem,
  toggleDistrictModal
})(Action));