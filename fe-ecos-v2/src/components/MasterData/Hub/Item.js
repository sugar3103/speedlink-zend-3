import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleHubModal, deleteHubItem } from '../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
    }
  }

  toggleModal = (hub) => {
    this.props.toggleHubModal(hub)
  }

  onDelete = (id) => {
    const hub = {
      id: id
    }; 
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h1>{messages["hub.title-confirm"]}</h1>
            <p>{messages["hub.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["hub.confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deleteHubItem(hub)
              onClose()
            }}>{messages["hub.confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { hub } = this.props;
    return (
      <tr>
        <th scope="row">{hub.hubId}</th>
        <td>{hub.code}</td>
        <td>{hub.name}</td>
        <td>{hub.description}</td>
        <td>{hub.status}</td>
        <td>{hub.city_name}</td>
        <td className="text-center">
          <Button color="success" size="xs" onClick={() => this.toggleModal(hub)}><i className="simple-icon-pencil" /></Button> &nbsp;
          <Button color="danger" size="xs" onClick={() => this.onDelete(hub.hubId)}><i className="simple-icon-trash" /></Button>
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