import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RangeWeightEditForm from './RangeWeightEditForm';
import { addRangeWeightSpecialValue } from '../../../redux/actions';


class RangeWeightEdit extends Component {

  handleSubmit = values => {
    const { toggleModal } = this.props;
    if (values) {
      this.props.addRangeWeightSpecialValue(values, toggleModal);
    }
  }

  render() {
    const { toggleModal, data } = this.props;
    return <RangeWeightEditForm onSubmit={this.handleSubmit} toggleModal={toggleModal} data={data} />;
  }
}

RangeWeightEdit.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  addRangeWeightSpecialValue: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  addRangeWeightSpecialValue
})(RangeWeightEdit));