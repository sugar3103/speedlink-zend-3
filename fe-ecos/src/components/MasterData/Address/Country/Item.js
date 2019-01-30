import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleCountryModal, deleteCountryItem } from '../../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (country) => {
    this.props.toggleCountryModal(country);
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
              this.props.deleteCountryItem(id, messages)
              onClose()
            }}>{messages["confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { country } = this.props;
    const { messages,locale } = this.props.intl;
    return (
      <tr>
        <th scope="row">{country.id}</th>
        <td>{locale === 'en-US' ? country.name_en : country.name}</td>
        <td>{locale === 'en-US' ? country.description_en : country.description}</td>
        <td>{country.iso_code}</td>
        <td>{country.status === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['country.inactive']}</Badge>}</td>
        <td>{country.created_at}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(country)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(country.id)}><span className="lnr lnr-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  country: PropTypes.object.isRequired,
  toggleCountryModal: PropTypes.func.isRequired,
  deleteCountryItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  toggleCountryModal,
  deleteCountryItem
})(Item));