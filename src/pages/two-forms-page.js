import React from 'react'

import generateId from './../uuid'
import useForm from './../hooks/use-form'
import InputText from './../components/input-text/input-text'
import Form from './../components/form/form'
import { validateRequired, validateEmail, validateMinLength } from './../components/form/validators'

const TwoFormsPage = () => {
  const loginId = generateId()
  const secondId = generateId()

  const { formState: firstState, submitForm: submitFirst, setFormState: setFirst, resetError: resetFirst } = useForm(
    loginId
  )
  const {
    formState: secondState,
    submitForm: submitSecond,
    setFormState: setSecond,
    resetError: resetSecond,
  } = useForm(secondId)

  const onSubmitFirst = () => {
    const { data, isValid } = submitFirst()
    if (isValid) {
      console.log(`form data`, data)
    }
  }

  const onSubmitSecond = () => {
    const { data, isValid } = submitSecond()
    if (isValid) {
      console.log(`form data`, data)
    }
  }

  console.log(`formState`, firstState)

  return (
    <>
      <Form onSubmit={onSubmitFirst} onInput={resetFirst} onBlur={setFirst} id={loginId}>
        <h3>Login</h3>

        <InputText
          label="email"
          name="email"
          validators={[validateRequired(), validateEmail()]}
          errorMsg={firstState.email?.errorMsg}
        />

        <InputText
          label="password"
          name="password"
          type="password"
          validators={[validateRequired(), validateMinLength(8)]}
          errorMsg={firstState.password?.errorMsg}
        />

        <button type="submit">Log In</button>
      </Form>

      <Form onSubmit={onSubmitSecond} onInput={resetSecond} onBlur={setSecond} id={secondId}>
        <h3>Login</h3>

        <InputText
          label="email"
          name="email"
          validators={[validateRequired(), validateEmail()]}
          errorMsg={secondState.email?.errorMsg}
        />

        <InputText
          label="new password"
          name="password"
          type="password"
          validators={[validateRequired(), validateMinLength(8)]}
          errorMsg={secondState.password?.errorMsg}
        />

        <button type="submit">Log In</button>
      </Form>
    </>
  )
}

export default TwoFormsPage
