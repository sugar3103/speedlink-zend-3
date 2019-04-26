import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { injectIntl } from 'react-intl';
import {List} from '../../components/PricingManagement/RangeWeight';
import AccessDenied from '../../containers/Layout/accessDenied';
import { connect } from "react-redux";
import { getRangeWeightList } from '../../redux/actions';

class RangeWeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPage: true
    }
  }
  componentDidMount() {
    this.props.getRangeWeightList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loadPage) {
      this.setState({ loadPage: prevProps.loading })
    }
  }

  render() {
    const { messages } = this.props.intl;
    const { errors } = this.props.rangeWeight;
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{messages['range_weight.list-title']}</h3>
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

const mapStateToProps = ({ rangeWeight }) => {  
  return {
    rangeWeight
  };
};

export default injectIntl(connect(
  mapStateToProps,
  {
    getRangeWeightList    
  }
)(RangeWeight));

