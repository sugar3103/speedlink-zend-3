import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Col, Card, CardBody } from 'reactstrap';
import ImportForm from './ImportForm';
import PropTypes from 'prop-types';
import { uploadRequest } from '../../../redux/actions';


class Import extends Component {

    handleSubmit = values => {
        if (values) {
            this.props.uploadRequest(values);
        }
    }

    render() {
        return (
            <Col md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="upload-card">
                            <ImportForm onSubmit={this.handleSubmit} />
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}


Import.propTypes = {
    uploadRequest: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
    uploadRequest
})(Import));