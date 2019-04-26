import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import {List} from '../../components/PricingManagement/ZoneCode';
import AccessDenied from '../../containers/Layout/accessDenied';
import { connect } from "react-redux";
import { getZoneCodeList } from '../../redux/actions';

class ZoneCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPage: true
    }
  }
  componentDidMount() {
    this.props.getZoneCodeList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loadPage) {
      this.setState({ loadPage: prevProps.loading })
    }
  }

  render() {
    const { messages } = this.props.intl;
    const { errors } = this.props.zoneCode;
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{messages['zone_code.list-title']}</h3>
            <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
                  information
            </h3>
          </Col>
        </Row>
        <Row>
          {!this.state.loadPage ? (
            (errors && errors === 'ACCESS_DENIED') ? (<AccessDenied />) : (<List />)
          ) : ''}
        </Row>
      </Container>
    )
  }
};

const mapStateToProps = ({ zoneCode }) => {  
  return {
    zoneCode
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getZoneCodeList    
  }
)(ZoneCode));