const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'login.username-error-empty';
    }
    if (!values.password) {
      errors.password = 'login.password-error-empty';
    }

    return errors;
  };
  
  export default validate;
  