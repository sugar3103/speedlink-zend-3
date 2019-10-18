import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { List } from '../../../components/MasterData/Customer';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import AccessDenied from '../../../containers/Layout/accessDenied';
import PageTitle from '../../../containers/Shared/PageTitle';
class Customer extends Component {
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
    const { errors } = this.props.customer;
    return (
      <Container>
        <PageTitle title={messages['customer.list-title']} />
        <Row>
          {!this.state.loadPage ? (
            (errors && errors === 'ACCESS_DENIED') ? (<AccessDenied />) : (<List />)
          ) : ''}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = ({ customer }) => {  
  return {
    customer
  };
};


export default injectIntl(connect(mapStateToProps, null)(Customer));

