import React from 'react'
import pt from 'prop-types'
import { isString as _isString } from 'lodash'

import useValidatorLookup from './../../hooks/use-validator-lookup'
import uuid from './../../uuid'

const InputSelect = ({
  onChange,
  onBlur,
  disabled,
  value,
  label,
  name,
  errorMsg,
  validators,
  options = [],
  placeholder = 'Select...',
}) => {
  const id = uuid()
  const { addValidators } = useValidatorLookup(id)
  addValidators(validators)

  const attrs = {
    id,
    disabled,
    onBlur,
    onChange,
    name,
    value,
    className: errorMsg ? 'errorMsg' : null,
  }

  let selectOptions = [
    <option key="placeholder-opt" value="placeholder" disabled>
      {placeholder}
    </option>,
  ]

  options.forEach(option => {
    const o = _isString(option)
      ? {
          value: option,
          text: option,
        }
      : option

    selectOptions.push(
      <option value={o.value} key={o.value} disabled={o.disabled}>
        {o.text}
      </option>
    )
  })

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}

      <div>
        <select {...attrs}>{selectOptions}</select>

        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      </div>
    </div>
  )
}

InputSelect.propTypes = {
  onChange: pt.func,
  onBlur: pt.func,
  disabled: pt.bool,
  value: pt.string,
  label: pt.string,
  name: pt.string.isRequired,
  errorMsg: pt.string,
  validators: pt.arrayOf(pt.func),
  options: pt.oneOfType([
    pt.arrayOf(pt.string),
    pt.arrayOf(
      pt.shape({
        text: pt.string.isRequired,
        value: pt.string.isRequired,
        disabled: pt.bool,
      })
    ),
  ]).isRequired,
  placeholder: pt.string,
}

export default InputSelect
