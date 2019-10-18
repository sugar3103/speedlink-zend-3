const validate = (values) => {
    const errors = {};
    
    if (!values.customer_id) {
      errors.customer_id = 'pri_special.validate-customer-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'pri_special.validate-carrier-empty';
    }

    if (!values.service_id) {
      errors.service_id = 'pri_special.validate-service-empty';
    }

    if (!values.effected_date) {
      errors.effected_date = 'pri_special.validate-effected-date-empty';
    }

    if (!values.expired_date) {
      errors.expired_date = 'pri_special.validate-expired-date-empty';
    }

    if (values.effected_date && values.expired_date) {
      const effected_date = new Date(values.effected_date);
      const expired_date = new Date(values.expired_date);
      if (effected_date > expired_date) {
        errors.expired_date = 'pri_special.validate-expired-date-lesser';
      }
    }

    if (values.status  === undefined || values.status === null ) {
      errors.status = 'pri_special.validate-status-empty';
    }

    if (!values.approved_by) {
      errors.approved_by = 'pri_special.validate-approval-by-empty';
    }

    if (values.total_ras  === undefined || values.total_ras === null || values.total_ras === '' ) {
      errors.total_ras = 'pri_special.validate-ras-empty';
    }
    
    return errors;
  };
  
  export default validate;
  