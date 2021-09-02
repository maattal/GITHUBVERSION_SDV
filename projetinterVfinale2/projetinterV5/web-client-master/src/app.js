import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import "./config/style-reset.scss"

import ProtectedRoute from "components/ProtectedRoute"
import Header from "components/Header"
import Home from "pages/Home"
import Login from "pages/Login"
import Register from "pages/Register"
import Blog from "pages/Blog"
import WritePost from "pages/WritePost"
import BlogPost from "pages/BlogPost"
import Dashboard from "pages/Dashboard"
import ScheduleDelivery from "pages/ScheduleDelivery"
import Chat from "pages/Chat"
import Deliverers from "pages/Deliverers"
import DispatchDelivery from "pages/DispatchDelivery"
import Diagrams from "pages/Diagrams"

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <ProtectedRoute path="/blog" component={Blog} exact />
      <ProtectedRoute path="/write-post" component={WritePost} exact />
      <ProtectedRoute path="/blog/:id" component={BlogPost} exact />
      <ProtectedRoute path="/dashboard" component={Dashboard} exact />
      <ProtectedRoute
        path="/delivery/schedule"
        component={ScheduleDelivery}
        exact
      />
      <ProtectedRoute path="/chat" component={Chat} exact />
      <ProtectedRoute path="/deliverers" component={Deliverers} exact />
      <ProtectedRoute
        path="/delivery/dispatch"
        component={DispatchDelivery}
        exact
      />
      <ProtectedRoute path="/delivery/diagrams" component={Diagrams} exact />
    </Switch>
  </BrowserRouter>
)

render(<App />, document.querySelector("#root"))
