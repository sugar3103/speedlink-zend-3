import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import ActionForm from './ActionForm';
import { addPricingSpecialItem, updatePricingSpecialItem } from '../../../redux/actions';


class Action extends Component {

  handleSubmit = values => {
    const { type } = this.props;
    if (type === 'add') {
      this.props.addPricingSpecialItem(values);
    }
    if (type === 'edit') {
      this.props.updatePricingSpecialItem(values);
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
  type: PropTypes.string.isRequired,
  addPricingSpecialItem: PropTypes.func.isRequired,
  updatePricingSpecialItem: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  addPricingSpecialItem,
  updatePricingSpecialItem
})(Action));