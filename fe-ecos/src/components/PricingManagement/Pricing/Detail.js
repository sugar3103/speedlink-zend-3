import React, { Component } from 'react';
import Action from './Action';
import { Card, CardBody, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

class Detail extends Component {

    constructor() {
        super();
        this.state = {
            activeTab: '1',
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
        return (
            <Col md={12} lg={12}>
                <Card>
                    <CardBody className="master-data-list">
                        <div className="tabs tabs--vertical tabs--vertical-colored">
                            <div className="tabs__wrap">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => {
                                                this.toggle('1');
                                            }}
                                        >
                                            Master Data
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => {
                                                this.toggle('2');
                                            }}
                                        >
                                            Statistic
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Action type={this.props.type} />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Action type={this.props.type} />
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>

                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default Detail;