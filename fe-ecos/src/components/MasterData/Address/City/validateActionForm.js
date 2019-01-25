const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'city.validate-name-empty';
    } else if (values.name.length < 5) {
      errors.name = 'city.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'city.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'city.validate-nameEn-empty';
    } else if (values.name_en.length < 5) {
      errors.name_en = 'city.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'city.validate-nameEn-maxlength';
    }

    if (!values.iso_code) {
      errors.iso_code = 'city.validate-isoCode-empty';
    }

    return errors;
  };
  
  export default validate;
  