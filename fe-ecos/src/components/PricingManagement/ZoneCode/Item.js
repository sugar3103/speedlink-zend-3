import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import CheckIcon from 'mdi-react/CheckIcon';
import { connect } from 'react-redux';
import { toggleZoneCodeModal, deleteZoneCodeItem } from '../../../redux/actions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { injectIntl } from 'react-intl';

class Item extends Component {
  toggleModal = (zoneCode) => {
    this.props.toggleZoneCodeModal(zoneCode);
  };

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h2>{messages["zone_code.title-confirm"]}</h2>
            <p>{messages["zone_code.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["confirm-no"]}</Button>&nbsp;
            <Button color="danger" size="sm" onClick={() => { this.props.deleteZoneCodeItem(id); onClose();}}>
              {messages["confirm-yes"]}
            </Button>
          </div>
        )
      }
    })
  };

  checkItem = () => {
    alert("Check Item")
  }


  render() {
    const { zone_code } = this.props;
    const { messages } = this.props.intl;
    return (
      <tr>
          <td>
          <label className="checkbox-btn">
            <input className="checkbox-btn__checkbox" type="checkbox" />
            <span className="checkbox-btn__checkbox-custom">
              <CheckIcon />
            </span>
          </label></td>
        <th scope="row">{zone_code.id}</th>
        <td>{zone_code.code}</td>
        <td>{zone_code.carrier_code}</td>
        <td>{zone_code.category}</td>
        <td>{zone_code.service_code}</td>
        <td>{zone_code.shipmenttype_code}</td>
        {/* <td>{locale === 'en-US' ? (carrier.name_en) : (carrier.name)}</td> */}
        <td>{zone_code.status === 1 ?
          <Badge color="success">
            {messages['active']}
          </Badge> : <Badge color="dark">
            {messages['inactive']}
          </Badge>
        }</td>
        <td>{zone_code.customer_name}</td>
        <td>{zone_code.origin_country_name}</td>
        <td>{zone_code.origin_city_name}</td>
        <td>{zone_code.destination_country_name}</td>
        <td>{zone_code.destination_city_name}</td>
        {/* <td>{carrier.created_at} by {carrier.created_by}</td>
        <td>{carrier.updated_at} by {carrier.updated_by}</td> */}
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(zone_code)}>
            <span className="lnr lnr-pencil" />
          </Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(zone_code.id)}>
            <span className="lnr lnr-trash" />
          </Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  zonecode: PropTypes.object.isRequired,
  toggleZoneCodeModal: PropTypes.func.isRequired,
  deleteZoneCodeItem: PropTypes.func.isRequired
};
const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return {
    locale
  }
}

export default injectIntl(connect(mapStateToProps, {
  toggleZoneCodeModal,
  deleteZoneCodeItem
})(Item));