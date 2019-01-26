import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleCityModal, deleteCityItem } from '../../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (city) => {
    this.props.toggleCityModal(city);
  }

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h2>{messages["city.title-confirm"]}</h2>
            <p>{messages["city.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["city.confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deleteCityItem(id, messages)
              onClose()
            }}>{messages["city.confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { city } = this.props;
    const { messages } = this.props.intl;
    return (
      <tr>
        <th scope="row">{city.id}</th>
        <td>{city.name}</td>
        <td>{city.name_en}</td>
        <td>{city.description}</td>
        <td>{city.description_en}</td>
        <td>{city.zip_code}</td>
        <td>{city.status === 1 ? <Badge color="success">{messages['city.active']}</Badge> : <Badge color="dark">{messages['city.inactive']}</Badge>}</td>
        <td>{city.created_at}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(city)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(city.id)}><span className="lnr lnr-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  city: PropTypes.object.isRequired,
  toggleCityModal: PropTypes.func.isRequired,
  deleteCityItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  toggleCityModal,
  deleteCityItem
})(Item));