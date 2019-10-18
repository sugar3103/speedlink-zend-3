import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import Dashboard from '../../components/Dashboard';
import PageTitle from '../../containers/Shared/PageTitle';

class DashboardPage extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container>
        <PageTitle title={messages['dashboard.title']} />
        <Row>
          <Dashboard />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(DashboardPage);
