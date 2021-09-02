import React from "react"
import { Route, useHistory } from "react-router-dom"

const ProtectedRoute = (props) => {
  const history = useHistory()

  if (sessionStorage.getItem("token") === null) {
    history.push("/login")
    return <></>
  }

  return <Route {...props} />
}

export default ProtectedRoute
