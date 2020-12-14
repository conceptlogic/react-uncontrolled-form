import { useEffect } from 'react'

const validatorLookup = {}

/**
 *
 * @param {{ validators: Function[], uuid: string }}
 */
const addValidators = uuid => {
  return validators => {
    if (validators?.length) {
      validatorLookup[uuid] = validators
    }
  }
}

/**
 *
 * @param {string} uuid
 * @returns {Function[]} Array of validator functions
 */
const getValidators = uuid => {
  return validatorLookup[uuid]
}

const removeValidators = uuid => {
  Reflect.deleteProperty(validatorLookup, uuid)
}

/**
 *
 * Adds validators to a lookup object (and removes them on cleanup) using the uuid as the key
 *
 * @param {string} uuid
 * @returns {{ addValidators: Function, getValidators: Function }}
 */
const useValidatorLookup = uuid => {
  useEffect(() => {
    return function cleanup() {
      removeValidators(uuid)
    }
  }, [uuid])

  return {
    addValidators: addValidators(uuid),
    getValidators,
  }
}

export default useValidatorLookup
