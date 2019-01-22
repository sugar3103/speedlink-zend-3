import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { List } from '../../../components/MasterData/Status';

const Status = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Products List</h3>
        <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
              information
        </h3>
      </Col>
    </Row>
    <Row>
      <List />
    </Row>
  </Container>
);

export default Status;
