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
import { Colxx } from "../../Layout/CustomBootstrap";

import { connect } from 'react-redux';
import { getDistrictList } from '../../../redux/actions';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: ''
    }
  }

  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  onClear = (e) => {
    this.setState({
      name: '',
      status: ''
    });
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
    this.props.getDistrictList(params, this.props.history)
  }

  handleKeyPress = (e) => {
    
    if(e.key === "Enter") {
      this.onSubmit(e);
    }
    
  }

  render() {
    const { messages } = this.props.intl;
    const { name, status} = this.state;
    return (
      <div className="mb-2">
        <fieldset className="scheduler-border">
          <legend className="scheduler-border"><IntlMessages id="status.search" /></legend>
          <Form>
            <FormGroup row>
              <Colxx sm={6}>
                <FormGroup>
                  <Label for="name">
                    <IntlMessages id="address.district" />
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    onChange={this.onChange}
                    onKeyPress={this.handleKeyPress}
                    value={name}
                    placeholder={messages["address.district"]}
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
  getDistrictList: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  getDistrictList
})(Search));