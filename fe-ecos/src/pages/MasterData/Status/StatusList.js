import React, { Component } from 'react';
import { connect } from 'react-redux';
import { statusActions } from '../../../actions';
import { PAGE_LIMIT } from '../../../constants/config';
import StatusItem from './StatusItem';
import DataTable from '../../../components/Datatable';
import Export from '../../../components/Datatable/Export';
import ItemPerPage from '../../../components/Datatable/ItemPerPage';
import PaginationTable from '../../../components/Datatable/PaginationTable';
import StatusSearch from './StatusSearch';

class StatusList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      pageLimit: PAGE_LIMIT
    };
  }

  componentDidMount() {
    const { pageNumber, pageLimit } = this.state;
    this.props.getListStatus(pageNumber, pageLimit);
  }

  handlePageChange = (pageNumber) => {
    this.props.getListStatus(pageNumber, this.state.pageLimit, this.props.paramSearch);
  }

  handleChangePerPage = (pageLimit) => {
    this.props.getListStatus(1, pageLimit, this.props.paramSearch);
    this.setState({
      pageLimit: pageLimit
    });
  }

  showStatus = (data) => {
    var result = null;
    if (data.length > 0) {
      result = data.map((status, index) => {
        return (
          <StatusItem
            key={index}
            status={status}
            index={index}
          />
        )
      });
    } else {
      result = <tr><td colSpan={5} className="text-center">No results found</td></tr>;
    }
    return result;
  }

  render() {

    const { loading, error, items } = this.props;

    const thead = [
      {
        className: 'sorting',
        style: {
          width: '100px'
        },
        value: 'Name'
      },
      {
        style: {
          width: '200px'
        },
        value: 'Description'
      },
      {
        className: 'sorting',
        style: {
          width: '100px'
        },
        value: 'Status'
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

            <StatusSearch />
            
            <div id="datatable_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
              <div className="row">
                <Export handleExport={this.handleExport} />
                <ItemPerPage handleChangePerPage={this.handleChangePerPage}/>
              </div>
              <div className="row">
                <DataTable thead={thead}>
                  {loading && <tr><td colSpan={5} className="text-center">Loading status...</td></tr>}
                  {error && <tr><td colSpan={5} className="text-center"><span className="text-danger">ERROR: {error}</span></td></tr>}
                  {items && items.data && this.showStatus(items.data)}
                </DataTable>
              </div>
              {items && items.data.length > 0 &&
              <div className="row">
                {items && items.meta && <PaginationTable pagination={items.meta} handlePageChange={this.handlePageChange} />}
              </div> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { status } = state;
  const { items, loading, error, paramSearch } = status;
  
  return {
    loading,
    error,
    items,
    paramSearch
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    getListStatus: (pageNumber, pageLimit, paramSearch) => {
      return dispatch(statusActions.getList(pageNumber, pageLimit, paramSearch));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusList);