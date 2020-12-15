import { useReducer } from 'react'
import { produce } from 'immer'
import { every as _every, isNil as _isNil, isEmpty as _isEmpty } from 'lodash'

import { validateField as validate } from './../components/form/validators'
import useValidatorLookup from './use-validator-lookup'

/**
 *
 * Convert form state to key/value pairs for submission
 */
const getJson = fields => {
  return Object.fromEntries(fields.map(field => [field.name, field.value]))
}

/**
 *
 * Get validation errors
 */
const getErrors = (fields, getValidators) => {
  return fields.map(field => {
    return {
      name: field.name,
      errorMsg: validate(field.value, getValidators(field.id)),
    }
  })
}

/**
 *
 * Get form state from DOM, excluding any disabled fields and those without a name attr
 *
 * @param {string} formId
 */
const getFields = formId => {
  const elements = [...document.getElementById(formId).elements]

  return elements
    .filter(({ disabled, name }) => {
      return !disabled && name
    })
    .map(el => {
      let { name, value, id, type } = el

      // ignore select placeholder
      if (type === 'select' && value === 'placeholder ') {
        value = ''
      }

      return {
        name,
        id,
        value: getValue(el),
        errorMsg: null,
      }
    })
}

const actions = {
  UPDATE_FIELDS: Symbol(),
  DISPLAY_ERRORS: Symbol(),
  REMOVE_FIELDS: Symbol(),
  RESET_ERROR: Symbol(),
}

// update one or more fields
const handleUpdateFields = ({ payload, draft }) => {
  payload.fields.forEach(field => {
    const { name, value, errorMsg = null, disabled } = field
    const draftField = draft[name]

    if (draftField) {
      // update existing entry in draft
      draftField.errorMsg = errorMsg
      draftField.disabled = disabled ?? draftField.disabled
      draftField.value = value ?? draftField.value
    } else {
      // add new entry
      draft[name] = {
        errorMsg,
        disabled,
        value,
      }
    }
  })
}

const handleDisplayErrors = ({ payload, draft }) => {
  payload.errors.forEach(({ name, errorMsg }) => {
    if (draft[name]) {
      // update existing entry in draft
      draft[name].errorMsg = errorMsg
    } else {
      // add new entry
      draft[name] = {
        errorMsg,
      }
    }
  })
}

const handleRemoveFields = ({ payload, draft }) => {
  const { fieldNames } = payload

  fieldNames.forEach(name => {
    delete draft[name]
  })
}

const handleResetError = ({ payload, draft }) => {
  if (draft[payload.fieldName]) {
    draft[payload.fieldName].errorMsg = null
  }
}

// determine which element attr to use as the input's value
const getValue = el => {
  return el.type === 'checkbox' ? el.checked : el.value
}

const useForm = formId => {
  const { getValidators } = useValidatorLookup()

  // use Immer's produce method to immutably create the next state, via updates to its draft object
  // see https://immerjs.github.io/immer/docs/produce
  const reducer = produce((draft, { type, payload }) => {
    switch (type) {
      case actions.UPDATE_FIELDS:
        handleUpdateFields({ payload, draft })
        break
      case actions.DISPLAY_ERRORS:
        handleDisplayErrors({ payload, draft })
        break
      case actions.REMOVE_FIELDS:
        handleRemoveFields({ payload, draft })
        break
      case actions.RESET_ERROR:
        handleResetError({ payload, draft })
        break
    }
  })

  const [formState, dispatch] = useReducer(reducer, {}) // start with empty initial state

  const setFormState = event => {
    const { name, id } = event?.target
    const errorMsg = validate(getValue(event?.target), getValidators(id))

    const fields = getFields(formId).map(field => {
      // add error message for the current field
      if (field.name === name && errorMsg) {
        field.errorMsg = errorMsg
      }

      // preserve any existing error messages on other fields
      if (formState[field.name]?.errorMsg) {
        field.errorMsg = formState[field.name]?.errorMsg
      }

      return field
    })

    dispatch({
      type: actions.UPDATE_FIELDS,
      payload: {
        fields,
      },
    })
  }

  /**
   *
   * @param {object} event Browser event
   * @param {{ name, value, errorMsg, disabled }[]} otherFields Array of additional fields to update
   */
  const setFieldState = (event, { otherFields = [] } = {}) => {
    const { name } = event?.target

    dispatch({
      type: actions.UPDATE_FIELDS,
      payload: {
        fields: [
          {
            name,
            value: getValue(event?.target),
          },
          ...otherFields,
        ],
      },
    })
  }

  const validateField = event => {
    const { name, id } = event?.target
    const value = getValue(event?.target)
    const errorMsg = validate(value, getValidators(id))

    dispatch({
      type: actions.UPDATE_FIELDS,
      payload: {
        fields: [
          {
            name,
            errorMsg,
            value,
          },
        ],
      },
    })

    // return value is used by the expression editor
    if (errorMsg) {
      return errorMsg
    }
  }

  const resetError = event => {
    if (formState[event.target.name]?.errorMsg) {
      dispatch({
        type: actions.RESET_ERROR,
        payload: {
          fieldName: event.target.name,
        },
      })
    }
  }

  /**
   *
   * Returns form data as key value pairs if all field validations pass
   *
   * @returns {{ isValid: boolean, data: object }}
   */
  const submitForm = () => {
    // refetch field values from the DOM
    // ensures that any fields rendered since the last form state update get their values added now for validation/submission
    const fields = getFields(formId)

    const validatedFields = getErrors(fields, getValidators)
    if (_every(validatedFields, field => _isNil(field.errorMsg))) {
      return { isValid: true, data: getJson(fields) }
    } else {
      dispatch({
        type: actions.DISPLAY_ERRORS,
        payload: {
          errors: validatedFields,
        },
      })

      return { isValid: false }
    }
  }

  // set initial state
  if (_isEmpty(formState)) {
    setTimeout(() => {
      const formEl = document.getElementById(formId)

      if (formEl) {
        dispatch({
          type: actions.UPDATE_FIELDS,
          payload: {
            fields: getFields(formId),
          },
        })
      }
    }, 0) // delay for the form to render
  }

  return {
    formState,
    setFormState,
    setFieldState,
    validateField,
    resetError,
    submitForm,
  }
}

export default useForm
