import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import BasicFormPage from './../../pages/basic-form-page'
import TwoFormsPage from './../../pages/two-forms-page'
import PairedValidationPage from './../../pages/paired-validation-page'
import DependentFieldsPage from './../../pages/dependent-fields-page'
import Nav from './../nav/nav'

const App = () => {
  return (
    <>
      <Router>
        <Nav />

        <Switch>
          <Route path="/two-forms">
            <TwoFormsPage />
          </Route>

          <Route path="/paired-validation">
            <PairedValidationPage />
          </Route>

          <Route path="/dependent-fields">
            <DependentFieldsPage />
          </Route>

          <Route path="/">
            <BasicFormPage />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
export default App
