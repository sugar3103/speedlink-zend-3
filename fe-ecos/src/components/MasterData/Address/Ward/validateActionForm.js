const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'ward.validate-name-empty';
    } else if (values.name.length < 5) {
      errors.name = 'ward.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'ward.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'ward.validate-nameEn-empty';
    } else if (values.name_en.length < 5) {
      errors.name_en = 'ward.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'ward.validate-nameEn-maxlength';
    }

    return errors;
  };
  
  export default validate;
  