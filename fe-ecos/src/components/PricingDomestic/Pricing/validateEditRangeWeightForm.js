const validate = values => {
  const errors = {}
  if (values.data && values.data.length) {
    const dataArrayErrors = []
    values.data.forEach((data, index) => {
      const dataErrors = {}
      if (!data || !data.value) {
        dataErrors.value = 'pri_dom.field-is-required';
        dataArrayErrors[index] = dataErrors
      }
      if (data && data.value && isNaN(data.value)) {
        dataErrors.value = 'pri_dom.field-is-number';
        dataArrayErrors[index] = dataErrors
      }
      if (data && data.value && parseInt(data.value) < 0) {
        dataErrors.value = 'pri_dom.field-not-negative';
        dataArrayErrors[index] = dataErrors
      }

      if (!data || data.type  === undefined || data.type === null) {
        dataErrors.type = 'pri_dom.field-is-required';
        dataArrayErrors[index] = dataErrors
      }
      
      if (!data || data.type_value  === undefined || data.type_value === '') {
        dataErrors.type_value = 'pri_dom.field-is-required';
        dataArrayErrors[index] = dataErrors
      }
      if (data && data.type_value && isNaN(data.type_value)) {
        dataErrors.type_value = 'pri_dom.field-is-number';
        dataArrayErrors[index] = dataErrors
      }
      if (data && data.type_value && parseInt(data.type_value) < 0) {
        dataErrors.type_value = 'pri_dom.field-not-negative';
        dataArrayErrors[index] = dataErrors
      }
      if (data && data.type && parseInt(data.type) === 1 && parseInt(data.type_value) > 100) {
        dataErrors.type_value = 'pri_dom.field-must-not-be-larger-than-100';
        dataArrayErrors[index] = dataErrors
      }

      if (data && data.lead_time_from && isNaN(data.lead_time_from)) {
        dataErrors.lead_time_from = 'pri_dom.field-is-number';
        dataArrayErrors[index] = dataErrors
      }
      if (data && data.lead_time_from && parseInt(data.lead_time_from) < 0) {
        dataErrors.lead_time_from = 'pri_dom.field-not-negative';
        dataArrayErrors[index] = dataErrors
      }

      if (data && data.lead_time_to && isNaN(data.lead_time_to)) {
        dataErrors.lead_time_to = 'pri_dom.field-is-number';
        dataArrayErrors[index] = dataErrors
      }
      if (data && data.lead_time_to && parseInt(data.lead_time_to) < 0) {
        dataErrors.lead_time_to = 'pri_dom.field-not-negative';
        dataArrayErrors[index] = dataErrors
      }
      if (data && data.lead_time_to && data.lead_time_from && parseInt(data.lead_time_to) !== 0 && parseInt(data.lead_time_to) < parseInt(data.lead_time_from)) {
        dataErrors.lead_time_to = 'pri_dom.validate-to-not-less-than-from';
        dataArrayErrors[index] = dataErrors
      }
    })
    if (dataArrayErrors.length) {
      errors.data = dataArrayErrors
    }
  }
  
  return errors
}

export default validate