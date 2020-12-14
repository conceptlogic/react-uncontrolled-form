import React from 'react'
import pt from 'prop-types'

import useValidatorLookup from './../../hooks/use-validator-lookup'
import uuid from './../../uuid'

const InputText = ({
  onChange,
  onBlur,
  disabled,
  placeholder,
  value,
  defaultValue,
  label,
  name,
  errorMsg,
  spellCheck = false,
  autoComplete = 'off',
  validators,
  readOnly,
  clear,
  autoFocus,
  type = 'text',
}) => {
  const id = uuid()
  const { addValidators } = useValidatorLookup(id)
  addValidators(validators)

  const controlled = value || value === ''
  const attrs = {
    id,
    disabled,
    placeholder,
    onBlur,
    name,
    autoComplete,
    spellCheck,
    readOnly,
    autoFocus,
    type,
    className: errorMsg ? 'errorMsg' : null,
  }

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}

      {controlled && <input value={value} onChange={onChange} {...attrs} />}

      {/* key forces input to re-render when defaultValue has changed */}
      {!controlled && <input defaultValue={defaultValue} {...attrs} key={defaultValue} />}

      {value && clear && <span onClick={clear}>x</span>}

      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </div>
  )
}

InputText.propTypes = {
  onChange: pt.func,
  onBlur: pt.func,
  disabled: pt.bool,
  placeholder: pt.string,
  value: pt.string,
  defaultValue: pt.string,
  label: pt.string,
  name: pt.string.isRequired,
  errorMsg: pt.string,
  spellCheck: pt.bool,
  autoComplete: pt.oneOf(['off', 'on']),
  validators: pt.arrayOf(pt.func),
  readOnly: pt.bool,
  clear: pt.func,
  autoFocus: pt.bool,
  type: pt.string,
}

export default InputText
