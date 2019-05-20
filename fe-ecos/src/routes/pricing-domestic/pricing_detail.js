import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import PageTitle from '../../containers/Shared/PageTitle';
import { Detail } from '../../components/PricingDomestic/Pricing';
import { requestUpdatePricingDomesticItem } from '../../redux/actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PricingDetail extends Component {

  componentWillMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.requestUpdatePricingDomesticItem({ query: { id: this.props.match.params.id }})
    }
  }
  

  render() {
    const { itemEditting } = this.props;
    const { messages } = this.props.intl;
    let title = messages['pri_dom.add-new-pricing'];
    switch (this.props.type) {
      case 'add':
        title = messages['pri_dom.add-new-pricing'];
        break;
      case 'edit':
        title = messages['pri_dom.update-pricing'];
        break;
      case 'view':
        title = messages['pri_dom.view-pricing'];
        break;
      default:
        break;
    }
    return (
      <Container>
        <PageTitle title={title} />
        {itemEditting && 
          <Row>
            <Col md={12}>
              <h3 className="page-title">{itemEditting.name}</h3>
            </Col>
          </Row>
        }
        <Row>
          <Detail type={this.props.type} />
        </Row>
      </Container>
    )
  }
};

PricingDetail.propTypes = {
  requestUpdatePricingDomesticItem: PropTypes.func.isRequired,
}

const mapStateToProps = ({ pricingDomestic }) => {
  const { pricing } = pricingDomestic;
  const { itemEditting } = pricing;
  return {
    itemEditting
  }
}

export default connect(mapStateToProps, {
  requestUpdatePricingDomesticItem,
})(withRouter(injectIntl(PricingDetail)));