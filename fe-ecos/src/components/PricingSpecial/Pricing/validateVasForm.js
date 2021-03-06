const validate = values => {
  const errors = {}
  if (values.vas && values.vas.length) {
    const vasArrayErrors = []
    values.vas.forEach((vas, vasIndex) => {
      const vasErrors = {}
      if (!vas || !vas.name) {
        vasErrors.name = 'pri_special.validate-vas-name-required';
        vasArrayErrors[vasIndex] = vasErrors
      }
      if (!vas || !vas.formula) {
        vasErrors.formula = 'pri_special.validate-vas-formula-required';
        vasArrayErrors[vasIndex] = vasErrors
      }
      if (vas && (vas.type !== undefined || vas.type !== '') && vas.type === 0 && (vas.min === undefined || vas.min === '') ) {
        vasErrors.min = 'pri_special.validate-vas-min-required';
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