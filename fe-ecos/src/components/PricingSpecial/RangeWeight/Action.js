import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import ActionForm from './ActionForm';
import PageTitle from '../../../containers/Shared/PageTitle';
import { addRangeWeightSpecialItem, updateRangeWeightSpecialItem } from '../../../redux/actions';
import { withRouter } from 'react-router-dom';

class Action extends Component {

  handleSubmit = values => {
    const { id } = this.props.match.params;
    
    if (id) {
      values = { ...values, id: id };
      this.props.updateRangeWeightSpecialItem(values);
    } else {
      this.props.addRangeWeightSpecialItem(values);
    }
  }

  render() {
    const { messages } = this.props.intl;
    let title = messages['pri_special.add-range-weight-title'];
    switch (this.props.type) {
      case 'add':
        title = messages['pri_special.add-range-weight-title'];
        break;
      case 'edit':
        title = messages['pri_special.edit-range-weight-title'];
        break;
      case 'view':
        title = messages['pri_special.view-range-weight-title'];
        break;
      default:
        break;
    }
    return (
      <Container>
        <PageTitle title={title} />
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <CardBody>
                <ActionForm onSubmit={this.handleSubmit} type_action={this.props.type} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

Action.propTypes = {
  addRangeWeightSpecialItem: PropTypes.func.isRequired,
  updateRangeWeightSpecialItem: PropTypes.func.isRequired,
}

export default withRouter(connect(null, {
  addRangeWeightSpecialItem,
  updateRangeWeightSpecialItem
})(injectIntl(Action)));