import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addCityItem, updateCityItem, toggleCityModal } from '../../../../redux/actions';

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
        className={`modal-dialog--${className} modal-dialog--header`}
      >
        <ActionForm onSubmit={this.handleSubmit} />
      </Modal>
    );
  }
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