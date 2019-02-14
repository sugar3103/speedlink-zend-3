import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleBranchAreaModal, deleteBranchAreaItem } from '../../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (brancharea) => {
    this.props.toggleBranchAreaModal(brancharea);
  }

  onDelete = (id) => {
    const { messages } = this.props.intl;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h2>{messages["title-confirm"]}</h2>
            <p>{messages["desc-confirm"]}</p>
            <Button color="light" size="sm" onClick={onClose}>{messages["confirm-no"]}</Button> &nbsp;
            <Button color="danger" size="sm" onClick={() => {
              this.props.deleteBranchAreaItem(id, messages)
              onClose()
            }}>{messages["confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { brancharea } = this.props;
    const { messages,locale } = this.props.intl;

    return (
      <tr>
        <th scope="row">{brancharea.id}</th>
        <td>{brancharea.branch_code}</td>
        <td>{ (locale === 'en-US' && brancharea.branch_name) ? brancharea.branch_name : brancharea.branch_name_en }</td>
        {/* <td>{ (locale === 'en-US' && brancharea.description_en) ? brancharea.description_en : brancharea.description }</td> */}
        <td>{brancharea.hub_code}</td>
        <td>{brancharea.country}</td>
        <td>{brancharea.city}</td>
        <td>{brancharea.district}</td>
        <td>{brancharea.ward}</td>
        {/* <td>{brancharea.status === 1 ? <Badge color="success">{messages['active']}</Badge> : <Badge color="dark">{messages['inactive']}</Badge>}</td> */}
        {/* <td>{brancharea.created_at}</td> */}
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(brancharea)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(brancharea.id)}><span className="lnr lnr-trash" /></Button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  brancharea: PropTypes.object.isRequired,
  toggleBranchAreaModal: PropTypes.func.isRequired,
  deleteBranchAreaItem: PropTypes.func.isRequired
}

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return {
    locale
  }
}

export default injectIntl(connect(mapStateToProps, {
  toggleBranchAreaModal,
  deleteBranchAreaItem
})(Item));