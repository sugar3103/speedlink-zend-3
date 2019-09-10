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

    return errors;
  };
  
  export default validate;
  