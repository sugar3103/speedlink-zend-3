import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
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
    const { errors } = this.props.hub;
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
