import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { togglePermissionModal, deletePermissionItem } from '../../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (permission) => {
    this.props.togglePermissionModal(permission);
  }

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            {/* <h1>{messages["title-confirm"]}</h1> */}
            <h3>{messages["desc-confirm"]}</h3>
            <hr/>
            <Button color="light" size="sm" onClick={onClose}>{messages["confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deletePermissionItem(id)
              onClose()
            }}>{messages["confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { permission } = this.props;
    const { locale } = this.props.intl;
    return (
      <tr>
        <th scope="row">{permission.id}</th>
        <td>{permission.name}</td>
        <td>{(locale === 'es-US' && permission.description_en) ? permission.description_en : permission.description }</td>
        <td>{permission.created_at}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(permission)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(permission.id)}><span className="lnr lnr-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  permission: PropTypes.object.isRequired,
  togglePermissionModal: PropTypes.func.isRequired,
  deletePermissionItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  togglePermissionModal,
  deletePermissionItem
})(Item));