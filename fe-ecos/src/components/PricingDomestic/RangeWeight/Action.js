import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import ActionForm from './ActionForm';
import PageTitle from '../../../containers/Shared/PageTitle';
import { addRangeWeightDomesticItem, updateRangeWeightDomesticItem } from '../../../redux/actions';


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
    const { id } = this.props.match.params;
    
    const { messages } = this.props.intl;
    return (
      <Container>
        <PageTitle title={id ? messages['pri_dom.edit-range-weight-title'] : messages['pri_dom.add-range-weight-title']} />
        <Row>
        <Col md={12}>
          <h3 className="page-title">{id ? messages['pri_dom.edit-range-weight-title'] : messages['pri_dom.add-range-weight-title']}</h3>
        </Col>
      </Row>
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <CardBody>
                <ActionForm onSubmit={this.handleSubmit} />
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

export default injectIntl(connect(null, {
  addRangeWeightDomesticItem,
  updateRangeWeightDomesticItem
})(Action));