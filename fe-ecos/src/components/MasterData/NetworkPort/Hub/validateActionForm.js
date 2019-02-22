const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'hub.validate-name-empty';
    } else if (values.name.length < 1) {
      errors.name = 'hub.validate-name-minlength';
    } else if (values.name.length > 21) {
      errors.name = 'hub.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'hub.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'hub.validate-nameEn-minlength';
    } else if (values.name_en.length > 21) {
      errors.name_en = 'hub.validate-nameEn-maxlength';
    }

    if (!values.code) {
      errors.code = 'hub.validate-code-empty';
    } else if (values.code.length < 2) {
      errors.code = 'hub.validate-code-minlength';
    } else if (values.code.length > 21) {
      errors.code = 'hub.validate-code-maxlength';
    }
    if (!values.country_id) {
      errors.country_id = 'hub.validate-country-empty';
    }

    if (!values.city_id) {
      errors.city_id = 'hub.validate-city-empty';
    }
    return errors;
  };
  
  export default validate;
  