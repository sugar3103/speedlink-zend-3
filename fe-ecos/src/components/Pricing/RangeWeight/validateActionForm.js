const validate = (values) => {
    const errors = {};
    // console.log(values);
    if (!values.code) {
      errors.code = 'rangeweight.validate-code-empty';
    } else if (values.code.length < 5) {
      errors.name = 'rangeweight.validate-code-minlength';
    } else if (values.code.length > 20) {
      errors.name = 'rangeweight.validate-code-maxlength';
    }

    if (!values.is_private ) {
      errors.is_private = 'rangeweight.validate-private-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'rangeweight.validate-carrier-empty';
    }

    if (!values.customer_id && values.is_private !== 1) {
      errors.customer_id = 'rangeweight.validate-customer-empty';
    }

    if (!values.category) {
      errors.category = 'rangeweight.validate-category-empty';
    }

    if (!values.status) {
      errors.status = 'rangeweight.validate-status-empty';
    }

    if (!values.service_id) {
      errors.service_id = 'rangeweight.validate-service-empty';
    }

    if (!values.shipment_type_id) {
      errors.shipment_type_id = 'rangeweight.validate-shipment_type-empty';
    }

    if (!values.from) {
      errors.from = 'rangeweight.validate-from-empty';
    }
    if (!values.to) {
      errors.to = 'rangeweight.validate-to-empty';
    }
    if (!values.calculate_unit) {
      errors.calculate_unit = 'rangeweight.validate-calculate_unit-empty';
    }
    if (!values.unit) {
      errors.unit = 'rangeweight.validate-unit-empty';
    }
    if (!values.round_up) {
      errors.round_up = 'rangeweight.validate-round_up-empty';
    }

    return errors;
  };
  
  export default validate;
  