import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, ButtonToolbar,Button, Col, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Content from './content';
import { reduxForm } from 'redux-form';


const Tabs = [
    {
        id: '1',
        title: 'general'
    },
    {
        id: '2',
        title: 'local'
    },
    {
        id: '3',
        title: 'option'
    },
    {
        id: '4',
        title: 'mail'
    },
    {
        id: '5',
        title: 'server'
    }

]
class Page extends Component {
    
    constructor() {
        super();
        this.state = {
            activeTab: '1',
        };
    }
    componentDidMount(){
        console.log(this.props);
    }
   
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }
    navTabs(messages) {
        var that = this;
        return (
            <Nav tabs>
                {Tabs.map((tab, index) => {
                    return (
                        <NavItem key={index}>
                            <NavLink
                                className={classnames({ active: that.state.activeTab === tab.id })}
                                onClick={() => {
                                    that.toggle(tab.id);
                                }}
                            >
                                {messages[tab.title]}
                            </NavLink>
                        </NavItem>
                    )
                })}
            </Nav>
        )
    }

    navTabContents() {
        return (
            <TabContent activeTab={this.state.activeTab}>
                {Tabs.map((tab, index) => {
                    return (
                        <TabPane tabId={tab.id} key={index}>
                            <Content target={tab.title} setting={this.props.setting} />
                        </TabPane>
                    )
                })}
            </TabContent>
        )
    }

    render() {
        const { messages } = this.props.intl;
        const { handleSubmit,setting } = this.props;        
        
        return (
            <Col md={12} lg={12} xl={12}>
                <Card id="setting">
                    <CardBody> 
                        <form className="form form--horizontal" onSubmit={handleSubmit}>
                            <div className="tabs tabs--bordered-bottom">
                                <div className="tabs__wrap">
                                    {this.navTabs(messages)}
                                    {/* {this.navTabContents()} */}
                                </div>
                            </div>
                            <ButtonToolbar className="form__button-toolbar">
                                <Button color="primary" size="sm" outline type="submit">{messages['save']}</Button>                                
                            </ButtonToolbar>
                        </form>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

Page.propTypes = {
    setting: PropTypes.object.isRequired,
    // getSetting: PropTypes.func.isRequired
}

const mapStateToProps = ({ setting }) => {
    return { setting };
};

export default reduxForm({
    form: 'setting_action_form'
})(injectIntl(connect(mapStateToProps)(Page)));