import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { togglePermissonModal, deletePermissonItem } from '../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (permisson) => {
    this.props.togglePermissonModal(permisson);
  }

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h1>{messages["permisson.title-confirm"]}</h1>
            <p>{messages["permisson.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["permisson.confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deletePermissonItem(id)
              onClose()
            }}>{messages["permisson.confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { permisson } = this.props;
    const { messages } = this.props.intl;
    return (
      <tr>
        <th scope="row">{permisson.id}</th>
        <td>{permisson.name}</td>
        <td>{permisson.full_name}</td>        
        <td>{permisson.created_at}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(permisson)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(permisson.permisson_id)}><span className="lnr lnr-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  permisson: PropTypes.object.isRequired,
  togglePermissonModal: PropTypes.func.isRequired,
  deletePermissonItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  togglePermissonModal,
  deletePermissonItem
})(Item));