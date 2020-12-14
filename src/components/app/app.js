import React from 'react'

import generateId from './../../uuid'
import useForm from './../../hooks/use-form'
import InputText from './../../components/input-text/input-text'
import Form from './../../components/form/form'
import { validateRequired, validateEmail, validateMinLength } from './../../components/form/validators'

const App = () => {
  const formId = generateId()
  const { formState, resetError, submitForm, setFormState } = useForm(formId)

  const onFormSubmit = () => {
    const { data, isValid } = submitForm()
    if (isValid) {
      console.log(`form data`, data)
    }
  }

  console.log(`formState`, formState)

  return (
    <Form onSubmit={onFormSubmit} onInput={resetError} onBlur={setFormState} id={formId}>
      <InputText
        label="email"
        name="email"
        validators={[validateRequired(), validateEmail()]}
        errorMsg={formState.email?.errorMsg}
      />

      <InputText
        label="password"
        name="password"
        type="password"
        validators={[validateRequired(), validateMinLength(8)]}
        errorMsg={formState.password?.errorMsg}
      />

      <button type="submit">Log In</button>
    </Form>
  )
}

export default App
