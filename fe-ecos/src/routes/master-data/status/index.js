import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { List } from '../../../components/MasterData/Status';
import { injectIntl } from 'react-intl';

const Status = (props) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">{props.intl.messages['status.list-title']}</h3>
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

export default injectIntl(Status);
