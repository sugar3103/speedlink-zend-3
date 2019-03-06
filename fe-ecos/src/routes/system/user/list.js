import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
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
          <Col md={12}>
            <h3 className="page-title">{messages['user.list']}</h3>
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

