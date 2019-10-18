const validate = (values) => {
    const errors = {};
    if (!values.customer_id) {
      errors.customer_id = 'pri_special.validate-customer-empty';
    }

    if (!values.special_area_id) {
      errors.special_area_id = 'pri_special.validate-area-empty';
    }

    if (!values.name || !(values.name.toString().trim())) {
      errors.name = 'pri_special.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'pri_special.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'pri_special.validate-name-maxlength';
    }

    if (!values.name_en || !(values.name_en.toString().trim())) {
      errors.name_en = 'pri_special.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'pri_special.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'pri_special.validate-nameEn-maxlength';
    }

    if (!values.from_city) {
      errors.from_city = 'pri_special.validate-city-empty';
    }

    if (!values.to_city) {
      errors.to_city = 'pri_special.validate-city-empty';
    }

    if (!values.to_district) {
      errors.to_district = 'pri_special.validate-district-empty';
    }

    if (!values.to_ward) {
      errors.to_ward = 'pri_special.validate-ward-empty';
    }

    return errors;
  };
  
  export default validate;
  