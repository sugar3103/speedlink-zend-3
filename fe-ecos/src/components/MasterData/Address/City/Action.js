import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addCityItem, updateCityItem, toggleCityModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateCityItem(values, messages);
    } else {
      this.props.addCityItem(values, messages);
    }
  }

  toggleModal = () => {
    this.props.toggleCityModal();
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
  addCityItem: PropTypes.func.isRequired,
  updateCityItem: PropTypes.func.isRequired,
  toggleCityModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({address}) => {
  const { modalData } = address.city;
  return {
    modalData
  }
}

export default injectIntl(connect(mapStateToProps, {
  addCityItem,
  updateCityItem,
  toggleCityModal
})(Action));