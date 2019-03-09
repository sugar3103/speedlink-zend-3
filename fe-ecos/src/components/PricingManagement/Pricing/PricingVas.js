import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PriceVasItem from './PriceVasItem';
import { uuidv4 } from '../../../util/uuidv4';
import { reduxForm } from 'redux-form';

const dataTest = [{
    "id": 1,
    "pricing_data_id": 1,
    "name": "Test",
    "formula": "$1 * 10%",
    "min": "50.00",
    "type": 0,
    "is_delete": 0,
    "spec": []
},
{
    "id": 2,
    "pricing_data_id": 1,
    "name": "Range",
    "formula": "$1 + 10000",
    "min": null,
    "type": 1,
    "is_delete": 0,
    "spec": [
        {
            "id": 1,
            "pricing_data_id": 1,
            "from": "0.00",
            "to": "5.00",
            "value": "2.00"
        }
    ]
}
];

class PricingVas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: dataTest
        }
    }

    componentDidMount() {
        let data = dataTest.map(item => {
            return {
                ...item,
                index: uuidv4()
            }
        });
        this.setState({ data }, () => {
            data.forEach(item => {
                this.props.change(`${item.index}_type`, item.type);
                this.props.change(`${item.index}_name`, item.name);
                this.props.change(`${item.index}_formula`, item.formula);
                this.props.change(`${item.index}_min`, item.min);
            })
        });   
    }


    onAddItem = (e) => {
        e.preventDefault();
        let { data } = this.state;
        data.push({
            index: uuidv4(),
            id: 0,
            pricing_data_id: this.props.pricing_data_id,
            name: "",
            formula: "",
            min: "",
            type: 0,
            is_delete: 0,
            spec: []
        });
        this.setState({ data },() => {
            data.forEach(item => {
                this.props.change(`${item.index}_type`, item.type);
            })
        });
    }

    showItem = (data) => {
        let result = data.map((item, index) => (<PriceVasItem item={item} key={index} />))
        return result;
    }

    render() {
        const { messages } = this.props.intl;

        return (
            <form className="form form_custom pricing-vas">
                <div className="group-action">
                    <Button size="sm" color="info"><span className="lnr lnr-question-circle"></span></Button>
                    <Button size="sm" color="success" onClick={(e) => this.onAddItem(e)}><span className="lnr lnr-plus-circle"></span></Button>
                    <div className="clearfix"></div>
                </div>
                {this.showItem(this.state.data)}
                <Button size="sm" color="primary" className="btn-grid">{messages['save']}</Button>
            </form>
        );
    }
}

const mapStateToProps = () => {
    return {}
}

export default reduxForm({
    form: 'pricing_vas_action_form',
  })(injectIntl(connect(mapStateToProps, null)(PricingVas)));
