import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import {List} from '../../../components/MasterData/NetworkPort/Branch';
import { connect } from "react-redux";
import AccessDenied from '../../../containers/Layout/accessDenied';

class Branch extends Component {
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
    const { errors } = this.props.branch;
    return (
      <Container>
        <Row>
          {!this.state.loadPage ? (
            (errors && errors === 'ACCESS_DENIED') ? (<AccessDenied />) : (<List />)
          ) : ''}
        </Row>
      </Container>
    )
  }
};

const mapStateToProps = ({ branch }) => {  
  return {
    branch
  };
};

export default injectIntl(connect(mapStateToProps, null)(Branch));