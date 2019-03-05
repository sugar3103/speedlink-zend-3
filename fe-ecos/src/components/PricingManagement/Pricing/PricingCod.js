import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import CustomField from '../../../containers/Shared/form/CustomField';
import renderSelectField from '../../../containers/Shared/form/Select';
import EditTable from '../../../containers/Shared/table/EditableTable';

const data = {
    "list": [
        {
            "id": 1,
            "pricing_data_id": 1,
            "from": "0.00",
            "to": "5.00",
            "internal_city": "10.00",
            "internal_city_ras": "20.00",
            "external_city": "30.00",
            "external_city_ras": "40.00"
        },
        {
            "id": 2,
            "pricing_data_id": 1,
            "from": "6.00",
            "to": "10.00",
            "internal_city": "15.00",
            "internal_city_ras": "25.00",
            "external_city": "35.00",
            "external_city_ras": "45.00"
        },
        {
            "id": 5,
            "pricing_data_id": 1,
            "from": "11.00",
            "to": "15.00",
            "internal_city": "20.00",
            "internal_city_ras": "30.00",
            "external_city": "40.00",
            "external_city_ras": "50.00"
        },
        {
            "id": 4,
            "pricing_data_id": 1,
            "from": "16.00",
            "to": "20.00",
            "internal_city": "25.00",
            "internal_city_ras": "35.00",
            "external_city": "45.00",
            "external_city_ras": "55.00"
        }
    ],
    "min": [
        {
            "id": 1,
            "pricing_data_id": 1,
            "internal_city_min": "10.00",
            "internal_city_ras_min": "10.00",
            "external_city_min": "10.00",
            "external_city_ras_min": "10.00"
        }
    ]
};

class PricingCod extends Component {
    constructor(props) {
        super()
        this.state = {
            preData: '',
        }
    }

    headerTable() {
        const { messages } = this.props.intl;
        let headers = Object.keys(data.list[0]).map((item, index) => {
            if (index > 1) {
                return {
                    key: item,
                    name: messages['pricing.' + item],
                    editable: true,
                    width: 120
                }

            }
        })
        let _headers = headers.slice(2);

        _headers.unshift({
            key: 'action',
            name: '',
            editable: false,
            width: 120
        })

        return _headers;
    }

    rowTable() {
        let rows = Object.keys(data.list).map((item, index) => {
            let row = {'action': '', ...data.list[item]};
            return row
        })
        return rows;
    }

    getCellActionDelete(column, row) {
        const actionDelete = {
            icon: <span className="icon-edit"></span>,
            callback: () => {
                alert("Option 1 clicked");
              }
        }

       const _action = { action: actionDelete}
       return _action[column.key];
    }
    render() {
        const { messages } = this.props.intl;
        this.headerTable()
        return (
            <form className="form form_custom pricing-cod">
                <div className="group-action">
                    <Button size="sm" color="info"><span className="lnr lnr-question-circle"></span></Button>
                    <Button size="sm" color="success"><span className="lnr lnr-plus-circle"></span></Button>
                    <div className="clearfix"></div>
                </div>
                <div className="group-input">
                    <EditTable
                        heads={this.headerTable()}
                        rows={this.rowTable()}
                        getCellActions={this.getCellActionDelete}
                    />
                </div>
            </form>
        );
    }
}

const mapStateToProps = () => {
    return {}
}

export default reduxForm({
    form: 'pricing_cod_action_form',
})(injectIntl(connect(mapStateToProps, null)(PricingCod)));
