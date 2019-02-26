
const validate = (values) => {
  
    const errors = {};
    if (!values.code) {
      errors.code = 'zone_code.validate-code-empty';
    } else if (values.code.length < 5) {
      errors.code = 'zone_code.validate-code-minlength';
    } else if (values.code.length > 20) {
      errors.code = 'zone_code.validate-code-maxlength';
    }

    if (!values.is_private) {
      errors.is_private = 'zone_code.validate-private-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'zone_code.validate-carrier-empty';
    }

    if (!values.customer_id && values.is_private !== 1 ) {
      errors.customer_id = 'zone_code.validate-customer-empty';
    }

    if (!values.category) {
      errors.category = 'zone_code.validate-category-empty';
    }

    if (values.status  === undefined || values.status === null ) {
      errors.status = 'zone_code.validate-status-empty';
    }

    if (!values.service_id) {
      errors.service_id = 'zone_code.validate-service-empty';
    }

    if (!values.shipment_type_id) {
      errors.shipment_type_id = 'zone_code.validate-shipment_type-empty';
    }

    if (values.category==='Domestic' && !values.origin_city_id) {
      errors.origin_city_id = 'zone_code.validate-origin_city-empty';
    }

    if (values.category==='Domestic' && !values.destination_city_id) {
      errors.destination_city_id = 'zone_code.validate-destination_city-empty';
    }

    return errors;
  };
  
  export default validate;
  