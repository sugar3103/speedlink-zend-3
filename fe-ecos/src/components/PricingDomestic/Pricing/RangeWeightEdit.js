import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RangeWeightEditForm from './RangeWeightEditForm';
import { addRangeWeightValue } from '../../../redux/actions';


class RangeWeightEdit extends Component {

  handleSubmit = values => {
    const { toggleModal } = this.props;
    if (values) {
      let dataPost = {
        id: values.pricing_id,
        data: []
      };
      delete values.pricing_id;
      Object.keys(values).forEach(key => {
        const range_weight_id = key.replace('range_weight_', '');
        dataPost.data.push({
          range_weight: range_weight_id,
          value: values[key]
        });
      })
      this.props.addRangeWeightValue(dataPost, toggleModal);
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
  addRangeWeightValue: PropTypes.func.isRequired
}

export default injectIntl(connect(null, {
  addRangeWeightValue
})(RangeWeightEdit));