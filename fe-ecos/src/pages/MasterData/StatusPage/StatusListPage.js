import React, { Component } from 'react';
import { connect } from 'react-redux';
import { statusActions } from '../../../actions/status.actions';
import StatusItem from './StatusItem';
import DataTable from '../../../components/Datatable';
import Export from '../../../components/Datatable/Export';
import ItemPerPage from '../../../components/Datatable/ItemPerPage';
import PaginationTable from '../../../components/Datatable/PaginationTable';

class StatusListPage extends Component {

  componentDidMount() {
    this.props.getListStatus();
  }

  handlePageChange = (pageNumber) => {
    this.props.changePage(pageNumber);
  }

  showStatus = (status) => {
    var result = null;
    if (status.data.length > 0) {
      result = status.data.map((status, index) => {
        return (
          <StatusItem
            key={index}
            status={status}
            index={index}
          />
        )
      });
    }
    return result;
  }

  render() {

    const { status } = this.props;

    const thead = [
      {
        className: 'sorting_asc',
        style: {
          width: '50px'
        },
        value: 'No.'
      },
      {
        className: 'sorting',
        style: {
          width: '100px'
        },
        value: 'First Name'
      },
      {
        className: 'sorting',
        style: {
          width: '100px'
        },
        value: 'Last Name'
      },
      {
        className: 'sorting',
        style: {
          width: '150px'
        },
        value: 'Avatar'
      },
      {
        style: {
          width: '150px'
        },
        value: 'Action'
      }
    ];

    return (
      <div className="row">
        <div className="col-12">
          <div className="card-box">
            <h4 className="header-title mb-4 float-left">Status</h4>
            <button type="button" className="btn btn-success waves-light waves-effect float-right">Create New Status</button>
            <div className="clearfix"></div>

            <fieldset className="scheduler-border">
              <legend className="scheduler-border">Search</legend>
              <form>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="name" className="col-form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="description" className="col-form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      placeholder="Description"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="status" className="col-form-label">Status</label>
                    <select
                      className="form-control"
                      id="status"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
                <button type="button" className="btn btn-light waves-effect float-right">Clear</button>
                <button type="button" className="btn btn-primary waves-light waves-effect float-right mr-3">Search</button>
              </form>
            </fieldset>

            <div id="datatable_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
            <div className="row">
              {status.loading && <em>Loading...</em>}
              {status.items && <Export handleExport={this.handleExport} />}
              {status.items && <ItemPerPage handleChangeItemPerPage={this.handleChangeItemPerPage} />}
            </div>
            <div className="row">
              <DataTable thead={thead}>
                {status.loading && <tr><td colSpan={5} className="text-center">Loading status...</td></tr>}
                {status.error && <tr><td colSpan={5} className="text-center"><span className="text-danger">ERROR: {status.error}</span></td></tr>}
                {status.items && this.showStatus(status.items)}
              </DataTable>
            </div>
            <div className="row">
              {status.loading && <em>Loading...</em>}
              {status.items && <PaginationTable pagination={status.items} handlePageChange={this.handlePageChange}/>}
            </div>
            </div>

            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.status
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    getListStatus: () => {
      return dispatch(statusActions.getList());
    },
    changePage: (pageNumber) => {
      return dispatch(statusActions.getList(pageNumber));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusListPage);