import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import {List} from '../../../components/MasterData/NetworkPort/Hub';
import { connect } from "react-redux";
import { getHubList } from '../../../redux/actions';
import AccessDenied from '../../../containers/Layout/accessDenied';

class Hub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPage: true
    }
  }
  componentDidMount() {
    this.props.getHubList();
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.loadPage) {
      this.setState({ loadPage: prevProps.loading })
    }
  }

  render() {
    const { messages } = this.props.intl;
    const { errors } = this.props.hub;
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{messages['hub.list-title']}
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
};

const mapStateToProps = ({ hub }) => {  
  return {
    hub
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getHubList    
  }
)(Hub));
