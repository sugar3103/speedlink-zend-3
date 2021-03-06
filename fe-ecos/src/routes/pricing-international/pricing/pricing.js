import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { List } from '../../../components/PricingInternational/Pricing';
import PageTitle from '../../../containers/Shared/PageTitle';

class PricingIndex extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container>
        <PageTitle title={messages['pri_int.pricing-title']} />
        <Row>
          <List />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(PricingIndex);
