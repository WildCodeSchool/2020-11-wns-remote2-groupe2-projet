import React from "react";
import { Container } from "react-bootstrap";
import "./App.scss";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ApolloProvider from "./ApolloProvider";
import { BrowserRouter, Switch } from "react-router-dom";

import { AuthProvider } from "./context/auth";
import DynamicRoute from "./util/DynamicRoute"

function App() {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Container className="pt-5">
            <Switch>
              <DynamicRoute exact path={"/"} component={Home} authenticated />
              <DynamicRoute path={"/login"} component={Login} guest />
              <DynamicRoute path={"/register"} component={Register} guest />
            </Switch>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
