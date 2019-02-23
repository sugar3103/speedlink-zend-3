import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { List } from '../../../components/System/User/Permission';
import { getPermissionList } from '../../../redux/actions';

class Permission extends Component {
  componentDidMount() {
    this.props.getPermissionList();
  }
  render() {
    const { messages } = this.props.intl;
    const { loading, error } = this.props.permission;

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{messages['permission.list']}
              { loading ? (<div className="lds-dual-ring" />) : '' }
            </h3>
            <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                  information
            </h3>
          </Col>
        </Row>
        <Row>
         {!loading ? (<List />) : '' }
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
