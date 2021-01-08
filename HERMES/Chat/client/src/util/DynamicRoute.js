import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuthState } from '../context/auth'

export default function DynamicRoute (props) {
  const { user } = useAuthState()
  if (props.authenticated && !user) {
    return <Redirect to='/login' />
  } else if (props.guest && user) {
    return <redirect to='/' />
  } else {
    return <Route component={props.component} {...props} />
  }
}
