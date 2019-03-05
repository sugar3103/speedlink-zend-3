import React, { Component } from 'react';
import ActionForm from './ActionForm';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { addPricingMasterDataItem } from '../../../redux/actions';

class Action extends Component {

    handleSubmit = values => {
        const { messages } = this.props.intl;
        this.props.addPricingMasterDataItem(values, messages);
    }

    render() {
        return (
            <ActionForm onSubmit={this.handleSubmit} type={this.props.type} />
        );
    }
}

export default injectIntl(connect(null, {
    addPricingMasterDataItem,
  })(Action));