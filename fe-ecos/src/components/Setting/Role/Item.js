import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleRoleModal, deleteRoleItem } from '../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (role) => {
    this.props.toggleRoleModal(role);
  }

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h1>{messages["role.title-confirm"]}</h1>
            <p>{messages["desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deleteRoleItem(id)
              onClose()
            }}>{messages["confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { role } = this.props;
    const { messages,locale } = this.props.intl;
    return (
      <tr>
        <th scope="row">{role.id}</th>
        <td>{role.name}</td>
        <td>{(locale == 'es-US' && role.description_en) ? role.description : role.description}</td>
        <td>{role.is_active === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>}</td>
        <td>{role.created_at}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(role)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(role.role_id)}><span className="lnr lnr-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  role: PropTypes.object.isRequired,
  toggleRoleModal: PropTypes.func.isRequired,
  deleteRoleItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  toggleRoleModal,
  deleteRoleItem
})(Item));