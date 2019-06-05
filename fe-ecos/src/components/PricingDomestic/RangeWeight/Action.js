import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import ActionForm from './ActionForm';
import PageTitle from '../../../containers/Shared/PageTitle';
import { addRangeWeightDomesticItem, updateRangeWeightDomesticItem } from '../../../redux/actions';
import { withRouter } from 'react-router-dom';

class Action extends Component {

  handleSubmit = values => {
    const { id } = this.props.match.params;
    
    if (id) {
      values = { ...values, id: id };
      this.props.updateRangeWeightDomesticItem(values);
    } else {
      this.props.addRangeWeightDomesticItem(values);
    }
  }

  render() {
    const { messages } = this.props.intl;
    let title = messages['pri_dom.add-range-weight-title'];
    switch (this.props.type) {
      case 'add':
        title = messages['pri_dom.add-range-weight-title'];
        break;
      case 'edit':
        title = messages['pri_dom.edit-range-weight-title'];
        break;
      case 'view':
        title = messages['pri_dom.view-range-weight-title'];
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
  addRangeWeightDomesticItem: PropTypes.func.isRequired,
  updateRangeWeightDomesticItem: PropTypes.func.isRequired,
}

export default withRouter(connect(null, {
  addRangeWeightDomesticItem,
  updateRangeWeightDomesticItem
})(injectIntl(Action)));