import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import createNotification from '../../util/notifications';
import { socketUrl } from '../../constants/defaultValues';
import { getVerifyAuth } from '../../redux/actions';

class SocketHandle extends Component {
    constructor() {
        super();
        this.socket = socketIOClient(socketUrl);
    }

    componentDidMount() {      
        this.socket.emit('subscribe',{
            'channel': 'private-user'
        });

        this.socket.on('reconnecting', (number) => {
            if(number === 10) { this.socket.disconnect() }
        });  
        this.notifications();
        this.updateUser();
    }

    updateUser() {
        this.socket.on('verify-' + this.props.user, (reload) => {
            if (reload) {
                this.props.getVerifyAuth();
            }
        })
    }
    
    notifications() {
        this.socket.on("notification-"+ this.props.user, (notify) => {         
            notify = JSON.parse(notify);
            createNotification({
                type: notify.type,
                message: notify.message,
                title: notify.title
            });
        })
    }

    render() {
        return (
            <Fragment></Fragment>

        )
    }
}


export default injectIntl(connect(null, { getVerifyAuth })(SocketHandle));
