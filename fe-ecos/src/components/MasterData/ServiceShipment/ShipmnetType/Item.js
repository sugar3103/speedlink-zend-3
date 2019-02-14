import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleShipmentTypeModal, deleteShipmentTypeItem } from '../../../../redux/actions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { injectIntl } from 'react-intl';

class Item extends Component {
  toggleModal = (shipment_type) => {
    this.props.toggleShipmentTypeModal(shipment_type);
  };

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h2>{messages["shipment_type.title-confirm"]}</h2>
            <p>{messages["shipment_type.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["confirm-no"]}</Button>&nbsp;
            <Button color="danger" size="sm" onClick={() => { this.props.deleteShipmentTypeItem(id); onClose();}}>
              {messages["confirm-yes"]}
            </Button>
          </div>
        )
      }
    })
  };

  render() {
    const { shipment_type } = this.props;
    const { messages, locale } = this.props.intl;
    return (
      <tr>
        <th scope="row">{shipment_type.id}</th>
        <td>{shipment_type.code}</td>
        <td>{locale === 'en-US' ? (shipment_type.name_en) : (shipment_type.name)}</td>
        <td>{shipment_type.status === 1 ?
          <Badge color="success">
            {messages['active']}
          </Badge> : <Badge color="dark">
            {messages['inactive']}
          </Badge>
        }</td>
        <td>{shipment_type.product_type_code}</td>
        <td>{locale === 'en-US' ? (shipment_type.service_name_en) : (shipment_type.service_name)}</td>
        <td>{shipment_type.category_code}</td>
        <td>{locale === 'en-US' ? (shipment_type.carrier_name_en) : (shipment_type.carrier_name)}</td>
        <td>{shipment_type.volumetric_number}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(shipment_type)}>
            <span className="lnr lnr-pencil" />
          </Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(shipment_type.id)}>
            <span className="lnr lnr-trash" />
          </Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  shipment_type: PropTypes.object.isRequired,
  toggleShipmentTypeModal: PropTypes.func.isRequired,
  deleteShipmentTypeItem: PropTypes.func.isRequired
};

export default injectIntl(connect(null, {
  toggleShipmentTypeModal,
  deleteShipmentTypeItem
})(Item));