import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import Page from '../../components/System/Setting';
import { connect } from "react-redux";
import { getSetting } from '../../redux/actions'
import AccessDenied from '../../containers/Layout/accessDenied';
import PageTitle from '../../containers/Shared/PageTitle';
class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadPage: true
        }
    }

    componentDidMount() {
        this.props.getSetting();
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.loadPage) {
            this.setState({ loadPage: prevProps.loading })
        }
    }
    render() {
        const { messages } = this.props.intl;
        const { errors } = this.props.setting;
        return (
            <Container>
                <PageTitle title={messages['setting']} />
                <Row>
                    {!this.state.loadPage ? (
                        (errors && errors === 'ACCESS_DENIED') ? (<AccessDenied />) : (<Page />)
                    ) : ''}
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = ({ setting }) => {
    return {
        setting
    };
};


export default injectIntl(connect(
    mapStateToProps,
    {
        getSetting
    }
)(Setting));
