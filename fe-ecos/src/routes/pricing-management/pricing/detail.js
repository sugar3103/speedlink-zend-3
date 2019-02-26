import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Detail } from '../../../components/PricingManagement/Pricing';

class PricingDetail extends Component {
  render() {
    const { messages } = this.props.intl;
    let title = messages['pricing.add-new'];
    switch (this.props.type) {
      case 'add':
        title = messages['pricing.add-new'];
        break;
      case 'edit':
        title = messages['pricing.edit'];
        break;
      case 'view':
        title = messages['pricing.view'];
        break;
      default:
        break;
    }
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{title}</h3>
          </Col>
        </Row>
        <Row>
          <Detail type={this.props.type} />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(PricingDetail);
