import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleStatusModal, deleteStatusItem } from '../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (status) => {
    this.props.toggleStatusModal(status)
  }

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h1>{messages["status.title-confirm"]}</h1>
            <p>{messages["status.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["status.confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deleteStatusItem(id)
              onClose()
            }}>{messages["status.confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { status } = this.props;
    return (
      <tr>
        <th scope="row">{status.status_id}</th>
        <td>{status.name}</td>
        <td>{status.description}</td>
        <td>{status.status}</td>
        <td className="text-center">
          <Button color="success" size="xs" onClick={() => this.toggleModal(status)}><i className="simple-icon-pencil" /></Button> &nbsp;
          <Button color="danger" size="xs" onClick={() => this.onDelete(status.status_id)}><i className="simple-icon-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  status: PropTypes.object.isRequired,
  toggleStatusModal: PropTypes.func.isRequired,
  deleteStatusItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  toggleStatusModal,
  deleteStatusItem
})(Item));