import {
  isNil as _isNil,
  isFinite as _isFinite,
  isInteger as _isInteger,
  isBoolean as _isBoolean,
  isString as _isString,
  isEqual as _isEqual,
  gte as _gte,
  lte as _lte,
} from 'lodash'
import floatingPointRegex from 'floating-point-regex'

const isUrl = string => {
  try {
    new URL(string)
  } catch (e) {
    return false
  }

  return true
}

/**
 *
 * Given a value and an array of validators, returns the error message from the first failing
 * validation, or null if all validations pass
 *
 * @param {string} value
 * @param {Function[]} validators Array of validator functions
 * @returns {string} Error message or null
 */
const validateField = (value, validators = []) => {
  const errors = validators.map(validator => validator(value)).filter(result => !_isNil(result))

  return errors.length ? errors[0] : null
}

/**
 *
 * Base signature for inner function returned by validators
 * (value: any) => string
 *
 * @param {any} value Input value to be validated, any valid JSON data type
 * @returns {string} Error message supplied by the outer function
 */

/**
 *
 * Passes if the value is not empty
 *
 * @param {string} msg
 * @returns {Function}
 */
const validateRequired = (msg = 'Required field') => {
  return value => {
    let isEmpty

    if (_isString(value)) {
      isEmpty = value.trim().length < 1
    }

    // handle checkboxes
    // use form hook submits the boolean checked attr in place of true/false string value for checkboxes
    if (_isBoolean(value)) {
      isEmpty = !value
    }

    return isEmpty ? msg : null
  }
}

/**
 *
 * Passes if the value is a finite number
 *
 * @param {string} msg
 * @returns {Function}
 */
const validateNumber = (msg = 'Input must be a number') => {
  return value => {
    const isValid = _isFinite(Number(value)) // try casting the value to a number

    return !isValid ? msg : null
  }
}

/**
 *
 * Passes if the value is an integer
 *
 * @param {string} msg
 * @returns {Function}
 */
const validateInteger = (msg = 'Input must be an integer') => {
  return value => {
    const isValid = _isInteger(Number(value))

    return !isValid ? msg : null
  }
}

/**
 *
 * Passes if the value is a floating point number
 *
 * @param {string} msg
 * @returns {Function}
 */
const validateFloat = (msg = 'Input must be a floating point number') => {
  return value => {
    const isValid = floatingPointRegex().test(value)

    return !isValid ? msg : null
  }
}

/**
 *
 * Passes if the value is a boolean, string true/false, or 0/1
 *
 * @param {string} msg
 * @returns {Function}
 */
const validateBoolean = (msg = 'Input must be a boolean value') => {
  const boolStrings = ['true', 'false', '0', '1']

  return value => {
    const isValid =
      _isBoolean(value) ||
      (_isString(value) && boolStrings.some(bool => bool === value.toLowerCase())) ||
      value === 0 ||
      value === 1

    return !isValid ? msg : null
  }
}

/**
 *
 * Passes if the value matches the provided regular expression
 *
 * @param {object} regex Regular expression to match against
 * @param {string} msg
 * @returns {Function}
 */
const validatePattern = (regex, msg = 'Invalid pattern') => {
  return value => {
    return !regex.test(value) ? msg : null
  }
}

/**
 *
 * Passes if the input value and otherValue are not equal
 *
 * @param {any} otherValue
 * @param {string} msg
 */
const validateNotEqual = (otherValue, msg) => {
  return value => {
    return _isEqual(value, otherValue) ? msg : null
  }
}

const validateEmail = () => {
  // https://stackoverflow.com/a/9204568
  return validatePattern(/\S+@\S+\.\S+/, 'Input does not appear to be an email address')
}

const validateMinLength = length => {
  return value => {
    return value.length < length ? `Input must be at least ${length} characters` : null
  }
}

/**
 *
 * Passes if the value is in the provided range
 *
 * @param {string} msg
 * @returns {Function}
 */
const validateInRange = (min, max, msg = `Value must be between ${min} and ${max}`) => {
  return value => {
    return _gte(Number(value), min) && _lte(Number(value), max) ? null : msg
  }
}

const validateUrl = (msg = `Value must be a URL`) => {
  return value => {
    return !isUrl(value) ? msg : null
  }
}

export {
  validateRequired,
  validateField,
  validateNumber,
  validateInteger,
  validateFloat,
  validatePattern,
  validateBoolean,
  validateNotEqual,
  validateEmail,
  validateMinLength,
  validateInRange,
  validateUrl,
}
