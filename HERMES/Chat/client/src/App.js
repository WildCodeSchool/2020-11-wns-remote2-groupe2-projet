import React from "react";
import { Container } from "@chakra-ui/react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
import ApolloProvider from "./ApolloProvider";
import { BrowserRouter, Switch } from "react-router-dom";

import { AuthProvider } from "./context/auth";
import { MessageProvider } from "./context/message";
import DynamicRoute from "./util/DynamicRoute";

function App() {
	return (
		<Container
			maxWidth="100%"
			minHeight="100vh"
			backgroundImage="url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80')"
			backgroundRepeat="no-repeat"
			backgroundPosition="center"
			backgroundColor="#e3decb"
			size="lg"
		>
			<ApolloProvider>
				<AuthProvider>
					<MessageProvider>
						<BrowserRouter>
							<Container>
								<Switch>
									<DynamicRoute
										exact
										path={"/"}
										component={Home}
										authenticated
									/>
									<DynamicRoute path={"/login"} component={Login} guest />
									<DynamicRoute path={"/register"} component={Register} guest />
								</Switch>
							</Container>
						</BrowserRouter>
					</MessageProvider>
				</AuthProvider>
			</ApolloProvider>
		</Container>
	);
}

export default App;
