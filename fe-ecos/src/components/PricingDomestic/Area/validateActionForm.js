const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'pri_dom.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'pri_dom.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'pri_dom.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'pri_dom.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'pri_dom.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'pri_dom.validate-nameEn-maxlength';
    }

    return errors;
  };
  
  export default validate;
  