import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import CustomField from '../../../containers/Shared/form/CustomField';
import { formatCurrency, normalizeCurrency } from '../../../util/format-field';

const required = value => value ? undefined : 'pri_dom.field-is-required';
const number = value => value && isNaN(Number(value)) ? 'pri_dom.field-is-number' : undefined;
const nonNegative = value => value && value < 0 ? `pri_dom.field-not-negative` : undefined;

class RangeWeightEditForm extends Component {

  showField = items => {
    const { locale } = this.props.intl;
    let result = [];
    if (items && items.range_weight.length > 0) {
      result = items.range_weight.map((item, index) => (
        <div className="form__form-group" key={index}>
          <span className="form__form-group-label">{locale === 'en-US' ? item.name_en : item.name}</span>
          <div className="form__form-group-field">
            <Field
              name={`range_weight_${item.id}`}
              component={CustomField}
              validate={[required, number, nonNegative]}
              format={formatCurrency}
              normalize={normalizeCurrency}
            />
          </div>
        </div>
      ));
    }
    return result;
  }

  componentWillMount() {
    const { data } = this.props;
    if (data && data.range_weight.length > 0) {
      let initialValue = { pricing_id: data.pricing_id };
      data.range_weight.forEach(item => {
        initialValue = {
          ...initialValue,
          [`range_weight_${item.id}`]:  item.value
        }
      });
      this.props.initialize(initialValue);
    }
  }
  

  render() {
    const { handleSubmit, toggleModal, data } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form form--horizontal form-edit-range-weight-value" onSubmit={handleSubmit}>
        <div className="modal__header">
          <button className="lnr lnr-cross modal__close-btn" onClick={toggleModal} />
          <h4 className="bold-text  modal__title">{messages['pri_dom.edit-range-weight-value']}</h4>
        </div>
        <div className="modal__body">
          {this.showField(data)}
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={toggleModal}>{messages['cancel']}</Button>
          <Button color="primary" type="submit">{messages['save']}</Button>
        </ButtonToolbar>
      </form>
    );
  }
}

RangeWeightEditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = ({ authUser }) => {
  return { authUser }
}

export default connect(mapStateToProps, {
})(reduxForm({
  form: 'pricing_domestic_range_weight_edit_form',
})(injectIntl(RangeWeightEditForm)));