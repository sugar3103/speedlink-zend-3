import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleUserModal, deleteUserItem } from '../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (user) => {
    this.props.toggleUserModal(user);
  }

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h1>{messages["user.title-confirm"]}</h1>
            <p>{messages["user.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["user.confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deleteUserItem(id)
              onClose()
            }}>{messages["user.confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { user } = this.props;
    const { messages } = this.props.intl;
    return (
      <tr>
        <th scope="row">{user.id}</th>
        <td>{user.username}</td>
        <td>{user.full_name}</td>
        <td>{user.is_active === 1 ? <Badge color="success">{messages['user.active']}</Badge> : <Badge color="dark">{messages['user.inactive']}</Badge>}</td>
        <td>{user.created_at}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(user)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(user.user_id)}><span className="lnr lnr-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  user: PropTypes.object.isRequired,
  toggleUserModal: PropTypes.func.isRequired,
  deleteUserItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  toggleUserModal,
  deleteUserItem
})(Item));