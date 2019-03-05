import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PriceVasItem from './PriceVasItem';
import { uuidv4 } from '../../../util/uuidv4';

class PricingVas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ids: []
        }
    }

    componentDidMount() {
        this.setState({
            ids: [uuidv4()]
        });
    }


    onAddItem = (e) => {
        e.preventDefault();
        let { ids } = this.state;
        ids.push(uuidv4());
        this.setState({
            ids
        });
    }

    showItem = (ids) => {
        let result = ids.map((id, index) => (<PriceVasItem id={id} index={index + 1} key={index} />))
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
                {this.showItem(this.state.ids)}
                <Button size="sm" color="primary" className="btn-grid">{messages['save']}</Button>
            </form>
        );
    }
}

const mapStateToProps = () => {
    return {}
}

export default (injectIntl(connect(mapStateToProps, null)(PricingVas)));
