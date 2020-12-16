import React from 'react';
import {Container} from 'react-bootstrap';
import './App.scss';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ApolloProvider from "./ApolloProvider";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <ApolloProvider>
            <BrowserRouter>
            <Container className="pt-5">
                <Switch>
                <Route exact path={"/"} component={Home} />
                <Route path={"/login"} component={Login} />
                <Route path={"/register"} component={Register} />
                </Switch>
            </Container>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
