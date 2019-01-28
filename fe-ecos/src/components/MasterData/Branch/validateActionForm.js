const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'branch.validate-name-empty';
    } else if (values.name.length < 5) {
      errors.name = 'branch.validate-name-minlength';
    } else if (values.name.length > 21) {
      errors.name = 'branch.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'branch.validate-nameEn-empty';
    } else if (values.name_en.length < 5) {
      errors.name_en = 'branch.validate-nameEn-minlength';
    } else if (values.name_en.length > 21) {
      errors.name_en = 'branch.validate-nameEn-maxlength';
    }

    if (!values.code) {
      errors.code = 'branch.validate-code-empty';
    } else if (values.code.length < 5) {
      errors.code = 'branch.validate-code-minlength';
    } else if (values.code.length > 21) {
      errors.code = 'branch.validate-code-maxlength';
    }

    return errors;
  };
  
  export default validate;
  