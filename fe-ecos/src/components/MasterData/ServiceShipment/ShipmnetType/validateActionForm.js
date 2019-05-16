const validate = (values) => {
  const errors = {};
  if (!values.code) {
    errors.code = 'shipment_type.validate-code-empty';
  }

  if (!values.name) {
    errors.name = 'shipment_type.validate-name-empty';
  } else if (values.name.length < 2) {
    errors.name = 'shipment_type.validate-name-minlength';
  } else if (values.name.length > 60) {
    errors.name = 'shipment_type.validate-name-maxlength';
  }

  if (!values.name_en) {
    errors.name_en = 'shipment_type.validate-nameEn-empty';
  } else if (values.name_en.length < 2) {
    errors.name_en = 'shipment_type.validate-nameEn-minlength';
  } else if (values.name_en.length > 60) {
    errors.name_en = 'shipment_type.validate-nameEn-maxlength';
  }

  if (!values.carrier_id) {
    errors.carrier_id = 'shipment_type.validate-carrier-empty';
  }

  if (!values.service_id) {
    errors.service_id = 'shipment_type.validate-service-empty';
  }

  if (!values.product_type_code) {
    errors.product_type_code = 'shipment_type.validate-product-empty';
  }

  if (!values.category_id) {
    errors.category_id = 'shipment_type.validate-category-empty';
  }

  if (!values.volumetric_number) {
    errors.volumetric_number = 'shipment_type.validate-volumetric-empty';
  }

  return errors;
};

export default validate;
