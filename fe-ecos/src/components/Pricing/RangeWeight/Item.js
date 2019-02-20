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
  toggleModal = (rangeweight) => {
    this.props.toggleRangeWeightModal(rangeweight);
  };

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h2>{messages["rangeweight.title-confirm"]}</h2>
            <p>{messages["rangeweight.desc-confirm"]}</p>
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
    const { rangeweight } = this.props;
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
        <th scope="row">{rangeweight.id}</th>
        <td>{rangeweight.code}</td>
        <td>{rangeweight.carrier_code}</td>
        <td>{rangeweight.category}</td>
        <td>{rangeweight.service_code}</td>
        <td>{rangeweight.shipmenttype_code}</td>
        
        {/* <td>{locale === 'en-US' ? (carrier.name_en) : (carrier.name)}</td> */}
        <td>{rangeweight.status === 1 ?
          <Badge color="success">
            {messages['active']}
          </Badge> : <Badge color="dark">
            {messages['inactive']}
          </Badge>
        }</td>
        <td>{rangeweight.customer_name}</td>
        <td>{rangeweight.from}</td>
        <td>{rangeweight.to === '0.00' ? 'Over' : rangeweight.to }</td>
        <td>{rangeweight.calculate_unit ?
          <Badge color="success">
            {messages['yes']}
          </Badge> : <Badge color="dark">
            {messages['no']}
          </Badge>
        }</td>
        <td>{rangeweight.unit}</td>
        <td>{rangeweight.round_up}</td>
        {/* <td>{carrier.created_at} by {carrier.created_by}</td>
        <td>{carrier.updated_at} by {carrier.updated_by}</td> */}
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(rangeweight)}>
            <span className="lnr lnr-pencil" />
          </Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(rangeweight.id)}>
            <span className="lnr lnr-trash" />
          </Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  rangeweight: PropTypes.object.isRequired,
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