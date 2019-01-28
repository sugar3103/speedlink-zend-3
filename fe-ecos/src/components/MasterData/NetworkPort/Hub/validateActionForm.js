const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'hub.validate-name-empty';
    } else if (values.name.length < 5) {
      errors.name = 'hub.validate-name-minlength';
    } else if (values.name.length > 21) {
      errors.name = 'hub.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'hub.validate-nameEn-empty';
    } else if (values.name_en.length < 5) {
      errors.name_en = 'hub.validate-nameEn-minlength';
    } else if (values.name_en.length > 21) {
      errors.name_en = 'hub.validate-nameEn-maxlength';
    }

    if (!values.code) {
      errors.code = 'hub.validate-code-empty';
    } else if (values.code.length < 5) {
      errors.code = 'hub.validate-code-minlength';
    } else if (values.code.length > 21) {
      errors.code = 'hub.validate-code-maxlength';
    }

    return errors;
  };
  
  export default validate;
  