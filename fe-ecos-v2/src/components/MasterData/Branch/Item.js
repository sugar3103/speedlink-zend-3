import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleBranchModal, deleteBranchItem } from '../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
    }
  }

  toggleModal = (branch) => {
    this.props.toggleBranchModal(branch)
  }

  onDelete = (id) => {
    const branch = {
      id: id
    }; 
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h1>{messages["branch.title-confirm"]}</h1>
            <p>{messages["branch.desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["branch.confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deleteBranchItem(branch)
              onClose()
            }}>{messages["branch.confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { branch } = this.props;
    return (
      <tr>
        <th scope="row">{branch.branchId}</th>
        <td>{branch.code}</td>
        <td>{branch.name}</td>
        <td>{branch.description}</td>
        <td>{branch.status}</td>
        <td>{branch.hub_name}</td>
        <td>{branch.ward } - { branch.district } - { branch.city } - { branch.country }</td>
        <td className="text-center">
          <Button color="success" size="xs" onClick={() => this.toggleModal(branch)}><i className="simple-icon-pencil" /></Button> &nbsp;
          <Button color="danger" size="xs" onClick={() => this.onDelete(branch.branchId)}><i className="simple-icon-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  branch: PropTypes.object.isRequired,
  toggleBranchModal: PropTypes.func.isRequired,
  deleteBranchItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  toggleBranchModal,
  deleteBranchItem
})(Item));