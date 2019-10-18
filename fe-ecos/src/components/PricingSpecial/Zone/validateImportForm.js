import { MAX_SIZE_UPLOAD } from "../../../constants/defaultValues";

const fileMaxSize = MAX_SIZE_UPLOAD * 1000 * 1000; // 20MB

export default function validate (values) {
  let errors = {};

  if (!values.import_file) {
    errors.import_file = 'pri_special.validate-file-requied';
  } else {
    let file = values.import_file;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      errors.import_file = 'pri_special.validate-file-must-be-excel';
    } else if (file.size > fileMaxSize) {
      errors.import_file = 'pri_special.validate-file-exceed-max-size';
    }
  }

  return errors;
}