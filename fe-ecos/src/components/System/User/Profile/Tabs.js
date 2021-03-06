import React, { PureComponent } from 'react';
import { Card, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Activities from './Activities';
import Setting from './Setting';
import { updateUserItem } from '../../../../redux/actions';

class Tabs extends PureComponent {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  handleSubmit = values => {
    if (!Array.isArray(values.roles)) {
      values.roles = values.roles.split(',');
    };
    
    this.props.updateUserItem(values);
  }
  render() {
    const { user } = this.props.authUser;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <div className="profile__card tabs tabs--bordered-bottom">
            <div className="tabs__wrap">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => {
                      this.toggle('1');
                    }}
                  >
                    Activity
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => {
                      this.toggle('2');
                    }}
                  >
                    Settings
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Activities />
                </TabPane>

                <TabPane tabId="2">
                  {user &&
                    <Setting onSubmit={this.handleSubmit} user={user} />
                  }
                </TabPane>
              </TabContent>
            </div>
          </div>
        </Card>
      </Col>
    )
  }
}
const mapStateToProps = ({ authUser}) => {
  return { authUser}
}

export default connect(mapStateToProps, {
  updateUserItem
})(Tabs);