import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';

class ZoneCode extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">Pricing Management</h3>
            <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                  information
            </h3>
          </Col>
        </Row>
      </Container>
    )
  }
};

export default injectIntl(ZoneCode);
