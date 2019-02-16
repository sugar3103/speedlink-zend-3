import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

class Main extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  componentDidMount = () => {
    this.setState({
      user: this.props.authUser.user
    })
  }

  render() {
    const { user } = this.props.authUser;
    
    return (
      <Col md={12} lg={12} xl={12}>
        <h3 className="page-title">{(user.first_name || user.last_name) ? user.first_name +' '+ user.last_name : user.username }</h3>
        <h3 className="page-subhead subhead">{user.roles}</h3>
      </Col>
    )
  }
}

const mapStateToProps = ({ authUser }) => {
  return { authUser }
}

export default injectIntl(connect(
  mapStateToProps,
  null
)(Main));
