import React from 'react';
import {Container} from 'react-bootstrap';
import './App.scss';
import Register from "./pages/Register";
import ApolloProvider from "./ApolloProvider";

function App() {
    return (
        <ApolloProvider>
            <Container className="pt-5">
                <Register/>
            </Container>
        </ApolloProvider>
    );
}

export default App;
