const validate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.code = 'service.validate-code-empty';
  }

  if (!values.name) {
    errors.name = 'service.validate-name-empty';
  } else if (values.name.length < 2) {
    errors.name = 'service.validate-name-minlength';
  } else if (values.name.length > 60) {
    errors.name = 'service.validate-name-maxlength';
  }

  if (!values.name_en) {
    errors.name_en = 'service.validate-nameEn-empty';
  } else if (values.name_en.length < 2) {
    errors.name_en = 'service.validate-nameEn-minlength';
  } else if (values.name_en.length > 60) {
    errors.name_en = 'service.validate-nameEn-maxlength';
  }
  return errors;
};

export default validate;
