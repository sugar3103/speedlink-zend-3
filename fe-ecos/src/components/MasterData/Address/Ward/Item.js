import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleWardModal, deleteWardItem } from '../../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (ward) => {
    this.props.toggleWardModal(ward);
  }

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h2>{messages["title-confirm"]}</h2>
            <p>{messages["desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deleteWardItem(id, messages)
              onClose()
            }}>{messages["confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { ward } = this.props;
    const { messages,locale } = this.props.intl;
    return (
      <tr>
        <th scope="row">{ward.id}</th>
        <td>{(locale === 'es-US' && ward.name_en) ? ward.name_en : ward.name}</td>
        <td>{(locale === 'es-US' && ward.description_en) ? ward.description_en : ward.description}</td>
        <td>{ward.postal_code}</td>
        <td>{ward.status === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>}</td>
        <td>{ward.created_at}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(ward)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(ward.id)}><span className="lnr lnr-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  ward: PropTypes.object.isRequired,
  toggleWardModal: PropTypes.func.isRequired,
  deleteWardItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  toggleWardModal,
  deleteWardItem
})(Item));