import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { List } from '../../../components/PricingInternational/Pricing';

class PricingIndex extends Component {
  render() {
    return (
      <Container>
        <Row>
          <List />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(PricingIndex);
