import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { List } from '../../../components/MasterData/Address/Country';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import AccessDenied from '../../../containers/Layout/accessDenied';
import PageTitle from '../../../containers/Shared/PageTitle';

class Country extends Component {
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
    const { errors } = this.props.country;
    return (      
      <Container>
        <PageTitle title={messages['address.countries']} />
        <Row>
          {!this.state.loadPage ? (
            (errors && errors === 'ACCESS_DENIED') ? (<AccessDenied />) : (<List />)
          ) : ''}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = ({ address }) => { 
  const { country } = address 
  return {
    country
  };
};

export default injectIntl(connect(mapStateToProps, null)(Country));

