import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toggleCityModal } from '../../../redux/actions';

class ItemCity extends Component {

  toggleModal = (country) => {
    this.props.toggleCityModal(country);
  }

  render() {
    const { city } = this.props;
    return (
      <tr>
        <th scope="row">{city.cityId}</th>
        <td>{city.name}</td>
        <td>{city.status}</td>
        <td>{city.createdAt}</td>
        <td className="text-center">
          <Button color="success" size="xs" onClick={() => this.toggleModal(city)}><i className="simple-icon-pencil" /></Button> &nbsp;
        </td>
      </tr>
    );
  }
}

ItemCity.propTypes = {
  city: PropTypes.object.isRequired,
  toggleCityModal: PropTypes.func.isRequired,
}

export default injectIntl(connect(null, {
  toggleCityModal
})(ItemCity));