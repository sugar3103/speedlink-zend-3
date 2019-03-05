const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'branch.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'branch.validate-name-minlength';
    } else if (values.name.length > 21) {
      errors.name = 'branch.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'branch.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'branch.validate-nameEn-minlength';
    } else if (values.name_en.length > 21) {
      errors.name_en = 'branch.validate-nameEn-maxlength';
    }

    if (!values.code) {
      errors.code = 'branch.validate-code-empty';
    } else if (values.code.length < 2) {
      errors.code = 'branch.validate-code-minlength';
    } else if (values.code.length > 21) {
      errors.code = 'branch.validate-code-maxlength';
    }

    if (!values.hub_id) {
      errors.hub_id = 'branch.validate-hub-empty';
    }

    if (!values.country_id) {
      errors.country_id = 'branch.validate-country-empty';
    }

    if (!values.city_id) {
      errors.city_id = 'branch.validate-city-empty';
    }
    if (!values.district_id) {
      errors.district_id = 'branch.validate-district-empty';
    }

    return errors;
  };
  
  export default validate;
  