const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'pri_special.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'pri_special.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'pri_special.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'pri_special.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'pri_special.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'pri_special.validate-nameEn-maxlength';
    }

    if (!values.customer_id) {
      errors.customer_id = 'pri_special.validate-customer-empty';
    }

    if (!values.special_area_id) {
      errors.special_area_id = 'pri_special.validate-area-empty';
    }

    if (values.status  === undefined || values.status === null ) {
      errors.status = 'pri_special.validate-status-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'pri_special.validate-carrier-empty';
    }

    if (!values.service_id) {
      errors.service_id = 'pri_special.validate-service-empty';
    }

    if (!values.shipment_type_id) {
      errors.shipment_type_id = 'pri_special.validate-shipment-type-empty';
    }
    
    if (values.from  === undefined || values.from === null) {
      errors.from = 'pri_special.validate-from-empty';
    } else if (isNaN(values.from)) {
      errors.from = 'pri_special.validate-from-not-is-number';
    } else if (parseFloat(values.from) < 0) {
      errors.from = 'pri_special.validate-from-not-negative';
    }

    if (!values.to) {
      errors.to = 'pri_special.validate-to-empty';
    } else if (isNaN(values.to)) {
      errors.to = 'pri_special.validate-to-not-is-number';
    } else if (parseFloat(values.to) < 0) {
      errors.to = 'pri_special.validate-to-not-negative';
    } else if (parseFloat(values.to) !== 0 && parseFloat(values.to) < parseFloat(values.from)) {
      errors.to = 'pri_special.validate-to-not-less-than-from';
    }

    if (values.calculate_unit  === undefined || values.calculate_unit === null ) {
      errors.calculate_unit = 'pri_special.validate-calculate-unit-empty';
    }

    if (values.calculate_unit && !values.unit) {
      errors.unit = 'pri_special.validate-unit-empty';
    } else if (isNaN(values.unit)) {
      errors.unit = 'pri_special.validate-unit-not-is-number';
    } else if (parseFloat(values.unit) <= 0) {
      errors.unit = 'pri_special.validate-unit-must-be-greater-than-0';
    }

    if (!values.round_up) {
      errors.round_up = 'pri_special.validate-round-up-empty';
    } else if (isNaN(values.round_up)) {
      errors.round_up = 'pri_special.validate-round-up-not-is-number';
    } else if (parseFloat(values.round_up) < 0) {
      errors.round_up = 'pri_special.validate-round-up-not-negative';
    }

    return errors;
  };
  
  export default validate;
