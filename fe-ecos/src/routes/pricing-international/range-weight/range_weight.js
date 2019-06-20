import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { List } from '../../../components/PricingInternational/RangeWeight';
import PageTitle from '../../../containers/Shared/PageTitle';

class RangeWeightIndex extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container>
        <PageTitle title={messages['pri_int.range-weight-title']} />
        <Row>
          <List />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(RangeWeightIndex);
