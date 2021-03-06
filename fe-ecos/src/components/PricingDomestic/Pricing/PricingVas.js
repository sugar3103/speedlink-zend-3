import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PricingVasForm from './PricingVasForm';
import { updatePricingDomesticVas } from '../../../redux/actions';

class PricingVas extends Component {

  handleSubmit = values => {
    const { id } = this.props.match.params;
    const data = {
      id,
      data: values.vas
    };
    this.props.updatePricingDomesticVas(data);
  }

  render() {
    return (
      <PricingVasForm onSubmit={this.handleSubmit} type_action={this.props.type}/>
    )
  }
}

PricingVas.propTypes = {
  updatePricingDomesticVas: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

export default connect(null, {
  updatePricingDomesticVas
})(withRouter(PricingVas));
