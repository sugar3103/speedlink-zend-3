
const validate = (values) => {
  
    const errors = {};

    if (!values.is_private) {
      errors.is_private = 'pri_man.validate-private-empty';
    }
    
    if (!values.customer_id && values.is_private === 2 ) {
      errors.customer_id = 'pri_man.validate-customer-empty';
    }

    if (!values.saleman_id) {
      errors.saleman_id = 'pricing.validate-saleman-empty';
    }

    if (values.status  === undefined || values.status === null ) {
      errors.status = 'pri_man.validate-status-empty';
    }

    if (!values.category_code) {
      errors.category_code = 'pri_man.validate-category-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'pri_man.validate-carrier-empty';
    }

    if (!values.effected_date) {
      errors.effected_date = 'pricing.validate-effected-date-empty';
    }

    if (!values.expired_date) {
      errors.expired_date = 'pricing.validate-expired-date-empty';
    }

    if (values.effected_date && values.expired_date && values.effected_date > values.expired_date) {
      errors.expired_date = 'pricing.validate-expired-date-lesser';
    }

    if (!values.origin_country_id) {
      errors.origin_country_id = 'pricing.validate-origin-country-empty';
    }

    if (values.category_code && values.category_code === 'Domestic' && !values.origin_city_id) {
      errors.origin_city_id = 'pricing.validate-origin-city-empty';
    }

    if (!values.approved_by) {
      errors.approved_by = 'pricing.validate-approved-by-empty';
    }

    return errors;
  };
  
  export default validate;
  