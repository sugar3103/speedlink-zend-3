/*eslint no-mixed-operators: "error"*/
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class RenderCan extends PureComponent {
    render() {
        const { user, action, permission } = this.props;
        if (user.permissions && user.permissions) {            
            if (user.is_admin) {
                return (
                    <Fragment>
                        { this.props.children }
                    </Fragment>
                )
            } else {
                return (
                    <Fragment>
                        {(user.permissions[permission].indexOf('manage') > -1) || (user.permissions[permission].indexOf(action) > -1) ?  this.props.children: ''}
                    </Fragment>
                )
            }

        } else {
            return (<Fragment></Fragment>)
        }
    }
}

const Can = props => (
    <RenderCan
        {...props}
        user={props.user}
        permission={props.permission}
        action={props.action}
        children={props.children}
    />
);


Can.propTypes = {
    user: PropTypes.any.isRequired,
    permission: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
}

export default Can;