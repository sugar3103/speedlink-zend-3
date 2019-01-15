import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class ItemCity extends Component {

  render() {
    const { city } = this.props;
    return (
      <tr>
        <th scope="row">{city.cityId}</th>
        <td>{city.name}</td>
        <td>{city.status}</td>
        <td>{city.createdAt}</td>
      </tr>
    );
  }
}

ItemCity.propTypes = {
  city: PropTypes.object.isRequired,
}

export default injectIntl(ItemCity);