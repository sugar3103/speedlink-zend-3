import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';

class ShipmentType extends Component {
  render() {
    const {messages} = this.props.intl;
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{messages['cs.shipment_type']}</h3>
            <h3 className="page-subhead subhead"/>
          </Col>
        </Row>
        <Row>
        </Row>
      </Container>
    )
  }
}

export default injectIntl(ShipmentType);