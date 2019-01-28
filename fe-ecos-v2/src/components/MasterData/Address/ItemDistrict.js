import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { connect } from 'react-redux';
import { toggleDistrictModal } from '../../../redux/actions';

import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';
import classnames from "classnames";

class ItemDistrict extends Component {
  toggleModal = (district) => {
    this.props.toggleDistrictModal(district);
  }

  render() {
    const { district } = this.props;    
    return (
      <tr>
        <th scope="row">{district.districtId}</th>
        <td>{district.name}</td>
        <td>
          <span className={
            classnames({
              "badge badge-success": (district.status === "Active"),
              "badge badge-danger": (district.status === "Inactive")
          })}
          >{district.status}</span>
        </td>
        <td>{district.createdAt}</td>
        <td className="text-center">
          <Button color="success" size="sm" onClick={() => this.toggleModal(district)}><i className="simple-icon-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(district.districtId)}><i className="simple-icon-trash" /></Button>
        </td>
      </tr>
    );
  }
}

ItemDistrict.propTypes = {
  district: PropTypes.object.isRequired,
  toggleDistrictModal: PropTypes.func.isRequired,
}
export default injectIntl(connect(null, {
  toggleDistrictModal
})(ItemDistrict));