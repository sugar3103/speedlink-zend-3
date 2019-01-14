import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import IntlMessages from "../../../util/IntlMessages";
import { 
  Button, 
  Form, 
  FormGroup, 
  Label, 
  Input, 
} from 'reactstrap';
import { Colxx } from "../../../components/Layout/CustomBootstrap";

import { connect } from 'react-redux';
import { getStatusList } from '../../../redux/actions';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: -1
    }
  }

  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.name === 'name' ? target.value : parseInt(target.value, 10);
    this.setState({
      [name]: value
    });
  }

  onClear = (e) => {
    this.setState({
      name: '',
      status: -1
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const params = {
      pagination: {
        page: 1,
        perpage: SELECTED_PAGE_SIZE
      },
      query: this.state
    }
    this.props.getStatusList(params, this.props.history)
  }

  render() {
    const { messages } = this.props.intl;
    const { name, status } = this.state;
    return (
      <div className="mb-2">
        <fieldset className="scheduler-border">
          <legend className="scheduler-border"><IntlMessages id="status.search" /></legend>
          <Form>
            <FormGroup row>
              <Colxx sm={6}>
                <FormGroup>
                  <Label for="exampleEmailGrid">
                    <IntlMessages id="status.name" />
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    onChange={this.onChange}
                    value={name}
                    placeholder={messages["status.name"]}
                  />
                </FormGroup>
              </Colxx>
              <Colxx sm={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="status.status" />
                  </Label>
                  <Input 
                    type="select"
                    name="status"
                    onChange={this.onChange}
                    value={status}
                  >
                    <option value={-1}>{messages["status.all"]}</option>
                    <option value={1}>{messages["status.active"]}</option>
                    <option value={0}>{messages["status.inactive"]}</option>
                  </Input>
                </FormGroup>
              </Colxx>
            </FormGroup>
            <Button color="light float-sm-right" size="sm" onClick={this.onClear}>
              <IntlMessages id="status.clear" />
            </Button>
            <Button color="info float-sm-right mr-2" size="sm" onClick={this.onSubmit}>
              <IntlMessages id="status.search" />
            </Button>
          </Form>
        </fieldset>
      </div>
    );
  }
}

Search.propTypes = {
  getStatusList: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  getStatusList
})(Search));