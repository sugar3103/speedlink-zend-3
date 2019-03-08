import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Main,Tabs } from '../../../components/System/User/Profile';
import PageTitle from '../../../containers/Shared/PageTitle';

class Edit extends Component {
  render() {
    return (
      <Container>
        <PageTitle title="Profile" />
        <Col md={12} lg={12} xl={12}>
          <Row>
            <Main />
          </Row>
        </Col>
        <Tabs />
      </Container>
    )
  }
};

export default injectIntl(Edit);
