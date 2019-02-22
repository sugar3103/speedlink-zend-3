import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addZoneCodeItem, updateZoneCodeItem, toggleZoneCodeModal } from '../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {
  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateZoneCodeItem(values, messages);
    } else {
      this.props.addZoneCodeItem(values, messages);
    }
  };

  toggleModal = () => {
    this.props.toggleZoneCodeModal();
  };

  render() {
    const { modalData } = this.props;
    const className = modalData ? 'primary' : 'success';
    return (
      <Modal isOpen={this.props.modalOpen} toggle={this.toggleModal}
             className={`modal-dialog--${className} modal-dialog--header  modal-custom-size`}>
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
}

Action.propTypes = {
  modalData: PropTypes.object,
  addZoneCodeItem: PropTypes.func.isRequired,
  updateZoneCodeItem: PropTypes.func.isRequired,
  toggleZoneCodeModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ zoneCode }) => {
  const { modalData } = zoneCode;
  return { modalData };
};

export default injectIntl(connect(mapStateToProps, {
  addZoneCodeItem,
  updateZoneCodeItem,
  toggleZoneCodeModal
})(Action));