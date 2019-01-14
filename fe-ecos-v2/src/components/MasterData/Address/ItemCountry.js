import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class ItemCountry extends Component {

  render() {
    const { country } = this.props;    
    return (
      <tr>
        <th scope="row">{country.countryId}</th>
        <td>{country.name}</td>
        <td>{country.isoCode}</td>
        <td>{country.status}</td>
        <td>{country.createdAt}</td>
      </tr>
    );
  }
}

ItemCountry.propTypes = {
  country: PropTypes.object.isRequired,
}

export default injectIntl(ItemCountry);