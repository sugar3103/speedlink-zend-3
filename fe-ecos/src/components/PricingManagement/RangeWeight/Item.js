import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import CheckIcon from 'mdi-react/CheckIcon';
import { connect } from 'react-redux';
import { toggleRangeWeightModal, deleteRangeWeightItem } from '../../../redux/actions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { injectIntl } from 'react-intl';

class Item extends Component {
  toggleModal = (rangeWeight) => {
    this.props.toggleRangeWeightModal(rangeWeight);
  };

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h2>{messages["range_weight.title-confirm"]}</h2>
            <p>{messages["range_weight.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["confirm-no"]}</Button>&nbsp;
            <Button color="danger" size="sm" onClick={() => { this.props.deleteRangeWeightItem(id); onClose();}}>
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
    const { range_weight } = this.props;
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
        <th scope="row">{range_weight.id}</th>
        <td>{range_weight.code}</td>
        <td>{range_weight.carrier_code}</td>
        <td>{range_weight.category}</td>
        <td>{range_weight.service_code}</td>
        <td>{range_weight.shipmenttype_code}</td>
        
        {/* <td>{locale === 'en-US' ? (carrier.name_en) : (carrier.name)}</td> */}
        <td>{range_weight.status === 1 ?
          <Badge color="success">
            {messages['active']}
          </Badge> : <Badge color="dark">
            {messages['inactive']}
          </Badge>
        }</td>
        <td>{range_weight.customer_name}</td>
        <td>{range_weight.from}</td>
        <td>{range_weight.to === '0.00' ? 'Over' : range_weight.to }</td>
        <td>{range_weight.calculate_unit ?
          <Badge color="success">
            {messages['yes']}
          </Badge> : <Badge color="dark">
            {messages['no']}
          </Badge>
        }</td>
        <td>{range_weight.unit}</td>
        <td>{range_weight.round_up}</td>
        {/* <td>{carrier.created_at} by {carrier.created_by}</td>
        <td>{carrier.updated_at} by {carrier.updated_by}</td> */}
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(range_weight)}>
            <span className="lnr lnr-pencil" />
          </Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(range_weight.id)}>
            <span className="lnr lnr-trash" />
          </Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  range_weight: PropTypes.object.isRequired,
  toggleRangeWeightModal: PropTypes.func.isRequired,
  deleteRangeWeightItem: PropTypes.func.isRequired
};
const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return {
    locale
  }
}

export default injectIntl(connect(mapStateToProps, {
  toggleRangeWeightModal,
  deleteRangeWeightItem
})(Item));