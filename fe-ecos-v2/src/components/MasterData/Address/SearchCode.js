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
import { getAddressList } from '../../../redux/actions';
import { SELECTED_PAGE_SIZE } from '../../../constants/defaultValues';

class SearchCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      zipCode: '',
      country: '',
      city: '',
      district: '',
      ward: '',
      brand: '',
      hub: ''
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
      code: '',
      zipCode: '',
      country: '',
      city: '',
      district: '',
      ward: '',
      branch: '',
      hub: ''
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
    this.props.getAddressList(params, this.props.history)
  }

  render() {
    const { messages } = this.props.intl;
    const { code, zipCode, country, city, district, ward, brand, hub } = this.state;
    return (
      <div className="mb-2">
        <fieldset className="scheduler-border">
          <legend className="scheduler-border"><IntlMessages id="status.search" /></legend>
          <Form>
            <FormGroup row>
              <Colxx sm={3}>
                <FormGroup>
                  <Label for="code">
                    <IntlMessages id="address.code" />
                  </Label>
                  <Input
                    type="text"
                    name="code"
                    onChange={this.onChange}
                    value={code}
                    placeholder={messages["address.code"]}
                  />
                </FormGroup>
              </Colxx>
              <Colxx sm={3}>
                <FormGroup>
                  <Label for="zipCode">
                    <IntlMessages id="address.zip-code" />
                  </Label>
                  <Input
                    type="text"
                    name="zipCode"
                    onChange={this.onChange}
                    value={zipCode}
                    placeholder={messages["address.zip-code"]}
                  />
                </FormGroup>
              </Colxx>
              <Colxx sm={3}>
                <FormGroup>
                  <Label for="country">
                    <IntlMessages id="address.country" />
                  </Label>
                  <Input
                    type="text"
                    name="country"
                    onChange={this.onChange}
                    value={country}
                    placeholder={messages["address.country"]}
                  />
                </FormGroup>
              </Colxx>
              <Colxx sm={3}>
                <FormGroup>
                  <Label for="city">
                    <IntlMessages id="address.city" />
                  </Label>
                  <Input
                    type="text"
                    name="city"
                    onChange={this.onChange}
                    value={city}
                    placeholder={messages["address.city"]}
                  />
                </FormGroup>
              </Colxx>
              <Colxx sm={3}>
                <FormGroup>
                  <Label for="district">
                    <IntlMessages id="address.district" />
                  </Label>
                  <Input
                    type="text"
                    name="district"
                    onChange={this.onChange}
                    value={district}
                    placeholder={messages["address.district"]}
                  />
                </FormGroup>
              </Colxx>
              <Colxx sm={3}>
                <FormGroup>
                  <Label for="ward">
                    <IntlMessages id="address.ward" />
                  </Label>
                  <Input
                    type="text"
                    name="ward"
                    onChange={this.onChange}
                    value={ward}
                    placeholder={messages["address.ward"]}
                  />
                </FormGroup>
              </Colxx>
              <Colxx sm={3}>
                <FormGroup>
                  <Label for="brandCode">
                    <IntlMessages id="address.brand-code" />
                  </Label>
                  <Input
                    type="text"
                    name="brandCode"
                    onChange={this.onChange}
                    value={brand}
                    placeholder={messages["address.brand-code"]}
                  />
                </FormGroup>
              </Colxx>
              <Colxx sm={3}>
                <FormGroup>
                  <Label for="hubCode">
                    <IntlMessages id="address.hub-code" />
                  </Label>
                  <Input
                    type="text"
                    name="hubCode"
                    onChange={this.onChange}
                    value={hub}
                    placeholder={messages["address.hub-code"]}
                  />
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

SearchCode.propTypes = {
  getAddressList: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  getAddressList
})(SearchCode));