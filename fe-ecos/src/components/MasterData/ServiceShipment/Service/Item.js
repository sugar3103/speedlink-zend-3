import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleServiceModal, deleteServiceItem } from '../../../../redux/actions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { injectIntl } from 'react-intl';

class Item extends Component {
  toggleModal = (service) => {
    this.props.toggleServiceModal(service);
  };

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h2>{messages["service.title-confirm"]}</h2>
            <p>{messages["service.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["confirm-no"]}</Button>&nbsp;
            <Button color="danger" size="sm" onClick={() => { this.props.deleteServiceItem(id); onClose();}}>
              {messages["confirm-yes"]}
            </Button>
          </div>
        )
      }
    })
  };

  render() {
    const { service } = this.props;
    const { messages, locale } = this.props.intl;
    return (
      <tr>
        <th scope="row">{service.id}</th>
        <td>{service.code}</td>
        <td>{locale === 'en-US' ? (service.name_en) : (service.name)}</td>
        <td>{service.status === 1 ?
          <Badge color="success">
            {messages['active']}
          </Badge> : <Badge color="dark">
            {messages['inactive']}
          </Badge>
        }</td>
        <td>{service.created_at} by {service.created_by}</td>
        <td>{service.updated_at} by {service.updated_by}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(service)}>
            <span className="lnr lnr-pencil" />
          </Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(service.id)}>
            <span className="lnr lnr-trash" />
          </Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  service: PropTypes.object.isRequired,
  toggleServiceModal: PropTypes.func.isRequired,
  deleteServiceItem: PropTypes.func.isRequired
};

export default injectIntl(connect(null, {
  toggleServiceModal,
  deleteServiceItem
})(Item));