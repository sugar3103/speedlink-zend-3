const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'pri_special.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'pri_special.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'pri_special.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'pri_special.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'pri_special.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'pri_special.validate-nameEn-maxlength';
    }

    return errors;
  };
  
  export default validate;
  