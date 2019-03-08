import React, { Component,Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import createNotification from '../../util/notifications';
import { socketUrl } from '../../constants/defaultValues';
import { getVerifyAuth } from '../../redux/actions';


class SocketHandle extends Component {
    constructor() {
        super();
        this.socket = socketIOClient(socketUrl);
    }

    notifications() {        
        this.socket.on("notification-"+ this.props.authUser.user.id ,(notify) => {
            notify = JSON.parse(notify);            
            createNotification({
              type: notify.type, 
              message: notify.message, 
              title: notify.title
            });      
          })
    }

    updateUser() {
        this.socket.on('verify-'+ this.props.authUser.user.id, (reload) => {            
            if(reload) {
                this.props.getVerifyAuth();
            }
        })
    }
    render() {        
        if(this.props.authUser.user) {
            this.notifications();
            this.updateUser();
        }

        return (
            <Fragment></Fragment>

        )
    }
}

const mapStateToProps = ({authUser}) => {
    return { authUser }
  }

export default injectIntl(connect(mapStateToProps, {getVerifyAuth})(SocketHandle));
