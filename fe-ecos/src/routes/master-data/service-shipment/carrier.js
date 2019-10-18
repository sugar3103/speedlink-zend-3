import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { List } from '../../../components/MasterData/ServiceShipment/Carrier';
import { connect } from "react-redux";
import AccessDenied from '../../../containers/Layout/accessDenied';
import PageTitle from '../../../containers/Shared/PageTitle';

class Carrier extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadPage: true
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.loadPage) {
      this.setState({ loadPage: prevProps.loading })
    }
  }
  render() {
    const { messages } = this.props.intl;
    const { errors } = this.props.carrier;
    return (
      <Container>
        <PageTitle title={messages['carrier.list-title']} />
        <Row>
          {!this.state.loadPage ? (
            (errors && errors === 'ACCESS_DENIED') ? (<AccessDenied />) : (<List />)
          ) : ''}
        </Row>
      </Container>
    )
  }
}
const mapStateToProps = ({ carrier }) => {
  return {
    carrier
  };
};


export default injectIntl(connect(mapStateToProps, null)(Carrier));
