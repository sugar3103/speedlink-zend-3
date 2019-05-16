import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { List } from '../../../components/System/User/Permission';
import { getPermissionList } from '../../../redux/actions';
import AccessDenied from '../../../containers/Layout/accessDenied';
import PageTitle from '../../../containers/Shared/PageTitle';

class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPage : true
    }
  }

  componentDidMount() {
    this.props.getPermissionList();    
  }

  componentDidUpdate(prevProps, prevState) {
    
    if(this.state.loadPage) {
      this.setState({ loadPage : prevProps.loading})
    }
    
  }

  render() {
    const { messages } = this.props.intl;
    const { errors } = this.props.permission;
    
    return (
      <Container>
        <PageTitle title={messages['permission.list']}/>
        <Row>
         {!this.state.loadPage ? (
           (errors && errors === 'ACCESS_DENIED') ? (<AccessDenied />) : (<List />)
         ) : ''}
        </Row>
      </Container>
    )
  }
};

const mapStateToProps = ({ users }) => {
  const { permission } = users;
  return {
    permission,
  };
};


export default injectIntl(connect(
  mapStateToProps,
  {
    getPermissionList    
  }
)(Permission));
