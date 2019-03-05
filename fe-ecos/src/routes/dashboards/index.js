import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import Dashboard from '../../components/Dashboard';

class DashboardPage extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container className="dashboard">
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
