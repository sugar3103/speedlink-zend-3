import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import { List } from '../../../components/MasterData/ServiceShipment/Carrier';
import { connect } from "react-redux";
import { getCarrierList } from '../../../redux/actions';
import AccessDenied from '../../../containers/Layout/accessDenied';
import PageTitle from '../../../containers/Shared/PageTitle';

class Carrier extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadPage: true
    }
  }

  componentDidMount() {
    this.props.getCarrierList()
  }
  componentDidUpdate(prevProps, prevState) {

    if (this.state.loadPage) {
      this.setState({ loadPage: prevProps.loading })
    }
  }
  render() {
    const { messages } = this.props.intl;
    const { errors } = this.props.carrier;
    return (
      <Container className={'panel__body'}>
        <PageTitle title={messages['carrier.list-title']} />
        <Row>
          <Col md={12}>
            <h3 className="page-title">{messages['carrier.list-title']}</h3>
            {/* <h3 className="page-subhead subhead"/> */}
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
const mapStateToProps = ({ carrier }) => {
  return {
    carrier
  };
};


export default injectIntl(connect(
  mapStateToProps,
  {
    getCarrierList
  }
)(Carrier));
