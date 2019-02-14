import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import {List} from '../../../components/MasterData/NetworkPort/BranchArea';

class BranchArea extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{messages['brancharea.list-title']}</h3>
            <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                  information
            </h3>
          </Col>
        </Row>
        <Row>
          <List />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(BranchArea);
