import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { List } from '../../components/PricingDomestic/Zone';
import PageTitle from '../../containers/Shared/PageTitle';

class Zone extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container>
        <PageTitle title={messages['pri_dom.zone-title']} />
        <Row>
          <List />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(Zone);
