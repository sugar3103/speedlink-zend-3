
const validate = (values) => {
  
    const errors = {};

    if (values.is_private  === undefined || values.is_private === null ) {
      errors.is_private = 'pri_int.validate-type-empty';
    }
    
    if (!values.customer_id && values.is_private === 1 ) {
      errors.customer_id = 'pri_int.validate-customer-empty';
    }

    if (!values.saleman_id) {
      errors.saleman_id = 'pri_int.validate-saleman-empty';
    }

    if (values.status  === undefined || values.status === null ) {
      errors.status = 'pri_int.validate-status-empty';
    }

    if (!values.category_id) {
      errors.category_id = 'pri_int.validate-category-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'pri_int.validate-carrier-empty';
    }

    if (!values.effected_date) {
      errors.effected_date = 'pri_int.validate-effected-date-empty';
    }

    if (!values.expired_date) {
      errors.expired_date = 'pri_int.validate-expired-date-empty';
    }

    if (values.effected_date && values.expired_date) {
      const effected_date = new Date(values.effected_date);
      const expired_date = new Date(values.expired_date);
      if (effected_date > expired_date) {
        errors.expired_date = 'pri_int.validate-expired-date-lesser';
      }
    }

    if (!values.origin_country_id) {
      errors.origin_country_id = 'pri_int.validate-country-empty';
    }

    if (parseInt(values.category_id) === 3 && !values.origin_city_id) {
      errors.origin_city_id = 'pri_int.validate-city-empty';
    }

    if (!values.approved_by) {
      errors.approved_by = 'pri_int.validate-approval-by-empty';
    }

    return errors;
  };
  
  export default validate;
  