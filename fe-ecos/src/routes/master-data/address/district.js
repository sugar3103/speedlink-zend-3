import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { List } from '../../../components/MasterData/Address/District';
import { injectIntl } from 'react-intl';
import { connect } from "react-redux";
import { getDistrictList } from '../../../redux/actions';
import AccessDenied from '../../../containers/Layout/accessDenied';

class District extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPage: true
    }
  }

  componentDidMount() {
    this.props.getDistrictList();
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.loadPage) {
      this.setState({ loadPage: prevProps.loading })
    }
  }

  render() {
    const { messages } = this.props.intl;
    const { errors } = this.props.district;
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{messages['address.districts']}
              {this.state.loadPage ? (<div className="lds-dual-ring" />) : ''}
            </h3>
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
}

const mapStateToProps = ({ address }) => { 
  const { district } = address 
  return {
    district
  };
};


export default injectIntl(connect(
  mapStateToProps,
  {
    getDistrictList    
  }
)(District));

