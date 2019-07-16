const validate = (values) => {
    const errors = {};
    if (values.is_private  === undefined || values.is_private === null ) {
      errors.is_private = 'pri_int.validate-type-empty';
    }

    if (values.is_private === 1 && !values.customer_id) {
      errors.customer_id = 'pri_dom.validate-customer-empty';
    }

    if (!values.name) {
      errors.name = 'pri_int.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'pri_int.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'pri_int.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'pri_int.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'pri_int.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'pri_int.validate-nameEn-maxlength';
    }

    if (!values.category_id) {
      errors.category_id = 'pri_int.validate-category-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'pri_int.validate-carrier-empty';
    }

    if (!values.service_id) {
      errors.service_id = 'pri_int.validate-service-empty';
    }

    if (!values.shipment_type_id) {
      errors.shipment_type_id = 'pri_int.validate-shipment-type-empty';
    }

    if (values.status  === undefined || values.status === null ) {
      errors.status = 'pri_int.validate-status-empty';
    }

    if (!values.from) {
      errors.from = 'pri_int.validate-from-empty';
    } else if (isNaN(values.from)) {
      errors.from = 'pri_int.validate-from-not-is-number';
    } else if (parseFloat(values.from) < 0) {
      errors.from = 'pri_int.validate-from-not-negative';
    }

    if (!values.to) {
      errors.to = 'pri_int.validate-to-empty';
    } else if (isNaN(values.to)) {
      errors.to = 'pri_int.validate-to-not-is-number';
    } else if (parseFloat(values.to) < 0) {
      errors.to = 'pri_int.validate-to-not-negative';
    } else if (parseFloat(values.to) !== 0 && parseFloat(values.to) < parseFloat(values.from)) {
      errors.to = 'pri_int.validate-to-not-less-than-from';
    }

    if (!values.round_up) {
      errors.round_up = 'pri_int.validate-round-up-empty';
    } else if (isNaN(values.round_up)) {
      errors.round_up = 'pri_int.validate-round-up-not-is-number';
    } else if (parseFloat(values.round_up) < 0) {
      errors.round_up = 'pri_int.validate-round-up-not-negative';
    }

    if (values.calculate_unit  === undefined || values.calculate_unit === null ) {
      errors.calculate_unit = 'pri_int.validate-calculate-unit-empty';
    }

    if (values.calculate_unit && !values.unit) {
      errors.unit = 'pri_int.validate-unit-empty';
    } else if (isNaN(values.unit)) {
      errors.unit = 'pri_int.validate-unit-not-is-number';
    } else if (parseFloat(values.unit) <= 0) {
      errors.unit = 'pri_int.validate-unit-must-be-greater-than-0';
    }

    return errors;
  };
  
  export default validate;
  