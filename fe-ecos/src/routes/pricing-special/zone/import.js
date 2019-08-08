import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Import } from '../../../components/PricingSpecial/Zone';
import PageTitle from '../../../containers/Shared/PageTitle';

class ZoneImport extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container>
        <PageTitle title={messages['pri_special.zone-import-title']} />
        <Row>
          <Import />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(ZoneImport);
