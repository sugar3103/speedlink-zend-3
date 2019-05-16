import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import List from '../../../components/MasterData/Address/AddressCode';
import PageTitle from '../../../containers/Shared/PageTitle';
class Code extends Component {
  render() {
    const { messages } = this.props.intl;
    return (
      <Container>
        <PageTitle title={messages['address.code']} />
        <Row>
          <List />
        </Row>
      </Container>
    )
  }
};

export default injectIntl(Code);
