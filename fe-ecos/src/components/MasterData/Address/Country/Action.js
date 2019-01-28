import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addCountryItem, updateCountryItem, toggleCountryModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateCountryItem(values, messages);
    } else {
      this.props.addCountryItem(values, messages);
    }
  }

  toggleModal = () => {
    this.props.toggleCountryModal();
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
  addCountryItem: PropTypes.func.isRequired,
  updateCountryItem: PropTypes.func.isRequired,
  toggleCountryModal: PropTypes.func.isRequired,
}


const mapStateToProps = ({address}) => {
  const { modalData } = address.country;
  return {
    modalData
  }
}

export default injectIntl(connect(mapStateToProps, {
  addCountryItem,
  updateCountryItem,
  toggleCountryModal
})(Action));