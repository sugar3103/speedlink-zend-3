import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import ActionForm from './ActionForm';
import { addHubItem, updateHubItem, toggleHubModal } from '../../../../redux/actions';
import PropTypes from 'prop-types';

class Action extends Component {

  handleSubmit = values => {
    const { messages } = this.props.intl;
    if (values.id) {
      this.props.updateHubItem(values, messages);
    } else {
      this.props.addHubItem(values, messages);
    }
  }

  toggleModal = () => {
    this.props.toggleHubModal();
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
  addHubItem: PropTypes.func.isRequired,
  updateHubItem: PropTypes.func.isRequired,
  toggleHubModal: PropTypes.func.isRequired,
}


const mapStateToProps = ({hub}) => {
  const { modalData } = hub;
  return {
    modalData
  }
}

export default injectIntl(connect(mapStateToProps, {
  addHubItem,
  updateHubItem,
  toggleHubModal
})(Action));