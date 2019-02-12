import React, { Component,Fragment } from 'react';
import { injectIntl } from 'react-intl';

import General from './general';
import Local from './local';
import Option from './option';
import Mail from './mail';
import Server from './server';
class Content extends Component {
    render() {
        const { target } = this.props;
        return(
            <Fragment>
                { target === 'general' ? <General /> : ''}
                { target === 'local' ? <Local /> : ''}
                { target === 'option' ? <Option /> : ''}
                { target === 'mail' ? <Mail /> : ''}
                { target === 'server' ? <Server /> : ''}
            </Fragment>        
        )
    }
}


export default injectIntl(Content);