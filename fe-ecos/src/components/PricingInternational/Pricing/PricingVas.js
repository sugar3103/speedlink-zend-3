import React, { Component, Fragment } from 'react';
import { Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PricingVasItem from './PricingVasItem';
import { FieldArray, reduxForm } from 'redux-form';
import { getPricingInternationalVas, getPricingInternationalFieldVas } from '../../../redux/actions';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const renderVasItems = ({ fields, messages, meta: { submitFailed, error }, pricing_data_id, toggleTooltip }) => (
    <Fragment>
        <ul>
            <li className="group-action mb-2">
                <Button size="sm" color="info" id="PopoverLeft" onClick={toggleTooltip}><span className="lnr lnr-question-circle"></span></Button>

                <Button size="sm" color="success" onClick={() => fields.push({ id: 0, type: 0, pricing_data_id, spec: [] })}><span className="lnr lnr-plus-circle"></span></Button>
                {submitFailed && error && <span>{error}</span>}
                <div className="clearfix"></div>
            </li>
            {fields.map((vas, index) => {
                if (!fields.get(index).is_deleted) {
                    return <PricingVasItem vas={vas} fields={fields} index={index} key={index} />
                }
                return null;
            })
            }
        </ul>
        {fields.length > 0 &&
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
        const params = {
            offset: {
                limit: 0
            },
            query: {
                pricing_data_id: this.props.pricing_data_id
            }
        }
        this.props.getPricingInternationalVas(params);
        this.props.getPricingInternationalFieldVas();
    }

    toggleTooltip = () => {
        this.setState({ toolTipOpen: !this.state.toolTipOpen })
    }

    render() {
        const { handleSubmit, pricing_data_id, intl: { messages, locale }, fieldVas, loadingFieldVas, loadingVas } = this.props;

        return loadingVas ? (
            <ReactLoading type="bubbles" className="loading" />
        ) : (
                <form className="form form_custom pricing-vas" onSubmit={handleSubmit}>
                    <FieldArray
                        name="vas"
                        messages={messages}
                        component={renderVasItems}
                        pricing_data_id={pricing_data_id}
                        toggleTooltip={this.toggleTooltip}
                    />
                    <Popover
                        placement="left"
                        isOpen={this.state.toolTipOpen}
                        target="PopoverLeft"
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
    getPricingInternationalVas: PropTypes.func.isRequired,
    getPricingInternationalFieldVas: PropTypes.func.isRequired,
    loadingFieldVas: PropTypes.bool.isRequired,
    fieldVas: PropTypes.array,
    vas: PropTypes.array
}

let PricingVasForm = reduxForm({
    form: 'pricing_international_vas_action_form',
    enableReinitialize: true
})(PricingVas)

const mapStateToProps = ({ pricingInternational }) => {
    const { pricing: { vas, loadingVas, fieldVas, loadingFieldVas } } = pricingInternational;
    return {
        initialValues: { vas },
        loadingVas,
        fieldVas,
        loadingFieldVas
    }
};

const mapDispatchToProps = {
    getPricingInternationalVas,
    getPricingInternationalFieldVas
};

PricingVasForm = connect(mapStateToProps, mapDispatchToProps)(injectIntl(PricingVasForm))

export default PricingVasForm;

