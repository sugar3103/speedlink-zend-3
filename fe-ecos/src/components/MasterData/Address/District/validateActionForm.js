const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'district.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'district.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'district.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'district.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'district.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'district.validate-nameEn-maxlength';
    }

    if (!values.city_id) {
      errors.city_id = 'district.validate-city-empty';
    }

    return errors;
  };
  
  export default validate;
  