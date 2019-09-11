const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'customer.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'customer.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'customer.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'customer.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'customer.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'customer.validate-nameEn-maxlength';
    }

    if (!values.customer_no) {
      errors.customer_no = 'customer.validate-customer-no-empty';
    }

    if (!values.ref_id) {
      errors.ref_id = 'customer.validate-ref-id-empty';
    }

    if (!values.tax_no) {
      errors.tax_no = 'customer.validate-tax-no-empty';
    }

    return errors;
  };
  
  export default validate;
  