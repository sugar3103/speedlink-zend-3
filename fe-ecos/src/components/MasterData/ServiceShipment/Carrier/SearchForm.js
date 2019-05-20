import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import renderSelectField from '../../../../containers/Shared/form/Select';
import { Button, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCarrierCodeList } from "../../../../redux/actions";

class SearchForm extends Component {

  componentDidMount() {
    this.props.getCarrierCodeList();
  }

  showOptionCarrier = (items) => {
    let result = [];
    if (items.length > 0) {
      result = items.map(item => {
        return {
          value: item.code,
          label: item.code
        }
      })
    }
    return result;
  }

  render() {
    const { handleSubmit, reset, carrierCode } = this.props;
    const { messages, locale } = this.props.intl;
    return (
      <form className="form" onSubmit={handleSubmit}>
      
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['carrier.code']}</span>
            <div className="form__form-group-field">
              <Field name="code" component={renderSelectField} type="text"
                options={carrierCode && this.showOptionCarrier(carrierCode)} />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['name']}</span>
            <div className="form__form-group-field">
              <Field component="input" type="text" placeholder={messages['name']}
                name={locale === 'en-US' ? 'name_en' : 'name'} />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['status']}</span>
            <div className="form__form-group-field">
              <Field name="status" component={renderSelectField} type="text" options={[
                { value: -1, label: messages['all'] },
                { value: 1, label: messages['active'] },
                { value: 0, label: messages['inactive'] }
              ]}
              />
            </div>
          </div>
        </Col>
        <Col md={12} className="text-right">
          <div className="search-group-button">
            <Button size="sm" outline onClick={(e) => {
              reset();
              setTimeout(() => {
                handleSubmit();
              }, 200);
            }} >
              {messages['clear']}</Button>{' '}
            <Button size="sm" color="primary" id="search" >
              {messages['search']}
            </Button>
          </div>
        </Col>
      </form>
    );
  }
}

SearchForm.propTypes = {
  carrierCode: PropTypes.array,
  getCarrierCodeList: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

const mapStateToProps = ({ carrier }) => {
  const carrierCode = carrier.codes;
  return { carrierCode }
}

export default connect(mapStateToProps, {
  getCarrierCodeList
})(reduxForm({ 
  form: 'carrier_search_form'
})(injectIntl(SearchForm)));