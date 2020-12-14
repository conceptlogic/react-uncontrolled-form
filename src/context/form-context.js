import React from 'react'

const Context = React.createContext()

export const FormProvider = Context.Provider

export const useFormContext = () => React.useContext(Context)
