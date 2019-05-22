import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, CardBody, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Action from './Action';
import PricingTable from './PricingTable';

class Detail extends Component {

  constructor() {
    super();
    this.state = {
      activeTab: 1,
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    const { type } = this.props;
    const { messages } = this.props.intl;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className="pri-dom">
            <div className="tabs tabs--vertical tabs--vertical-colored">
              <div className="tabs__wrap">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 1 })}
                      onClick={() => { this.toggle(1) }}
                    >{messages['pri_dom.master-data']}</NavLink>
                    { type !== "add" && <Fragment>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 2 })}
                        onClick={() => { this.toggle(2) }}
                      >{messages['pri_dom.detail']}</NavLink>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 3 })}
                        onClick={() => { this.toggle(3) }}
                      >{messages['pri_dom.vas']}</NavLink>
                    </Fragment> }
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId={1}><Action type={type} /></TabPane>
                  { type !== "add" && <Fragment>
                    <TabPane tabId={2}><PricingTable /></TabPane>
                    <TabPane tabId={3}>Vas</TabPane>
                  </Fragment> }
                </TabContent>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

Detail.propTypes = {
  type: PropTypes.string.isRequired,
}

export default withRouter(injectIntl(connect()(Detail)));