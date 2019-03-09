import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import VisitorsSessions from './VisitorsSessions';

class Dashborad extends Component {
  render() {
    return (
      <Container className="dashboard">
        <Row>
          <Col md={12}>
            <h3 className="page-title">dashboard_default.page_title</h3>
          </Col>
        </Row>
        <Row>
          <VisitorsSessions />
        </Row>
      </Container>
    );
  }
}

export default Dashborad;
