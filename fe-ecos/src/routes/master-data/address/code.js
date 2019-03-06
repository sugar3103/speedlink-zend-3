import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import List from '../../../components/MasterData/Address/AddressCode';
import PageTitle from '../../../containers/Shared/PageTitle';
class Code extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container>
        <PageTitle title={messages['address.code']} />
        <Row>
          <Col md={12}>
            <h3 className="page-title">{messages['address.code']}</h3>
            <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                  information
            </h3>
          </Col>
        </Row>
        <Row>
          <List />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(Code);
