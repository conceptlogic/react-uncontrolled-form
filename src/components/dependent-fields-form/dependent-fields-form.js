import React from 'react'

import generateId from './../../uuid'
import useForm from './../../hooks/use-form'
import InputSelect from './../../components/input-select/input-select'
import InputText from './../../components/input-text/input-text'
import Form from './../../components/form/form'

const DependentFieldsForm = () => {
  const formId = generateId()

  const { formState, submitForm, setFormState, resetError, setFieldState } = useForm(formId)

  const onSubmitForm = () => {
    const { data, isValid } = submitForm()
    if (isValid) {
      console.log(`form data`, data)
    }
  }

  console.log(`formState`, formState)

  const typeValue = formState.typeSelect?.value

  const getValueInput = type => {
    switch (type) {
      case 'Boolean':
        return <InputSelect label="Boolean" options={['true', 'false']} name="typeValue" />
      case 'String':
        return <InputText label="String" name="typeValue" />
      case 'Integer':
      case 'Float':
        return <InputText label={formState.typeSelect?.value} name="typeValue" type="number" defaultValue="5" />
    }
  }

  return (
    <Form onSubmit={onSubmitForm} onInput={resetError} onBlur={setFormState} id={formId}>
      <InputSelect
        label="data type"
        options={['Boolean', 'String', 'Integer', 'Float']}
        name="typeSelect"
        onChange={setFieldState}
        value={typeValue || 'Integer'}
      />

      {getValueInput(typeValue)}
    </Form>
  )
}

export default DependentFieldsForm
