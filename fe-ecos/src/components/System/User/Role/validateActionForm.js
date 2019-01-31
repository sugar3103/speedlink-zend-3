const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'status.validate-name-empty';
    } else if (values.name.length < 5) {
      errors.name = 'status.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'status.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'status.validate-nameEn-empty';
    } else if (values.name_en.length < 5) {
      errors.name_en = 'status.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'status.validate-nameEn-maxlength';
    }

    return errors;
  };
  
  export default validate;
  