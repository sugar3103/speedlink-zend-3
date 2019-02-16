import React, { PureComponent } from 'react';
import { Card, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
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
    const { messages } = this.props.intl;
    if (!Array.isArray(values.roles)) {
      values.roles = values.roles.split(',');
    };
    
    this.props.updateUserItem(values, messages);
  }
  render() {
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
                  <Setting onSubmit={this.handleSubmit} />
                </TabPane>
              </TabContent>
            </div>
          </div>
        </Card>
      </Col>
    )
  }
}

export default injectIntl(connect(null, {
  updateUserItem
})(Tabs));