import { customAlphabet } from 'nanoid'
import { sample as _sample } from 'lodash'

// using a custom alphabet to exclude hyphens so they can be reserved for splitting on
const l = `abcdefghijklmnopqrstuvwxyz`
const a = `${l}0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`

/**
 *
 * Generates a UUID that is also usable as the ID attribute of a DOM element
 *
 * @param {number} length Length of the generated UUID
 * @returns {string}
 */

const generateId = (length = 16) => {
  // start with an alpha character for DOM element IDs
  const prefix = _sample(l)
  return `${prefix}${customAlphabet(a, length - 1)()}`
}

export default generateId
