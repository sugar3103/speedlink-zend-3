const validate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.code = 'carrier.validate-code-empty';
  }

  if (!values.name) {
    errors.name = 'carrier.validate-name-empty';
  } else if (values.name.length < 2) {
    errors.name = 'carrier.validate-name-minlength';
  } else if (values.name.length > 60) {
    errors.name = 'carrier.validate-name-maxlength';
  }

  if (!values.name_en) {
    errors.name_en = 'carrier.validate-nameEn-empty';
  } else if (values.name_en.length < 2) {
    errors.name_en = 'carrier.validate-nameEn-minlength';
  } else if (values.name_en.length > 60) {
    errors.name_en = 'carrier.validate-nameEn-maxlength';
  }
  return errors;
};

export default validate;
