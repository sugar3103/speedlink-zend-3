const validate = values => {
  const errors = {}
  if (values.vas && values.vas.length) {
    const vasArrayErrors = []
    values.vas.forEach((vas, vasIndex) => {
      const vasErrors = {}
      if (!vas || !vas.name) {
        vasErrors.name = 'pri_dom.validate-vas-name-required';
        vasArrayErrors[vasIndex] = vasErrors
      }
      if (!vas || !vas.formula) {
        vasErrors.formula = 'pri_dom.validate-vas-formula-required';
        vasArrayErrors[vasIndex] = vasErrors
      }
      if (vas && (vas.type !== undefined || vas.type !== '') && vas.type === 0 && (vas.min === undefined || vas.min === '') ) {
        vasErrors.min = 'pri_dom.validate-vas-min-required';
        vasArrayErrors[vasIndex] = vasErrors
      }
      if (vas && vas.type && vas.spec.length === 0) {
        vasErrors.spec = 'pri_dom.validate-vas-spec-required';
        vasArrayErrors[vasIndex] = vasErrors
      }
    })
    if (vasArrayErrors.length) {
      errors.vas = vasArrayErrors
    }
  }
  return errors
}

export default validate