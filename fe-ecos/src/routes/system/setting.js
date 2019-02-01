import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import Page  from '../../components/System/Setting';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSetting } from '../../redux/actions';

class Setting extends Component {
    handleSubmit = values => {
        let _values = {
            'config' : values
        }        
    }
    
    componentDidMount() {
        this.props.getSetting();
    }
    render() {
        const { messages } = this.props.intl;
        const { setting } = this.props;
    
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <h3 className="page-title">{messages['setting']}</h3>
                        <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                              information
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Page onSubmit={this.handleSubmit} setting={setting.items}/>
                </Row>
            </Container>
        )
    }
}

Setting.propTypes = {    
    setting: PropTypes.func.isRequired,
    getSetting: PropTypes.func.isRequired
}

const mapStateToProps = ({ setting }) => {
    return { setting };
};

export default injectIntl(connect(mapStateToProps,{getSetting})(Setting));
