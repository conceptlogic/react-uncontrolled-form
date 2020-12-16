import React, { useState } from 'react'

import generateId from './../../uuid'
import useForm from './../../hooks/use-form'
import InputText from './../../components/input-text/input-text'
import Form from './../../components/form/form'
import { validateRequired, validateMinLength, validateNotEqual } from './../../components/form/validators'

const ChangePasswordForm = () => {
  const [success, setSuccess] = useState()
  const formId = generateId()
  const { formState, submitForm, setFormState, resetError } = useForm(formId)

  const onSubmitFirst = () => {
    const { data, isValid } = submitForm()
    if (isValid) {
      console.log(`form data`, data)
      setSuccess(true)
    }
  }

  console.log(`formState`, formState)

  return (
    <Form onSubmit={onSubmitFirst} onInput={resetError} onBlur={setFormState} id={formId}>
      <h3>Change Password</h3>

      <InputText
        label="current password"
        name="current"
        validators={[validateRequired()]}
        errorMsg={formState.current?.errorMsg}
      />

      <InputText
        label="new password"
        name="new"
        validators={[
          validateRequired(),
          validateMinLength(8),
          validateNotEqual(formState.current?.value, `Current password and new password must be different`),
        ]}
        errorMsg={formState.new?.errorMsg}
      />

      <button type="submit">Save</button>

      {success && <p style={{ color: 'green' }}>Success!</p>}
    </Form>
  )
}

export default ChangePasswordForm
