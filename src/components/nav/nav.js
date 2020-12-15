import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Basic Form</Link>
        </li>
        <li>
          <Link to="/two-forms">Multiple Forms</Link>
        </li>
        <li>
          <Link to="/paired-validation">Paired Validation</Link>
        </li>
        <li>
          <Link to="/mixed-fields">Controlled & Uncontrolled</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
