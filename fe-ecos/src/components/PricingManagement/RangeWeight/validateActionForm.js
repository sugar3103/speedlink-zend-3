const validate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.code = 'range_weight.validate-code-empty';
  } else if (values.code.length < 2) {
    errors.code = 'range_weight.validate-code-minlength';
  } else if (values.code.length > 20) {
    errors.code = 'range_weight.validate-code-maxlength';
  }

    if (!values.is_private ) {
      errors.is_private = 'pri_man.validate-private-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'pri_man.validate-carrier-empty';
    }

    if (!values.customer_id && values.is_private !== 1) {
      errors.customer_id = 'pri_man.validate-customer-empty';
    }

    if (!values.category) {
      errors.category = 'pri_man.validate-category-empty';
    }

    if (values.status  === undefined || values.status === null ) {
      errors.status = 'pri_man.validate-status-empty';
    }

    if (!values.service_id) {
      errors.service_id = 'pri_man.validate-service-empty';
    }

    if (!values.shipment_type_id) {
      errors.shipment_type_id = 'pri_man.validate-shipment_type-empty';
    }

  
    return errors;
  };
  
  export default validate;
  