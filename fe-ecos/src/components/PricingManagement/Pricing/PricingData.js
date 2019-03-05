import React, { Component } from 'react';
import { Button } from 'reactstrap';
import EditTable from '../../../containers/Shared/table/EditableTable';
import { injectIntl } from 'react-intl';
import PricingVas from './PricingVas';
import PricingCod from './PricingCod';
class PricingData extends Component {

    onSaveTransportation = (dataSent) => {
        const { data, title } = this.props.pricing.pricing_data;

        Object.values(dataSent).forEach((value, index) => {
            let id = Object.keys(data).filter((key, index2) => index2 === index);
            data[id] = value;
        });

        const result = { title, data }
        
    }

    render() {
        const { messages } = this.props.intl;
        const { pricing_data, shipment_type_code, shipment_type_name } = this.props.pricing;
        const { data, title } = pricing_data;
        let heads = Object.keys(title).map((item, index) => {
            let head = {};
            if (index === 0) {
                head = {
                    key: title[item],
                    name: item,
                    editable: false,
                    width: 120
                }
            } else {
                head = {
                    key: title[item],
                    name: item,
                    editable: true,
                    width: 105
                }
            }
            return head;
        });

        let rows = Object.keys(data).map(item => {
            return data[item];
        });

        return (
            <div className="pricing">
                <div className="mb-2">
                    <div className="mb-2 pricing-title">
                        <h4>{shipment_type_code} - {shipment_type_name}</h4>
                        <Button size="sm" color="info">{messages['inactive']}</Button>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">{messages['pricing.transportation']}</legend>
                    <EditTable
                        heads={heads}
                        rows={rows}
                        onSaveTable={this.onSaveTransportation}
                    />
                </fieldset>
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">{messages['pricing.value-services']}</legend>
                    <PricingVas />
                </fieldset>
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">{messages['pricing.cod']}</legend>
                    <PricingCod />
                </fieldset>
            </div>
        )
    }
}

export default injectIntl(PricingData);