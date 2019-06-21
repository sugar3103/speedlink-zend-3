import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PricingVasItem from './PricingVasItem';
import { FieldArray, reduxForm } from 'redux-form';
// import { getPricingVas } from '../../../redux/actions';
import PropTypes from 'prop-types';

const renderVasItems = ({ fields, meta: { submitFailed, error }, pricing_data_id }) => (
    <ul>
        <li className="group-action">
            <Button size="sm" color="info"><span className="lnr lnr-question-circle"></span></Button>
            <Button size="sm" color="success" onClick={() => fields.push({ id: 0, type: 0, pricing_data_id })}><span className="lnr lnr-plus-circle"></span></Button>
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
)

class PricingVas extends Component {

    // componentWillMount() {
    //     const params = {
    //         offset: {
    //             limit: 0
    //         },
    //         query: {
    //             pricing_data_id: this.props.pricing_data_id
    //         }
    //     }
    //     this.props.getPricingVas(params);
    // }

    render() {
        const { messages } = this.props.intl;
        const { handleSubmit, submitting, pricing_data_id } = this.props;

        return (
            <form className="form form_custom pricing-vas" onSubmit={handleSubmit}>
                <FieldArray name="vas" component={renderVasItems} pricing_data_id={pricing_data_id} />
                <div className="text-right">
                    <Button size="sm" color="primary" type="submit" disabled={submitting}>{messages['save']}</Button>
                </div>
            </form>
        );
    }
}

PricingVas.propTypes = {
    // getPricingVas: PropTypes.func.isRequired,
    vas: PropTypes.array
}

let PricingVasForm = reduxForm({
    form: 'pricing_vas_action_form',
    enableReinitialize: true
})(PricingVas)

const mapStateToProps = ({pricing}) => ({
    initialValues: {
        vas: pricing.vas
    }
});
  
const mapDispatchToProps = {
    // getPricingVas
};

PricingVasForm = connect(mapStateToProps, mapDispatchToProps)(PricingVasForm)

export default injectIntl(PricingVasForm); 

