import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Item extends Component {

  render() {
    const { code } = this.props;
    return (
      <tr>
        <th scope="row">{code.id}</th>
        <td>{code.code}</td>
        <td>{code.zip_code}</td>
        <td>{code.country}</td>
        <td>{code.city}</td>
        <td>{code.district}</td>
        <td>{code.ward}</td>
        <td>{code.created_at}</td>
      </tr>
    );
  }
}

Item.propTypes = {
  code: PropTypes.object.isRequired,
}

export default Item;