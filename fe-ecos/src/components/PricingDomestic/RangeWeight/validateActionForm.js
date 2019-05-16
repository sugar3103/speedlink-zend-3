const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'pri_dom.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'pri_dom.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'pri_dom.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'pri_dom.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'pri_dom.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'pri_dom.validate-nameEn-maxlength';
    }

    if (values.status  === undefined || values.status === null ) {
      errors.status = 'pri_dom.validate-status-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'pri_dom.validate-carrier-empty';
    }

    if (!values.service_id) {
      errors.service_id = 'pri_dom.validate-service-empty';
    }

    if (!values.shipment_type_id) {
      errors.shipment_type_id = 'pri_dom.validate-shipment-type-empty';
    }

    if (!values.zone_id) {
      errors.zone_id = 'pri_dom.validate-zone-empty';
    }
    
    if (!values.from) {
      errors.from = 'pri_dom.validate-from-empty';
    } else if (isNaN(values.from)) {
      errors.from = 'pri_dom.validate-from-not-is-number';
    } else if (parseFloat(values.from) < 0) {
      errors.from = 'pri_dom.validate-from-not-negative';
    }

    if (!values.to) {
      errors.to = 'pri_dom.validate-to-empty';
    } else if (isNaN(values.to)) {
      errors.to = 'pri_dom.validate-to-not-is-number';
    } else if (parseFloat(values.to) < 0) {
      errors.to = 'pri_dom.validate-to-not-negative';
    } else if (parseFloat(values.to) !== 0 && parseFloat(values.to) < parseFloat(values.from)) {
      errors.to = 'pri_dom.validate-to-not-less-than-from';
    }

    if (values.calculate_unit  === undefined || values.calculate_unit === null ) {
      errors.calculate_unit = 'pri_dom.validate-calculate-unit-empty';
    }

    if (values.calculate_unit && !values.unit) {
      errors.unit = 'pri_dom.validate-unit-empty';
    } else if (isNaN(values.unit)) {
      errors.unit = 'pri_dom.validate-unit-not-is-number';
    } else if (parseFloat(values.unit) < 0) {
      errors.unit = 'pri_dom.validate-unit-not-negative';
    }

    if (values.is_ras === undefined || values.is_ras === null ) {
      errors.is_ras = 'pri_dom.validate-ras-empty';
    }

    if (!values.round_up) {
      errors.round_up = 'pri_dom.validate-round-up-empty';
    } else if (isNaN(values.round_up)) {
      errors.round_up = 'pri_dom.validate-round-up-not-is-number';
    } else if (parseFloat(values.round_up) < 0) {
      errors.round_up = 'pri_dom.validate-round-up-not-negative';
    }

    return errors;
  };
  
  export default validate;
  