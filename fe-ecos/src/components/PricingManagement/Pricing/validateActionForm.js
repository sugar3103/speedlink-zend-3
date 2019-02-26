
const validate = (values) => {
  
    const errors = {};

    if (!values.is_private) {
      errors.is_private = 'pri_man.validate-private-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'pri_man.validate-carrier-empty';
    }

    if (!values.customer_id && values.is_private !== 1 ) {
      errors.customer_id = 'pri_man.validate-customer-empty';
    }

    if (!values.category_code) {
      errors.category_code = 'pri_man.validate-category-empty';
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

    if (values.category==='Domestic' && !values.origin_city_id) {
      errors.origin_city_id = 'zone_code.validate-origin_city-empty';
    }

    if (values.category==='Domestic' && !values.destination_city_id) {
      errors.destination_city_id = 'zone_code.validate-destination_city-empty';
    }

    return errors;
  };
  
  export default validate;
  