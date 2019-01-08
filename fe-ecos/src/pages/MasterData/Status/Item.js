import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { modalActions, statusActions } from '../../../actions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Item extends Component {

  handleEdit = (id) => {
    this.props.onEditStatus(id);
  }

  hanldeDelete = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui-confirm'>
            <h1>Are you sure?</h1>
            <p>You want to delete this status?</p>
            <button onClick={onClose} className="btn btn-light waves-light waves-effect">No</button> &nbsp;
            <button onClick={() => {
                this.props.onDeleteStatus(id)
                onClose()
            }} className="btn btn-danger waves-light waves-effect">Yes, Delete it!</button>
          </div>
        )
      }
    })
  }

  render() {
    const { status, index } = this.props;
    return (
      <tr role="row" className={index%2 === 0 ? 'odd' : 'even'}>
        <td>{status.name}</td>
        <td>{status.description}</td>
        <td>{status.status}</td>
        <td className="text-center">
          <button type="button" className="btn btn-sm btn-primary waves-light waves-effect" onClick={() => this.handleEdit(status.status_id)}>Edit</button> &nbsp;
          <button 
            type="button" 
            className="btn btn-sm btn-danger waves-light waves-effect" 
            onClick={() => this.hanldeDelete(status.status_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

Item.propTypes = {
  status: PropTypes.shape({
    status_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  onEditStatus: PropTypes.func.isRequired,
  onDeleteStatus: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onEditStatus: (id) => {
      return dispatch(modalActions.open(id));
    },
    onDeleteStatus: (id) => {
      return dispatch(statusActions.remove(id));
    }
  }
}

export default connect(null, mapDispatchToProps)(Item);