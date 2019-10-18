import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getUserList } from '../../../redux/actions';
import { List } from '../../../components/System/User';
import AccessDenied from '../../../containers/Layout/accessDenied';
import PageTitle from '../../../containers/Shared/PageTitle';
class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPage : true
    }
  }

  componentDidMount() {
    this.props.getUserList();    
  }

  componentDidUpdate(prevProps, prevState) {
    
    if(this.state.loadPage) {
      this.setState({ loadPage : prevProps.loading})
    } 
  }
  render() {
    const { messages } = this.props.intl;
    const { errors } = this.props.user;
    return (
      <Container>
        <PageTitle title={messages['user.list']} />
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
  const { user } = users;
  return {
    user
  };
};


export default injectIntl(connect(
  mapStateToProps,
  {
    getUserList
  }
)(Lists));

