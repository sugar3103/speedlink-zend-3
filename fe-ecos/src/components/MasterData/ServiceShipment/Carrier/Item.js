import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleCarrierModal, deleteCarrierItem } from '../../../../redux/actions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { injectIntl } from 'react-intl';

class Item extends Component {
  toggleModal = (carrier) => {
    this.props.toggleCarrierModal(carrier);
  };

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h2>{messages["carrier.title-confirm"]}</h2>
            <p>{messages["carrier.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["carrier.confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => { this.props.deleteCarrierItem(id); onClose();}}>
              {messages["carrier.confirm-yes"]}
            </Button>
          </div>
        )
      }
    })
  };

  render() {
    const { carrier } = this.props;
    const { messages,locale } = this.props.intl;
    return (
      <tr>
        <th scope="row">{carrier.id}</th>
        <td>{carrier.code}</td>
        {locale === 'en-US' ? (
          <td>{carrier.name_en}</td>
        ) : (
          <td>{carrier.name}</td>
        )}
        <td>{carrier.status === 1 ?
          <Badge color="success">
            {messages['active']}
          </Badge> : <Badge color="dark">
            {messages['inactive']}
          </Badge>
        }</td>
        <td>{carrier.created_at} by {carrier.created_by}</td>
        <td>{carrier.updated_at} by {carrier.updated_by}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(carrier)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(carrier.id)}><span className="lnr lnr-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  carrier: PropTypes.object.isRequired,
  toggleCarrierModal: PropTypes.func.isRequired,
  deleteCarrierItem: PropTypes.func.isRequired
};

export default injectIntl(connect(null, {
  toggleCarrierModal,
  deleteCarrierItem
})(Item));