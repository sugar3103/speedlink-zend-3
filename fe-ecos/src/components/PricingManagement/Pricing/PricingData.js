import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import { injectIntl } from 'react-intl';
import PricingVas from './PricingVas';
// import PricingCod from './PricingCod';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { updatePricingDataItem, updatePricingVasItem } from '../../../redux/actions';

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
          return messages['pricing.validate-value-numberic'];
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
        const { messages } = this.props.intl;
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

        this.props.updatePricingDataItem(dataSent, messages);

        setTimeout(() => {
            this.setState({
                enableSaveButton: false
            });
        }, 500);
    }

    onSaveVas = values => {
        const { messages } = this.props.intl;
        const data = values.vas;
        this.props.updatePricingVasItem(data, messages);
    }

    render() {
        const { messages } = this.props.intl;
        const { pricing_data, shipment_type_code, shipment_type_name, id } = this.props.pricing;
        const { title } = pricing_data;
        
        let columns = Object.keys(title).map((item, index) => {
            if (index === 0) {
                return (
                    <TableHeaderColumn dataField={title[item]} isKey key={index}>{item}</TableHeaderColumn>
                )
            } else {
                return (
                    <TableHeaderColumn dataField={title[item]} key={index} editable={ { validator: this.valueValidator } }>{item}</TableHeaderColumn>
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
                        <Button size="sm" color="info">{messages['inactive']}</Button>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">{messages['pricing.transportation']}</legend>
                    <BootstrapTable data={ this.state.data } cellEdit={ cellEdit }>
                        {columns}
                    </BootstrapTable>
                    {this.state.enableSaveButton && 
                        <div className="text-right">
                            <Button 
                                size="sm" 
                                color="primary" 
                                onClick={this.onSaveTransportation}
                            >{messages['save']}</Button>
                        </div>
                    }
                </fieldset>
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">{messages['pricing.value-services']}</legend>
                    <PricingVas pricing_data_id={id} onSubmit={this.onSaveVas}/>
                </fieldset>
                {/* <fieldset className="scheduler-border">
                    <legend className="scheduler-border">{messages['pricing.cod']}</legend>
                    <PricingCod />
                </fieldset> */}
            </Fragment>
        )
    }
}

PricingData.propTypes = {
    updatePricingDataItem: PropTypes.func.isRequired,
    updatePricingVasItem: PropTypes.func.isRequired,
}

const mapStateToProps = () => {
    return {}
}

export default injectIntl(connect(mapStateToProps, {
    updatePricingDataItem,
    updatePricingVasItem
})(PricingData));