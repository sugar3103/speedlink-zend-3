
const validate = (values) => {
  
    const errors = {};
    if (!values.code) {
      errors.code = 'zonecode.validate-code-empty';
    } else if (values.code.length < 5) {
      errors.code = 'zonecode.validate-code-minlength';
    } else if (values.code.length > 20) {
      errors.code = 'zonecode.validate-code-maxlength';
    }

    if (!values.is_private) {
      errors.is_private = 'zonecode.validate-private-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'zonecode.validate-carrier-empty';
    }

    if (!values.customer_id && values.is_private !== 1 ) {
      errors.customer_id = 'zonecode.validate-customer-empty';
    }

    if (!values.category) {
      errors.category = 'zonecode.validate-category-empty';
    }

    if (values.status  === undefined || values.status === null ) {
      errors.status = 'zonecode.validate-status-empty';
    }

    if (!values.service_id) {
      errors.service_id = 'zonecode.validate-service-empty';
    }

    if (!values.shipment_type_id) {
      errors.shipment_type_id = 'zonecode.validate-shipment_type-empty';
    }

    if (values.category==='Domestic' && !values.origin_city_id) {
      errors.origin_city_id = 'zonecode.validate-origin_city-empty';
    }

    if (values.category==='Domestic' && !values.destination_city_id) {
      errors.destination_city_id = 'zonecode.validate-destination_city-empty';
    }

    return errors;
  };
  
  export default validate;
  