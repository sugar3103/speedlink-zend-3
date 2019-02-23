const validate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.code = 'range_weight.validate-code-empty';
  } else if (values.code.length < 5) {
    errors.code = 'range_weight.validate-code-minlength';
  } else if (values.code.length > 20) {
    errors.code = 'range_weight.validate-code-maxlength';
  }

    if (!values.is_private ) {
      errors.is_private = 'range_weight.validate-private-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'range_weight.validate-carrier-empty';
    }

    if (!values.customer_id && values.is_private !== 1) {
      errors.customer_id = 'range_weight.validate-customer-empty';
    }

    if (!values.category) {
      errors.category = 'range_weight.validate-category-empty';
    }

    if (values.status  === undefined || values.status === null ) {
      errors.status = 'range_weight.validate-status-empty';
    }

    if (!values.service_id) {
      errors.service_id = 'range_weight.validate-service-empty';
    }

    if (!values.shipment_type_id) {
      errors.shipment_type_id = 'range_weight.validate-shipment_type-empty';
    }

    // if (!values.from) {
    //   errors.from = 'range_weight.validate-from-empty';
    // }
    // if (!values.to) {
    //   errors.to = 'rangeweight.validate-to-empty';
    // }
    // if (!values.calculate_unit) {
    //   errors.calculate_unit = 'rangeweight.validate-calculate_unit-empty';
    // }
    // if (!values.unit) {
    //   errors.unit = 'rangeweight.validate-unit-empty';
    // }
    // if (!values.round_up ) {
    //   errors.round_up = 'rangeweight.validate-round_up-empty';
    // }

    return errors;
  };
  
  export default validate;
  