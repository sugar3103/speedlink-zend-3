import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import ActionForm from './ActionForm';
import { addPricingDomesticItem, updatePricingDomesticItem } from '../../../redux/actions';


class Action extends Component {

  handleSubmit = values => {
    const { type } = this.props;
    if (type === 'add') {
      this.props.addPricingDomesticItem(values);
    }
    if (type === 'edit') {
      this.props.updatePricingDomesticItem(values);
    }
  }

  render() {
    const { type } = this.props;
    return (
      <Container>
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <CardBody>
                <ActionForm onSubmit={this.handleSubmit} type={type}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

Action.propTypes = {
  addPricingDomesticItem: PropTypes.func.isRequired,
  updatePricingDomesticItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  addPricingDomesticItem,
  updatePricingDomesticItem
})(Action));