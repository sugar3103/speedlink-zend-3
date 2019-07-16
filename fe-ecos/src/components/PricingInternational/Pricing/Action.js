import React, { Component } from 'react';
import ActionForm from './ActionForm';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { addPricingInternationalItem, updatePricingInternationalItem } from '../../../redux/actions';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

class Action extends Component {

    handleSubmit = values => {
        const { type } = this.props;
        if (type === 'add') {
            this.props.addPricingInternationalItem(values);
        }
        if (type === 'edit') {
            this.props.updatePricingInternationalItem(values);
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={12} lg={12}>
                        <Card>
                            <CardBody>
                                <ActionForm onSubmit={this.handleSubmit} type={this.props.type} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Action.propTypes = {
    type: PropTypes.string.isRequired,
    addPricingInternationalItem: PropTypes.func.isRequired,
    updatePricingInternationalItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
    addPricingInternationalItem,
    updatePricingInternationalItem
})(Action));