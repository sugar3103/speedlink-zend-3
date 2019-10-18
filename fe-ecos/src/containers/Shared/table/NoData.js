import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

class NoData extends Component {
    render() {
        const { messages } = this.props.intl;
        return (
            !this.props.loading && this.props.show ?
            <div className="text-center no-result">
                {messages['no-result']}
            </div>
            : null
        );
    }
}

export default injectIntl(NoData);
