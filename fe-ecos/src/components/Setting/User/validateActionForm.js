const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'user.validate-username-empty';
    } else if (values.username.length < 5) {
      errors.username = 'user.validate-username-minlength';
    } else if (values.username.length > 60) {
      errors.username = 'user.validate-username-maxlength';
    }

    if (values.password) {
      if (values.password.length < 5) {
        errors.password = 'user.validate-password-minlength';
      } else if (values.password.length > 60) {
        errors.password = 'user.validate-password-maxlength';
      }
    }

    if (values.confirm_password !== values.password) {
      errors.confirm_password = 'user.validate-confirm-password-mismatched';
    }

    if (!values.roles || !values.roles.length) {
      errors.roles = 'user.validate-roles-empty';
    }

    return errors;
  };
  
  export default validate;
  