const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'country.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'country.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'country.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'country.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'country.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'country.validate-nameEn-maxlength';
    }

    if (!values.iso_code) {
      errors.iso_code = 'country.validate-isoCode-empty';
    }

    return errors;
  };
  
  export default validate;
  