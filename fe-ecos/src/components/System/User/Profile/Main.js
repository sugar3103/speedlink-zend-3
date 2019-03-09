import React, { PureComponent } from 'react';
import { Col } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { getRoleList, uploadAvatarUser } from '../../../../redux/actions';
// const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;
class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.fileUpload = React.createRef();
    this.showFileUpload = this.showFileUpload.bind(this);
    this.state = {
      avatar: ''
    }
  }
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

  showFileUpload() {
    this.fileUpload.current.click();
  }

  uploadFile = (event) => {
    
    const data = new FormData();
    data.append('avatar', event.target.files[0]);
    // Object.keys(this.props.authUser.user).map((value) => {
      
    //   const _value = typeof(this.props.authUser.user[value]) === 'object' ? JSON.stringify(this.props.authUser.user[value]) : this.props.authUser.user[value];
    //   data.append(value, _value);
    // })
    
    this.props.uploadAvatarUser(data, this.props.intl.messages);

    var reader = new FileReader();
    reader.readAsText(event.target.files[0]);

    this.setState({
      avatar: URL.createObjectURL(event.target.files[0])
    })
  }

  render() {
    const { user } = this.props.authUser;
    const roles = this.props.role.items;

    return (
      <Col md={12} lg={12} xl={12}>
        <div className="profile__information">
          <div className="profile__avatar" onClick={this.showFileUpload}>
            {this.state.avatar ? <img src={this.state.avatar} alt="avatar" /> : <i className="icon-avatar" />}
            <input type="file" accept="image/jpeg, image/png" className="d-none" ref={this.fileUpload} onChange={this.uploadFile} />
          </div>
          <div className="profile__data">
            <p className="profile__name">{(user.first_name || user.last_name) ? user.first_name + ' ' + user.last_name : user.username}</p>
            <p className="profile__work">{roles && user.roles && this.showRoleUser(roles, user.roles)}</p>
            <p className="profile__contact">{user.email}</p>
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
    getRoleList,
    uploadAvatarUser
  }
)(Main));
