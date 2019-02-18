import React, { Component } from 'react';
import { ButtonToolbar,Button } from 'reactstrap';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import Content from './content';
import PropTypes from 'prop-types';

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

class SettingForm extends Component {

    constructor() {
        super();
        this.state = {
            activeTab: '1',
        };
    }

    componentDidMount() {
        
        if(Object.keys(this.props.settings).length > 0) {
            this.props.initialize(this.props.settings)
        }
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
                            <Content target={tab.title} setting={this.props.settings}/>
                        </TabPane>
                    )
                })}
            </TabContent>
        )
    }

    render() {
        const { messages } = this.props.intl;
        const { handleSubmit } = this.props;         
        
        return (
            <form className="form form--horizontal" onSubmit={handleSubmit}>
                <div className="tabs tabs--bordered-bottom">
                    <div className="tabs__wrap">
                        {this.navTabs(messages)}
                        {this.navTabContents()}
                    </div>
                </div>
                <ButtonToolbar className="form__button-toolbar">
                    <Button color="primary" size="sm" outline type="submit">{messages['save']}</Button>
                </ButtonToolbar>
            </form>
        );
    }
}

SettingForm.propTypes = {    
    setting: PropTypes.object,
}

export default reduxForm({
    form: 'setting_action_form'
})(injectIntl(SettingForm));