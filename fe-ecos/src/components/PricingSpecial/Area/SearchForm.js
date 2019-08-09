import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import renderSelectField from '../../../containers/Shared/form/Select';
import { getCustomerSpecialList } from '../../../redux/actions';

class SearchForm extends Component {

  componentWillMount() {
    const params = {
      field: ['id', 'name'],
      offset: {
        limit: 0
      }
    };
    this.props.getCustomerSpecialList(params);
  }


  showOptionCustomer = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
    return result;
  }

  render() {
    const { handleSubmit, reset, customer } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__third">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_special.name']}</span>
            <div className="form__form-group-field">
              <Field
                name="name"
                component="input"
                type="text"
                placeholder={messages['name']}
              />
            </div>
          </div>
        </div>
        <div className="form__third">
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_special.customer']}</span>
            <div className="form__form-group-field">
              <Field
                name="customer_id"
                component={renderSelectField}
                options={customer.items && this.showOptionCustomer(customer.items)}
              />
            </div>
          </div>
        </div>
        <div className="search-group-button">
          <Button
            size="sm"
            outline
            onClick={(e) => {
              reset();
              setTimeout(() => {
                handleSubmit();
              }, 200);
            }}
          >{messages['clear']}</Button>{' '}
          <Button
            size="sm"
            color="primary"
            id="search"
          >{messages['search']}</Button>
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  getCustomerSpecialList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ pricingSpecial }) => {
  const { customer } = pricingSpecial;
  return {
    customer,
  }
}


export default connect(mapStateToProps, {
  getCustomerSpecialList,
})(reduxForm({
  form: 'area_special_search_form'
})(injectIntl(SearchForm)));
