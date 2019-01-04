import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StatusItem extends Component {
  render() {

    const { status, index } = this.props;

    return (
      <tr role="row" className={index%2 === 0 ? 'odd' : 'even'}>
        <td>{status.name}</td>
        <td>{status.description}</td>
        <td>{status.status}</td>
        <td className="text-center">
          <Link
            to={`/product/edit/${status.status_id}`}
            type="button" 
            className="btn btn-sm btn-success waves-light waves-effect"
          >
            Edit
          </Link> &nbsp;
          <button 
            type="button" 
            className="btn btn-sm btn-danger waves-light waves-effect" 
            onClick={() => this.onDelete(status.status_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default StatusItem;