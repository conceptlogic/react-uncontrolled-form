import React, { forwardRef } from 'react'
import pt from 'prop-types'

const Form = forwardRef(({ children, onSubmit, id, onBlur, onInput }, ref) => (
  <form
    onBlur={onBlur}
    onInput={onInput}
    id={id}
    ref={ref}
    onSubmit={event => {
      event.preventDefault()
      onSubmit(event)
    }}
    data-testid="form"
    noValidate>
    {children}
  </form>
))

Form.displayName = 'Form'

Form.propTypes = {
  children: pt.oneOfType([pt.element, pt.arrayOf(pt.element)]).isRequired,
  onSubmit: pt.func.isRequired,
  onBlur: pt.func,
  id: pt.string,
  onInput: pt.func.isRequired,
}

export default Form
