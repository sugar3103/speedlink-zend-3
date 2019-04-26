import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import Dashboard from '../../components/Dashboard';
import PageTitle from '../../containers/Shared/PageTitle';

class DashboardPage extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container className="dashboard">
      <PageTitle title={messages['dashboard.title']} />
        <Row>
          <Col md={12}>
            <h3 className="page-title">{messages['dashboard.title']}</h3>
          </Col>
        </Row>
        <Row>
          <Dashboard />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(DashboardPage);
