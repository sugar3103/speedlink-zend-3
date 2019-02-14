import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import CheckIcon from 'mdi-react/CheckIcon';
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
            <h2>{messages["title-confirm"]}</h2>
            <p>{messages["desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deleteStatusItem(id, messages)
              onClose()
            }}>{messages["confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }
  checkItem = () => {
    alert("Check Item")
  }
  render() {
    const { status } = this.props;
    const { messages, locale } = this.props.intl;

    return (
      <tr>
        <td scope="row">
          <label className="checkbox-btn">
            <input className="checkbox-btn__checkbox" type="checkbox" onChange={e => this.checkItem()} />
            <span className="checkbox-btn__checkbox-custom">
              <CheckIcon />
            </span>
          </label></td>
        <td>{locale === 'en-US' ? status.name_en : status.name}</td>
        <td>{locale === 'en-US' ? status.description_en : status.description}</td>
        <td>{status.status === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>}</td>
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