import React, { PureComponent } from 'react';
import { Col } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getRoleList } from '../../../../redux/actions';
// const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;
class Main extends PureComponent {

  componentDidMount() {
    this.props.getRoleList();
  }

  showRoleUser = (roles, user_roles) => {
    let result = [];
    roles.map(role => { //eslint-disable-line
      if (user_roles.includes(role.id)) {
        result.push(role.name);
      }
    });
    result = result.join(', ');
    return result;
  }

  render() {
    const { user } = this.props.authUser;
    const roles = this.props.role.items;

    return (
      <Col md={12} lg={12} xl={12}>
        <div className="profile__information">
          <div className="profile__avatar">
            {/* <img src={Ava} alt="avatar" /> */}
            <i className="icon-avatar" />
          </div>
          <div className="profile__data">
            <p className="profile__name">{(user.first_name || user.last_name) ? user.first_name +' '+ user.last_name : user.username }</p>
            <p className="profile__work">{roles && user.roles && this.showRoleUser(roles, user.roles)}</p>
            <p className="profile__contact">{ user.email }</p>
          </div>
        </div>
      </Col>
    )
  }
}

const mapStateToProps = ({ authUser, users }) => {
  const { role } = users;
  return { authUser, role }
}

export default injectIntl(connect(
  mapStateToProps,
  {
    getRoleList
  }
)(Main));
