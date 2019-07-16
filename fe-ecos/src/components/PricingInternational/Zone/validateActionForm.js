const validate = (values) => {
    const errors = {};
        
    if (values.is_private  === undefined || values.is_private === null ) {
      errors.is_private = 'pri_int.validate-type-empty';
    }

    if (values.is_private === 1 && !values.customer_id) {
      errors.customer_id = 'pri_dom.validate-customer-empty';
    }

    if (!values.name) {
      errors.name = 'pri_int.validate-name-empty';
    } else if (values.name.length < 2) {
      errors.name = 'pri_int.validate-name-minlength';
    } else if (values.name.length > 60) {
      errors.name = 'pri_int.validate-name-maxlength';
    }

    if (!values.name_en) {
      errors.name_en = 'pri_int.validate-nameEn-empty';
    } else if (values.name_en.length < 2) {
      errors.name_en = 'pri_int.validate-nameEn-minlength';
    } else if (values.name_en.length > 60) {
      errors.name_en = 'pri_int.validate-nameEn-maxlength';
    }

    if (!values.category_id) {
      errors.category_id = 'pri_int.validate-category-empty';
    }

    if (!values.carrier_id) {
      errors.carrier_id = 'pri_int.validate-carrier-empty';
    }

    if (!values.service_id) {
      errors.service_id = 'pri_int.validate-service-empty';
    }

    if (!values.origin_country_id) {
      errors.origin_country_id = 'pri_int.validate-country-empty';
    }

    if (parseInt(values.category_id) === 3 && !values.origin_city_id) {
      errors.origin_city_id = 'pri_int.validate-city-empty';
    }

    if (!values.destination_country_id) {
      errors.destination_country_id = 'pri_int.validate-country-empty';
    }

    if (parseInt(values.category_id) === 3 && !values.destination_city_id) {
      errors.destination_city_id = 'pri_int.validate-city-empty';
    }

    if (!values.shipment_type_id) {
      errors.shipment_type_id = 'pri_int.validate-shipment-type-empty';
    }

    if (values.status  === undefined || values.status === null ) {
      errors.status = 'pri_int.validate-status-empty';
    }

    return errors;
  };
  
  export default validate;
  