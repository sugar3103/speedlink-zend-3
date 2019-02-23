import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Col, Container, Row } from 'reactstrap';

class AccessDenied extends Component{
    render() {
        const { messages } = this.props.intl;
        return (
            <Col md={12}><div className="access_denied">
                <h1>{messages['ACCESS_DENIED']}</h1>
            </div></Col>
        )
    }
}

export default injectIntl(AccessDenied)