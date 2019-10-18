const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'permission.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'permission.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'permission.validate-name-maxlength';
    }

    return errors;
  };
  
  export default validate;
  