import React, { Component, Fragment } from 'react';
import { Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PricingVasItem from './PricingVasItem';
import { FieldArray, reduxForm } from 'redux-form';
import { getPricingInternationalFieldVas } from '../../../redux/actions';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import validate from './validateVasForm';

const renderVasItems = ({ fields, messages, meta: { submitFailed, error }, pricing_data_id, toggleTooltip, type_action }) => (
    <Fragment>
        <ul>
            <li className="group-action mb-2">
                <Button size="sm" color="info" id={`PopoverLeft${pricing_data_id}`} onClick={toggleTooltip}><span className="lnr lnr-question-circle"></span></Button>
                {type_action === 'edit' &&
                    <Button size="sm" color="success" onClick={() => fields.push({ id: 0, type: 0, pricing_data_id, spec: [] })}><span className="lnr lnr-plus-circle"></span></Button>
                }
                {submitFailed && error && <span>{error}</span>}
                <div className="clearfix"></div>
            </li>
            {fields.map((vas, index) => {
                if (!fields.get(index).is_deleted) {
                    return <PricingVasItem vas={vas} fields={fields} index={index} key={index} type_action={type_action} pricing_data_id={pricing_data_id} />
                }
                return null;
            })
            }
        </ul>
        {fields.length > 0 && type_action === 'edit' &&
            <div className="text-right">
                <Button size="sm" color="primary" type="submit">{messages['save']}</Button>
            </div>
        }
    </Fragment>
)

class PricingVas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toolTipOpen: false
        }
    }

    componentWillMount() {
        this.props.getPricingInternationalFieldVas();
    }

    toggleTooltip = () => {
        this.setState({ toolTipOpen: !this.state.toolTipOpen })
    }

    render() {
        const { handleSubmit, pricing_data_id, intl: { messages, locale }, fieldVas, loadingFieldVas, loadingData, type_action } = this.props;
        return loadingData ? (
            <ReactLoading type="bubbles" className="loading" />
        ) : (
                <form className="form form_custom pricing-vas" onSubmit={handleSubmit}>
                    <FieldArray
                        name="vas"
                        messages={messages}
                        component={renderVasItems}
                        pricing_data_id={pricing_data_id}
                        toggleTooltip={this.toggleTooltip}
                        type_action={type_action}
                    />
                    <Popover
                        placement="left"
                        isOpen={this.state.toolTipOpen}
                        target={`PopoverLeft${pricing_data_id}`}
                        toggle={this.toggleTooltip}
                        className="tooltip-field-vas"
                    >
                        <PopoverHeader>{messages['pri_int.field-vas-and-operator']}</PopoverHeader>
                        <PopoverBody>
                            <div>
                                <h5>{messages['pri_int.field-vas']}</h5>
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
                                <h5>{messages['pri_int.operator']}</h5>
                                <ul>
                                    <li>
                                        <b>+</b>:
                                        <label>{messages['pri_int.addition']}</label>
                                    </li>
                                    <li>
                                        <b>-</b>:
                                        <label>{messages['pri_int.subtraction']}</label>
                                    </li>
                                    <li>
                                        <b>*</b>:
                                        <label>{messages['pri_int.multiplication']}</label>
                                    </li>
                                    <li>
                                        <b>/</b>:
                                        <label>{messages['pri_int.division']}</label>
                                    </li>
                                </ul>
                            </div>
                        </PopoverBody>
                    </Popover>
                </form>
            );
    }
}

PricingVas.propTypes = {
    getPricingInternationalFieldVas: PropTypes.func.isRequired,
    loadingFieldVas: PropTypes.bool.isRequired,
    fieldVas: PropTypes.array,
    vas: PropTypes.array
}

const mapStateToProps = ({ pricingInternational }, { pricing_data_id, pricing_vas }) => {
    const { pricing: { loadingData, fieldVas, loadingFieldVas } } = pricingInternational;
    return {
        form: `pricing_international_vas_action_form_${pricing_data_id}`,
        initialValues: { vas: pricing_vas },
        loadingData,
        fieldVas,
        loadingFieldVas
    }
};

const mapDispatchToProps = {
    getPricingInternationalFieldVas
};

const PricingVasForm = connect(mapStateToProps, mapDispatchToProps)(injectIntl(reduxForm({
    enableReinitialize: true,
    validate
})(PricingVas)))

export default PricingVasForm;

