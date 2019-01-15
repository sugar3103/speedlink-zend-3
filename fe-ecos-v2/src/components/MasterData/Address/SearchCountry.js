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
import { getCountryList } from '../../../redux/actions';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';

class SearchCountry extends Component {
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
    }, () => {
      const params = {
        pagination: {
          page: 1,
          perpage: SELECTED_PAGE_SIZE
        },
        query: this.state
      }
      this.props.getCountryList(params, this.props.history)
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
    this.props.getCountryList(params, this.props.history)
  }

  onKeyPress = e => {
    if (e.key === 'Enter')
      this.onSubmit(e);
  }

  render() {
    const { messages } = this.props.intl;
    const { name, status } = this.state;
    return (
      <div className="mb-2">
        <fieldset className="scheduler-border">
          <legend className="scheduler-border"><IntlMessages id="country.search" /></legend>
          <Form>
            <FormGroup row>
              <Colxx sm={6}>
                <FormGroup>
                  <Label for="exampleEmailGrid">
                    <IntlMessages id="country.name" />
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                    value={name}
                    placeholder={messages["country.name"]}
                  />
                </FormGroup>
              </Colxx>
              <Colxx sm={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="country.status" />
                  </Label>
                  <Input 
                    type="select"
                    name="status"
                    onChange={this.onChange}
                    value={status}
                  >
                    <option value={-1}>{messages["country.all"]}</option>
                    <option value={1}>{messages["country.active"]}</option>
                    <option value={0}>{messages["country.inactive"]}</option>
                  </Input>
                </FormGroup>
              </Colxx>
            </FormGroup>
            <Button color="light float-sm-right" size="sm" onClick={this.onClear}>
              <IntlMessages id="country.clear" />
            </Button>
            <Button color="info float-sm-right mr-2" size="sm" onClick={this.onSubmit}>
              <IntlMessages id="country.search" />
            </Button>
          </Form>
        </fieldset>
      </div>
    );
  }
}

SearchCountry.propTypes = {
  getCountryList: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  getCountryList
})(SearchCountry));