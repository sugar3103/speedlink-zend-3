import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { statusActions } from '../../../actions';
import { PAGE_LIMIT } from '../../../constants/config';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: -1
    }
  }

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.name === 'name' ? target.value : parseInt(target.value, 10);
    this.setState({
      [name]: value
    });
  }

  handleClear = (e) => {
    this.setState({
      name: '',
      status: -1
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSearch(this.state);
  }

  render() {
    const { name, status } = this.state;
    return (
      <fieldset className="scheduler-border">
        <legend className="scheduler-border">Search</legend>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name" className="col-form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                name="name"
                onChange={this.handleChange}
                value={name}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="status" className="col-form-label">Status</label>
              <select
                className="form-control"
                id="status"
                name="status"
                onChange={this.handleChange}
                value={status}
              >
                <option value={-1}>All</option>
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
          </div>
          <button type="button" onClick={this.handleClear} className="btn btn-light waves-effect float-right">Clear</button>
          <button type="submit" className="btn btn-primary waves-light waves-effect float-right mr-3">Search</button>
        </form>
      </fieldset>
    )
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleSearch: (params) => {
      return dispatch(statusActions.getList(1, PAGE_LIMIT, params));
    }
  }
}

export default connect(null, mapDispatchToProps)(Search);
