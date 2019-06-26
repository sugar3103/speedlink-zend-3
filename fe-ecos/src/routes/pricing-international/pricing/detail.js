import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Detail } from '../../../components/PricingInternational/Pricing';
import { requestUpdatePricingInternationalItem } from '../../../redux/actions';
import PageTitle from '../../../containers/Shared/PageTitle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PricingDetail extends Component {

  componentWillMount() {
    if (this.props.match.params && this.props.match.params.id) {
      this.props.requestUpdatePricingInternationalItem({ query: { id: this.props.match.params.id }})
    }
  }

  render() {
    const { itemEditting } = this.props;
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
        {itemEditting && this.props.type !== 'add' &&
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
  requestUpdatePricingInternationalItem: PropTypes.func.isRequired,
}

const mapStateToProps = ({ pricingInternational }) => {
  const { pricing } = pricingInternational;
  const { itemEditting } = pricing;
  return {
    itemEditting
  }
}

export default connect(mapStateToProps, {
  requestUpdatePricingInternationalItem,
})(withRouter(injectIntl(PricingDetail)));
