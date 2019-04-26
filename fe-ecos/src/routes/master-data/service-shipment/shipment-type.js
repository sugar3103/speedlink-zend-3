import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { List } from '../../../components/MasterData/ServiceShipment/ShipmnetType';
import { connect } from "react-redux";
import { getShipmentTypeList } from '../../../redux/actions';
import AccessDenied from '../../../containers/Layout/accessDenied';
import PageTitle from '../../../containers/Shared/PageTitle';
class ShipmentType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPage: true
    }
  }

  componentDidMount() {
    this.props.getShipmentTypeList()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loadPage) {
      this.setState({ loadPage: prevProps.loading })
    }
  }

  render() {
    const { messages } = this.props.intl;
    const { errors } = this.props.shipment_type;
    return (
      <Container className={'panel__body'}>
      <PageTitle title={messages['shipment_type.list-title']} />
        <Row>
          <Col md={12}>
            <h3 className="page-title">{messages['cs.shipment_type']}</h3>
            {/* <h3 className="page-subhead subhead"> */}
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

const mapStateToProps = ({ shipment_type }) => {  
  return {
    shipment_type
  };
};


export default injectIntl(connect(
  mapStateToProps,
  {
    getShipmentTypeList    
  }
)(ShipmentType));

