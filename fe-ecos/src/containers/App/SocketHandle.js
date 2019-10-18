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
        this.state = {
            channel: ''
        }
    }

    componentDidMount() {
        this.setState({ channel: 'private-' + this.props.user })
        //Register Channel By User Current    
        this.socket.emit('subscribe', {
            'channel': 'private-' + this.props.user
        });

        this.socket.on('reconnecting', (number) => {
            if(number === 1) { this.socket.disconnect() }
        });  
        this.notifications();
        this.updateUser();
    }
    componentWillUnmount() {
        //Unregister Channel
        this.socket.emit('unsubscribe', {
            'channel': this.state.channel
        });
    }

    eventFormater(event) {
        return 'client-' + event;
    }

    listener(event, callback) {
        this.socket.on(this.eventFormater(event), (channel, data) => {
            if (this.state.channel === channel) {
                callback(data);
            }
        })
    }
    updateUser() {
        this.socket.on('verify-' + this.props.user, (reload) => {
            if (reload) {
                this.props.getVerifyAuth();
            }
        })
    }


    notifications() {

        this.listener('notification', function (data) {
            createNotification({
                type: data.type,
                message: data.message,
                title: data.title
            });
        });


    }

    render() {
        return (
            <Fragment></Fragment>

        )
    }
}


export default injectIntl(connect(null, { getVerifyAuth })(SocketHandle));
