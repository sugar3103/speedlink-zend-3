import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleHubModal, deleteHubItem } from '../../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (hub) => {
    this.props.toggleHubModal(hub);
  }

  toggleDetailModal = (hub) => {
    this.props.toggleHubDetailModal(hub);
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
              this.props.deleteHubItem(id, messages)
              onClose()
            }}>{messages["confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { hub } = this.props;
    const { messages,locale } = this.props.intl;
    return (
      <tr onClick={() => this.toggleDetailModal(hub)} >
        <th scope="row">{hub.id}</th>
        <td>{hub.code}</td>
        <td>{ (locale ==='en-US' && hub.name_en) ? hub.name_en : hub.name }</td>
        <td>{ (locale ==='en-US' && hub.description_en) ? hub.description_en : hub.description }</td>
        <td>{hub.city}</td>
        <td>{hub.status === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>}</td>
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
const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return {
    locale
  }
}
export default injectIntl(connect(mapStateToProps, {
  toggleHubModal,
  deleteHubItem
})(Item));