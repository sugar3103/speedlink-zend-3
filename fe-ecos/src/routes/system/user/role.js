import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { List } from '../../../components/System/User/Role';
import { getRoleList } from '../../../redux/actions';
import AccessDenied from '../../../containers/Layout/accessDenied';
import PageTitle from '../../../containers/Shared/PageTitle';

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPage : true
    }
  }

  componentDidMount() {
    this.props.getRoleList();    
  }

  componentDidUpdate(prevProps, prevState) {
    
    if(this.state.loadPage) {
      this.setState({ loadPage : prevProps.loading})
    }    
  }

  render() {
    const { messages } = this.props.intl;
    const { errors } = this.props.role;
    return (
      <Container>
        <PageTitle title={messages['role.list']}/>
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
  const { role } = users;
  return {
    role,
  };
};


export default injectIntl(connect(
  mapStateToProps,
  {
    getRoleList    
  }
)(Role));
