import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleCountryModal } from '../../../redux/actions';

class ItemCountry extends Component {

  toggleModal = (country) => {
    this.props.toggleCountryModal(country);
  }

  render() {
    const { country } = this.props; 
    
    return (
      <tr>
        <th scope="row">{country.countryId}</th>
        <td>{country.name}</td>
        <td>{country.isoCode}</td>
        <td>{country.status}</td>
        <td>{country.createdAt}</td>
        <td className="text-center">
          <Button color="success" size="xs" onClick={() => this.toggleModal(country)}><i className="simple-icon-pencil" /></Button> &nbsp;
        </td>
      </tr>
    );
  }
}

ItemCountry.propTypes = {
  country: PropTypes.object.isRequired,
  toggleCountryModal: PropTypes.func.isRequired,
}

export default injectIntl(connect(null, {
  toggleCountryModal
})(ItemCountry));
