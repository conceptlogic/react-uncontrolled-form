import React from 'react'

import generateId from './../../uuid'
import useForm from './../../hooks/use-form'

import InputText from './../../components/input-text/input-text'
import Form from './../../components/form/form'
import { validateRequired, validateEmail } from './../form/validators'

const MixedFieldsForm = () => {
  const formId = generateId()

  const { formState, submitForm, setFormState, resetError, setFieldState } = useForm(formId)

  const onSubmitForm = () => {
    const { data, isValid } = submitForm()
    if (isValid) {
      console.log(`form data`, data)
    }
  }

  return (
    <Form onSubmit={onSubmitForm} onInput={resetError} onBlur={setFormState} id={formId}>
      <h3>Sign Up</h3>

      <InputText
        label="email"
        name="email"
        validators={[validateRequired(), validateEmail()]}
        errorMsg={formState.email?.errorMsg}
      />

      <InputText
        label="@username"
        name="username"
        validators={[validateRequired()]}
        onChange={event => {
          setFieldState(event)
          console.log(`check if username @${event.target.value} is available...`)
        }}
        errorMsg={formState.username?.errorMsg}
        value={formState.username?.value}
      />

      <button type="submit">Get Started</button>
    </Form>
  )
}

export default MixedFieldsForm
