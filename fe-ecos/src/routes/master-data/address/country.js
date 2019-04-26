import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { List } from '../../../components/MasterData/Address/Country';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { getCountryList } from '../../../redux/actions';
import AccessDenied from '../../../containers/Layout/accessDenied';
import PageTitle from '../../../containers/Shared/PageTitle';

class Country extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPage: true
    }
  }

  componentDidMount() {
    this.props.getCountryList();
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
          <Col md={12}>
            <h3 className="page-title">{messages['address.countries']}
              {this.state.loadPage ? (<div className="lds-dual-ring" />) : ''}
            </h3>
            <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                  information
          </h3>
          </Col>
        </Row>
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


export default injectIntl(connect(
  mapStateToProps,
  {
    getCountryList    
  }
)(Country));

