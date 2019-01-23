const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'status.validate-name-empty';
    }
    if (!values.nameEn) {
      errors.nameEn = 'status.validate-nameEn-empty';
    }

    return errors;
  };
  
  export default validate;
  