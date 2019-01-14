import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  render() {
    const { address } = this.props;
    return (
      <tr>
        <th scope="row">{address.id}</th>
        <td>{address.code}</td>
        <td>{address.country}</td>
        <td>{address.city}</td>
        <td>{address.district}</td>
        <td>{address.ward}</td>
        <td>{address.brand}</td>
        <td>{address.hub}</td>
      </tr>
    );
  }
}

Item.propTypes = {
  address: PropTypes.object.isRequired,
}

export default injectIntl(Item);