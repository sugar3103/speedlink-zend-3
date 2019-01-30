import React, { Component } from 'react';
import { Button, Badge } from 'reactstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { toggleBranchModal, deleteBranchItem } from '../../../../redux/actions';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { injectIntl } from 'react-intl';

class Item extends Component {

  toggleModal = (branch) => {
    this.props.toggleBranchModal(branch);
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
              this.props.deleteBranchItem(id, messages)
              onClose()
            }}>{messages["confirm-yes"]}</Button>
          </div>
        )
      }
    })
  }

  render() {
    const { branch } = this.props;
    const { messages,locale } = this.props.intl;

    return (
      <tr>
        <th scope="row">{branch.id}</th>
        <td>{branch.code}</td>
        <td>{ (locale === 'en-US' && branch.name_en) ? branch.name_en : branch.name }</td>
        <td>{ (locale === 'en-US' && branch.description_en) ? branch.description_en : branch.description }</td>
        <td>{branch.city}</td>
        <td>{branch.status === 1 ? <Badge color="success">{messages['branch.active']}</Badge> : <Badge color="dark">{messages['branch.inactive']}</Badge>}</td>
        <td>{branch.created_at}</td>
        <td className="text-center">
          <Button color="info" size="sm" onClick={() => this.toggleModal(branch)}><span className="lnr lnr-pencil" /></Button> &nbsp;
          <Button color="danger" size="sm" onClick={() => this.onDelete(branch.id)}><span className="lnr lnr-trash" /></Button>
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

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return {
    locale
  }
}

export default injectIntl(connect(mapStateToProps, {
  toggleBranchModal,
  deleteBranchItem
})(Item));