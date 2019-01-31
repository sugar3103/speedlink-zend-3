const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'role.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'role.validate-name-minlength';
    } else if (values.name.length > 128) {
      errors.name = 'role.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'role.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'role.validate-nameEn-minlength';
    } else if (values.name_en.length > 128) {
      errors.name_en = 'role.validate-nameEn-maxlength';
    }

    return errors;
  };
  
  export default validate;
  