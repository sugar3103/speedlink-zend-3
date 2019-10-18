import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const FileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps,
  },
  meta: { touched, error },
  intl: { messages },
  ...props,
}) => (
    <Fragment>
      <div className="form__form-group-field">
        <div className="input-group">
          <div className="custom-file">
            <input
              onChange={adaptFileEventToValue(onChange)}
              onBlur={adaptFileEventToValue(onBlur)}
              type="file"
              {...inputProps}
              {...props}
            />
            <label className="custom-file-label" htmlFor="inputImport">{messages['choose-file']}</label>
          </div>
        </div>
      </div>
      {touched && error && <span className="form__form-group-error">{messages[error]}</span>}
    </Fragment>
  )
export default injectIntl(FileInput);