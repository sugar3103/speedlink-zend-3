import React, { Component,Fragment } from 'react';
import { injectIntl } from 'react-intl';

import General from './general';
import Local from './local';
import Option from './option';
import Mail from './mail';
import Server from './server';
class Content extends Component {
    render() {
        const { target,setting } = this.props;
        return(
            <Fragment>
                { target === 'general' ? <General data={setting.items}/> : ''}
                { target === 'local' ? <Local data={setting.items}/> : ''}
                { target === 'option' ? <Option data={setting.items}/> : ''}
                { target === 'mail' ? <Mail data={setting.items}/> : ''}
                { target === 'server' ? <Server data={setting.items}/> : ''}
            </Fragment>        
        )
    }
}


export default injectIntl(Content);