import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleStatusModal, deleteStatusItem } from '../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (status) => {
    this.props.toggleStatusModal(status);
  }

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h2>{messages["status.title-confirm"]}</h2>
            <p>{messages["status.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["status.confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deleteStatusItem(id, messages)
              onClose()
            }}>{messages["status.confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { status } = this.props;
    const { messages } = this.props.intl;
    return (
      <tr>
        <th scope="row">{status.id}</th>
        <td>{status.name}</td>
        <td>{status.name_en}</td>
        <td>{status.description}</td>
        <td>{status.description_en}</td>
        <td>{status.status === 1 ? <Badge color="success">{messages['status.active']}</Badge> : <Badge color="dark">{messages['status.inactive']}</Badge>}</td>
        <td>{status.created_at}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(status)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(status.id)}><span className="lnr lnr-trash" /></Button>
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