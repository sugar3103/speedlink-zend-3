const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'user.validate-username-empty';
  } else if (values.username.length < 5) {
    errors.username = 'user.validate-username-minlength';
  } else if (values.username.length > 60) {
    errors.username = 'user.validate-username-maxlength';
  }

  if (!values.first_name) {
    errors.first_name = 'user.validate-firstname-empty';
  } else if (values.first_name.length < 5) {
    errors.first_name = 'user.validate-firstname-minlength';
  } else if (values.first_name.length > 60) {
    errors.first_name = 'user.validate-firstname-maxlength';
  }

  if (!values.last_name) {
    errors.last_name = 'user.validate-lastname-empty';
  } else if (values.last_name.length < 5) {
    errors.last_name = 'user.validate-lastname-minlength';
  } else if (values.last_name.length > 60) {
    errors.last_name = 'user.validate-lastname-maxlength';
  }

  if (!values.email) {
    errors.email = 'user.validate-email-empty';
  } else if (values.email.length < 5) {
    errors.email = 'user.validate-email-minlength';
  } else if (values.email.length > 60) {
    errors.email = 'user.validate-email-maxlength';
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
  return errors;
};

export default validate;
