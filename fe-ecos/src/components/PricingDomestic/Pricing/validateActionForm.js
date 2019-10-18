const validate = (values) => {
    const errors = {};
    if (values.is_private  === undefined || values.is_private === null ) {
      errors.is_private = 'pri_dom.validate-type-empty';
    }

    if (values.is_private === 1 && !values.customer_id) {
      errors.customer_id = 'pri_dom.validate-customer-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'pri_dom.validate-carrier-empty';
    }

    if (!values.service_id) {
      errors.service_id = 'pri_dom.validate-service-empty';
    }

    if (!values.effected_date) {
      errors.effected_date = 'pri_dom.validate-effected-date-empty';
    }

    if (!values.expired_date) {
      errors.expired_date = 'pri_dom.validate-expired-date-empty';
    }

    if (values.effected_date && values.expired_date) {
      const effected_date = new Date(values.effected_date);
      const expired_date = new Date(values.expired_date);
      if (effected_date > expired_date) {
        errors.expired_date = 'pri_dom.validate-expired-date-lesser';
      }
    }

    if (values.status  === undefined || values.status === null ) {
      errors.status = 'pri_dom.validate-status-empty';
    }

    if (!values.approval_by) {
      errors.approval_by = 'pri_dom.validate-approval-by-empty';
    }
    
    return errors;
  };
  
  export default validate;
  