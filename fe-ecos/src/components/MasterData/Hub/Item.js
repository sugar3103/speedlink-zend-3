import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleHubModal, deleteHubItem } from '../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (hub) => {
    this.props.toggleHubModal(hub);
  }

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h2>{messages["hub.title-confirm"]}</h2>
            <p>{messages["hub.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["hub.confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deleteHubItem(id, messages)
              onClose()
            }}>{messages["hub.confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { hub } = this.props;
    const { messages } = this.props.intl;
    return (
      <tr>
        <th scope="row">{hub.id}</th>
        <td>{hub.code}</td>
        <td>{hub.name} <br/>{hub.name_en}</td>
        <td>{hub.description}<br/>{hub.description_en}</td>
        <td>{hub.city}</td>
        <td>{hub.status === 1 ? <Badge color="success">{messages['hub.active']}</Badge> : <Badge color="dark">{messages['hub.inactive']}</Badge>}</td>
        <td>{hub.created_at}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(hub)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(hub.id)}><span className="lnr lnr-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  hub: PropTypes.object.isRequired,
  toggleHubModal: PropTypes.func.isRequired,
  deleteHubItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  toggleHubModal,
  deleteHubItem
})(Item));