import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PricingVasItem from './PricingVasItem';
import { FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { getPricingSpecialVas, getPricingSpecialFieldVas } from '../../../redux/actions';
import PropTypes from 'prop-types';
import validate from './validateVasForm';
import ReactLoading from 'react-loading';

const renderVasItems = ({ fields, special_pricing_id, toggleTooltip, type_action, disableSaveAction }) => (
  <ul>
    <li className="group-action">
      <Button size="sm" color="info" id="PopoverLeft" onClick={toggleTooltip}><span className="lnr lnr-question-circle"></span></Button>
      {type_action === 'edit' &&
        <Button size="sm" color="success" onClick={() => fields.push({ id: 0, type: 0, special_pricing_id, spec: [] })}><span className="lnr lnr-plus-circle"></span></Button>
      }
      <div className="clearfix"></div>
    </li>
    {fields.map((vas, index) => (
      <PricingVasItem 
        vas={vas} 
        fields={fields} 
        index={index} 
        key={index} 
        type_action={type_action} 
        disableSaveAction={disableSaveAction}
      />
    ))}
  </ul>
)

class PricingVasForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toolTipOpen: false,
      disableSave: false
    }
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getPricingSpecialVas(id);
    this.props.getPricingSpecialFieldVas();
  }

  toggleTooltip = () => {
    this.setState({ toolTipOpen: !this.state.toolTipOpen })
  }

  disableSaveAction = disable => {
    this.setState({
      disableSave: disable
    })
  }

  render() {
    const { messages, locale } = this.props.intl;
    const { id } = this.props.match.params;
    const { handleSubmit, fieldVas, loadingFieldVas, type_action, loadingVas, submitting, vasForm } = this.props;
    
    return loadingVas ? (
      <ReactLoading type="bubbles" className="loading" />
    ) : (
        <form className="form form_custom pricing-vas" onSubmit={handleSubmit}>
          <FieldArray
            name="vas"
            component={renderVasItems}
            special_pricing_id={id}
            toggleTooltip={this.toggleTooltip}
            type_action={type_action}
            disableSaveAction={this.disableSaveAction}
          />
          {type_action === 'edit' && vasForm && vasForm.length > 0 &&
            <div className="text-right">
              <Button size="sm" color="primary" type="submit" disabled={submitting || this.state.disableSave}>{messages['save']}</Button>
            </div>
          }
          <Popover
            placement="left"
            isOpen={this.state.toolTipOpen}
            target="PopoverLeft"
            toggle={this.toggleTooltip}
            className="tooltip-field-vas"
          >
            <PopoverHeader>{messages['pri_special.field-vas-and-operator']}</PopoverHeader>
            <PopoverBody>
              <div>
                <h5>{messages['pri_special.field-vas']}</h5>
                <ul className="list-field-vas">
                  {loadingFieldVas ?
                    (
                      <ReactLoading type="bubbles" className="loading" width="32px" height="32px" />
                    ) :
                    fieldVas.map((item, index) => (
                      <li key={index}>
                        <b>{item.name}</b>:
                      <label>{locale === 'en-US' ? item.description_en : item.description}</label>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div>
                <h5>{messages['pri_special.operator']}</h5>
                <ul>
                  <li>
                    <b>+</b>:
                  <label>{messages['pri_special.addition']}</label>
                  </li>
                  <li>
                    <b>-</b>:
                  <label>{messages['pri_special.subtraction']}</label>
                  </li>
                  <li>
                    <b>*</b>:
                  <label>{messages['pri_special.multiplication']}</label>
                  </li>
                  <li>
                    <b>/</b>:
                  <label>{messages['pri_special.division']}</label>
                  </li>
                </ul>
              </div>
            </PopoverBody>
          </Popover>
        </form>
      );
  }
}

PricingVasForm.propTypes = {
  getPricingSpecialVas: PropTypes.func.isRequired,
  getPricingSpecialFieldVas: PropTypes.func.isRequired,
  loadingFieldVas: PropTypes.bool.isRequired,
  fieldVas: PropTypes.array,
  type_action: PropTypes.string.isRequired,
}

PricingVasForm = reduxForm({
  form: 'pricing_special_vas_action_form',
  enableReinitialize: true,
  validate
})(PricingVasForm)

const mapStateToProps = (state, props) => {
  const { pricingSpecial } = state;
  const { pricing: { vas, loadingVas, fieldVas, loadingFieldVas } } = pricingSpecial;
  const selector = formValueSelector('pricing_special_vas_action_form');
  const vasForm = selector(state, 'vas');
  
  return {
    initialValues: { vas },
    fieldVas,
    loadingVas,
    loadingFieldVas,
    vasForm
  }
};

const mapDispatchToProps = {
  getPricingSpecialVas,
  getPricingSpecialFieldVas
};

PricingVasForm = connect(mapStateToProps, mapDispatchToProps)(PricingVasForm)

export default withRouter(injectIntl(PricingVasForm));

