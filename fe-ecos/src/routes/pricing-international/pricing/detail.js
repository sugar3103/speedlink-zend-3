import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Detail } from '../../../components/PricingInternational/Pricing';
import PageTitle from '../../../containers/Shared/PageTitle';

class PricingDetail extends Component {
  render() {
    const { messages } = this.props.intl;
    let title = messages['pri_int.add-new-pricing'];
    switch (this.props.type) {
      case 'add':
        title = messages['pri_int.add-new-pricing'];
        break;
      case 'edit':
        title = messages['pri_int.update-pricing'];
        break;
      case 'view':
        title = messages['pri_int.view-pricing'];
        break;
      default:
        break;
    }
    return (
      <Container>
        <PageTitle title={title} />
        <Row>
          <Detail type={this.props.type} />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(PricingDetail);
