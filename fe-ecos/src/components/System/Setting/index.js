import React, { Component } from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import SettingForm from './SettingForm';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { getSetting, updateSetting } from '../../../redux/actions';
import PropTypes from 'prop-types';

class Page extends Component {

    handleSubmit = values => {
        const { messages } = this.props.intl;        
        this.props.updateSetting({'config':values}, messages);          
        
    }

    render() {
        const { setting } = this.props;
        return (
            <Col md={12} lg={12} xl={12}>
                <Card id="setting">
                    <CardBody> 
                        {setting && setting.items &&
                            <SettingForm onSubmit={this.handleSubmit} settings={setting.items}/>
                        }
                    </CardBody>
                </Card>
            </Col>
        )
    }
}


Page.propTypes = {    
    setting: PropTypes.object.isRequired,
    getSetting: PropTypes.func.isRequired
}

const mapStateToProps = ({ setting }) => {
    return { setting };
};

export default injectIntl(connect(mapStateToProps, {
    getSetting,
    updateSetting
})(Page));
