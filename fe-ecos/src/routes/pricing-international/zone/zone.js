import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { List } from '../../../components/PricingInternational/Zone';
import PageTitle from '../../../containers/Shared/PageTitle';

class ZoneIndex extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container>
        <PageTitle title={messages['pri_int.zone-title']} />
        <Row>
          <List />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(ZoneIndex);
