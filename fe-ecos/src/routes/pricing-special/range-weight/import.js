import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Import } from '../../../components/PricingSpecial/RangeWeight';
import PageTitle from '../../../containers/Shared/PageTitle';

class RangeWeightImport extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container>
        <PageTitle title={messages['pri_special.range-weight-import-title']} />
        <Row>
          <Import />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(RangeWeightImport);
