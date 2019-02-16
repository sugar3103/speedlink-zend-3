import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { List } from '../../../components/MasterData/ServiceShipment/Service';

class Service extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container className={'panel__body'}>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{messages['cs.service']}</h3>
            {/* <h3 className="page-subhead subhead"/> */}
          </Col>
        </Row>
        <Row>
          <List />
        </Row>
      </Container>
    )
  }
}

export default injectIntl(Service);
