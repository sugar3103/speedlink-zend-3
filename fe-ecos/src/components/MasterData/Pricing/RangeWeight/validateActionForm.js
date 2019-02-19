const validate = (values) => {
    const errors = {};
    if (!values.code) {
      errors.code = 'rangeweight.validate-code-empty';
    } else if (values.code.length < 5) {
      errors.name = 'carrier.validate-name-minlength';
    } else if (values.code.length > 20) {
      errors.name = 'carrier.validate-name-maxlength';
    }
    return errors;
  };
  
  export default validate;
  