import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { statusActions, modalActions } from '../../../actions';

class Action extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      status: 0,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    
    //validate error
    if (nextProps && nextProps.error && this.props.modal.isOpen) {
      let errors = {};
      Object.keys(nextProps.error).forEach(function (item) {
        if (typeof nextProps.error[item] === 'object') {
          Object.keys(nextProps.error[item]).forEach(function (error) {
            errors[item] = nextProps.error[item][error];
          });
        }
      });
      this.setState({ errors });
    } else {
      this.setState({ errors: {} });
    }

    //set status editing
    if (nextProps && nextProps.status) {
      this.setState({
        name: nextProps.status.name,
        description: nextProps.status.description,
        status: nextProps.status.status === 'Active' ? 1 : 0
      });
    } else {
      this.setState({
        name: '',
        description: '',
        status: 0
      })
    }
  }

  handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    if (this.state.errors[name]) {
      let errors = Object.assign({}, this.state.errors);
      delete errors[name];
      this.setState({
        [name]: value,
        errors
      });
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  hanldeSubmit = (e) => {
    e.preventDefault();
    
    const status = {
      name: this.state.name,
      description: this.state.description,
      status: parseInt(this.state.status, 10)
    }
    
    if (this.props.status) {
      status.id = this.props.status.status_id;
      this.props.onUpdate(status);
    } else {
      this.props.onCreate(status);
    }
  }

  toggle = () => {
    this.props.onToggleModal();
  }

  render() {
    const { name, description, status, errors } = this.state;

    return (
      <Modal isOpen={this.props.modal.isOpen} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Create New Status</ModalHeader>
        <form className="form-horizontal" onSubmit={this.hanldeSubmit}>
          <ModalBody>
            <div className="form-group m-b-25">
              <div className={classnames('col-12', { error: !!errors.name })}>
                <label htmlFor="name">Name</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  placeholder="Name"
                  name="name"
                  onChange={this.handleChange}
                  value={name}
                />
                <span>{errors.name}</span>
              </div>
            </div>
            <div className="form-group m-b-25">
              <div className="col-12">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={this.handleChange}
                  value={description}
                />
              </div>
            </div>
            <div className="form-group m-b-25">
              <div className="col-12">
                <label htmlFor="staus">Status</label>
                <select
                  className="form-control"
                  id="status"
                  name="status"
                  onChange={this.handleChange}
                  defaultValue={status}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="submit" className="btn btn-primary waves-effect waves-light">Save</button>
            <button type="button" className="btn btn-light waves-effect" onClick={this.toggle}>Close</button>
          </ModalFooter>
        </form>
      </Modal>
    )
  }
}

Action.propTypes = {
  modal: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
      id: PropTypes.number
  }).isRequired,
  error: PropTypes.object.isRequired,
  status: PropTypes.shape({
    status_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.string.isRequired
  }),
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onToggleModal: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  let { modal } = state;
  let status = null;
  if (modal && modal.id && state.status.items) {
    let statusList = state.status.items.data;
    status = statusList.find(item => item.status_id === modal.id);
  }

  return {
    error: state.status.error ? state.status.error : {},
    modal,
    status
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onCreate: (status) => {
      return dispatch(statusActions.create(status));
    },
    onUpdate: (status) => {
      return dispatch(statusActions.update(status));
    },
    onToggleModal: () => {
      return dispatch(modalActions.toggle());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Action);

