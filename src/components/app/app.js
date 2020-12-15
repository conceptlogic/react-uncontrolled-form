import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import FormPage from './../../pages/form-page'
import TwoFormsPage from './../../pages/two-forms-page'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/two-forms">
          <TwoFormsPage />
        </Route>

        <Route path="/">
          <FormPage />
        </Route>
      </Switch>
    </Router>
  )
}
export default App
