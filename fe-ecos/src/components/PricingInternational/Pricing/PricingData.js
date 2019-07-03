import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import { injectIntl } from 'react-intl';
import PricingVas from './PricingVas';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { updatePricingInternationalData, updatePricingInternationalVas } from '../../../redux/actions';

class PricingData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            enableSaveButton: false
        }
    }

    componentDidMount() {
        const { pricing_data } = this.props.pricing;
        let { data } = pricing_data;
        data = Object.keys(data).map(item => {
            return data[item];
        });
        this.setState({ data });
    }

    valueValidator = (value) => {
        const { messages } = this.props.intl;
        const nan = isNaN(value);
        if (!value || nan) {
            return messages['pri_int.validate-value-numberic'];
        }
        return true;
    }

    onAfterSaveCell = () => {
        this.setState({
            data: this.state.data,
            enableSaveButton: true
        });
    }

    onSaveTransportation = () => {
        const { id, pricing_data } = this.props.pricing;
        const { data, title } = pricing_data;

        Object.values(this.state.data).forEach((value, index) => {
            let id = Object.keys(data).filter((key, index2) => index2 === index);
            data[id] = value;
        });

        const dataSent = {
            id: id,
            status: 1,
            pricing_data: { title, data }
        }

        this.props.updatePricingInternationalData(dataSent);

        setTimeout(() => {
            this.setState({
                enableSaveButton: false
            });
        }, 500);
    }

    onSaveVas = values => {
        const data = values.vas;
        this.props.updatePricingInternationalVas(data);
    }

    formatPrice = (value) => {
        return new Intl.NumberFormat().format(value);
    }

    render() {
        const { type_action } = this.props;
        const { messages } = this.props.intl;
        const { pricing_data: { title }, shipment_type_code, shipment_type_name, id, pricing_vas } = this.props.pricing;
        let columns = Object.keys(title).map((item, index) => {
            if (index === 0) {
                return (
                    <TableHeaderColumn className="text-center" columnClassName="text-center" dataField={title[item]} isKey key={index}>{item}</TableHeaderColumn>
                )
            } else {
                return (
                    <TableHeaderColumn className="text-center" columnClassName="text-center" dataField={title[item]} key={index} dataFormat={this.formatPrice} editable={{ validator: this.valueValidator }}>{item}</TableHeaderColumn>
                )
            }
        });

        const cellEdit = {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell
        };

        return (
            <Fragment>
                <div className="mb-2">
                    <div className="mb-2 pricing-title">
                        <h4>{shipment_type_code} - {shipment_type_name}</h4>
                        {/* <Button size="sm" color="info">{messages['inactive']}</Button> */}
                        <div className="clearfix"></div>
                    </div>
                </div>
                <fieldset className="scheduler-border mb-2">
                    <legend className="scheduler-border">{messages['pri_int.transportation']}</legend>
                    { !Array.isArray(title) && 
                        <BootstrapTable data={this.state.data} cellEdit={type_action === 'edit' ? cellEdit : {}}>
                            {columns}
                        </BootstrapTable>
                    }
                    {this.state.enableSaveButton &&
                        <div className="text-right mt-2">
                            <Button
                                className="mb-1"
                                size="sm"
                                color="primary"
                                onClick={this.onSaveTransportation}
                            >{messages['save']}</Button>
                        </div>
                    }
                </fieldset>
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">{messages['pri_int.vas']}</legend>
                    <PricingVas pricing_data_id={id} pricing_vas={pricing_vas} onSubmit={this.onSaveVas} type_action={type_action} />
                </fieldset>
            </Fragment>
        )
    }
}

PricingData.propTypes = {
    updatePricingInternationalData: PropTypes.func.isRequired,
    updatePricingInternationalVas: PropTypes.func.isRequired,
}

const mapStateToProps = () => {
    return {}
}

export default injectIntl(connect(mapStateToProps, {
    updatePricingInternationalData,
    updatePricingInternationalVas
})(PricingData));