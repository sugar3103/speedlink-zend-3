import React, { Component, Fragment } from 'react';
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray } from 'redux-form';
import PropTypes from 'prop-types';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';
import { formatCurrency, normalizeCurrency } from '../../../util/format-field';
import validate from './validateEditRangeWeightForm';

const renderRangeWeight = ({ fields, meta: { error }, intl: { locale, messages } }) => (
  <Fragment>
    {fields.map((item, index) => (
      <Row key={index}>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{locale === 'en-US' ? fields.get(index).name_en : fields.get(index).name}</span>
            <div className="form__form-group-field">
              <Field
                name={`${item}.value`}
                component={CustomField}
                format={formatCurrency}
                normalize={normalizeCurrency}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_special.type']}</span>
            <div className="form__form-group-field">
              <Field
                name={`${item}.type`}
                component={renderSelectField}
                options={[
                  { value: 0, label: messages['pri_special.fixed'] },
                  { value: 1, label: messages['pri_special.percentage'] }
                ]}
                clearable={false}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['pri_special.return-value']}</span>
            <div className="form__form-group-field">
              <Field
                name={`${item}.type_value`}
                component={CustomField}
              />
            </div>
          </div>
        </Col>
        <Col md={{ size: 4, offset: 4 }}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['from']}</span>
            <div className="form__form-group-field">
              <Field
                name={`${item}.lead_time_from`}
                component={CustomField}
                type="number"
                placeholder={messages['pri_special.lead-time']}
              />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="form__form-group">
            <span className="form__form-group-label">{messages['to']}</span>
            <div className="form__form-group-field">
              <Field
                name={`${item}.lead_time_to`}
                component={CustomField}
                type="number"
                placeholder={messages['pri_special.lead-time']}
              />
            </div>
          </div>
        </Col>
        <Col md={12}><hr /></Col>
      </Row>
    ))}
  </Fragment>
)

class RangeWeightEditForm extends Component {

  componentWillMount() {
    const { data } = this.props;
    if (data && data.data.length > 0) {
      this.props.initialize(data);
    }
  }

  toggleModal = (e) => {
    e.preventDefault();
    this.props.toggleModal();
  }

  render() {
    const { handleSubmit } = this.props;
    const { messages } = this.props.intl;
    return (
      <form className="form form--horizontal form-edit-range-weight-value" onSubmit={handleSubmit}>
        <div className="modal__header">
          <button className="lnr lnr-cross modal__close-btn" onClick={this.toggleModal} />
          <h4 className="bold-text  modal__title">{messages['pri_special.edit-range-weight-value']}</h4>
        </div>
        <div className="modal__body">
          <FieldArray name='data' component={renderRangeWeight} intl={this.props.intl} />
        </div>
        <ButtonToolbar className="modal__footer">
          <Button outline onClick={this.toggleModal}>{messages['cancel']}</Button>
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
  form: 'pricing_special_range_weight_edit_form',
  validate
})(injectIntl(RangeWeightEditForm)));