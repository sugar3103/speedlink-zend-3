import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleDistrictModal, deleteDistrictItem } from '../../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (district) => {
    this.props.toggleDistrictModal(district);
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
              this.props.deleteDistrictItem(id, messages)
              onClose()
            }}>{messages["confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { district } = this.props;
    const { messages,locale } = this.props.intl;
    return (
      <tr>
        <th scope="row">{district.id}</th>
        <td>{(locale=== 'en-US' && district.name_en) ? district.name_en : district.name}</td>
        <td>{(locale=== 'en-US' && district.description_en) ? district.description_en : district.description}</td>
        <td>{district.status === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>}</td>
        <td>{district.created_at}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(district)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(district.id)}><span className="lnr lnr-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  district: PropTypes.object.isRequired,
  toggleDistrictModal: PropTypes.func.isRequired,
  deleteDistrictItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  toggleDistrictModal,
  deleteDistrictItem
})(Item));