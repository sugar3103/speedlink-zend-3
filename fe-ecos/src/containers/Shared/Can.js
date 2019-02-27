/*eslint no-mixed-operators: "error"*/
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class RenderCan extends PureComponent {
    IsAdmin() {
        const { user } = this.props;
        return (user.is_admin) ? true : false;
    }

    hasOwnPermission(permission) {        
        let isOwn = false;
        if(permission) {
            let own = permission.split('.');
            isOwn = (this.props.own && own.indexOf('own') > -1 && this.props.user.username === this.props.own) ? true : false            
        }        
        return isOwn;
    }

    hasAnyPermission(permission) {        
        let isAny = false;
        if(permission) {
            let own = permission.split('.');
            isAny = (own.indexOf('any') > -1) ? true : false            
        }        
        return isAny;
    }

    isManager(permission) {
        let isManager = false;
        if(permission) {
            let manage = permission.split('.');
            isManager = manage.indexOf('manage') > -1 ? true : false            
        }
        return isManager;
    }

    isShowAction() {
        const permission = this.props.user.permissions;
        let isShow = false;

        if(permission){
            permission[this.props.permission].forEach(element => {                
                isShow = this.hasOwnPermission(element) ? true : (permission[this.props.permission].indexOf(this.props.action) > -1) ? true : 
                    this.hasAnyPermission(element) ? true : this.isManager(element) ? true : false;
            });
        }
        return this.IsAdmin() ? this.IsAdmin() : isShow;
    }

    render() {
        
        return (
            <Fragment>
                { this.isShowAction() && this.props.children }
            </Fragment>
        )
    }
}

const Can = props => (
    <RenderCan
        {...props}
        user={props.user}
        permission={props.permission}
        action={props.action}
        children={props.children}
        own={props.own}
    />
);


Can.propTypes = {
    user: PropTypes.any.isRequired,
    permission: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    own: PropTypes.string
}

export default Can;