/*eslint no-mixed-operators: "error"*/
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class RenderCan extends PureComponent {
    checkIsAdmin() {
        const { user } = this.props;

        return (user.is_admin) ? true : false;
    }


    render() {
        const { user, action, permission } = this.props;
        return (
            <Fragment></Fragment>
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
    />
);


Can.propTypes = {
    user: PropTypes.any.isRequired,
    permission: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired
}

export default Can;