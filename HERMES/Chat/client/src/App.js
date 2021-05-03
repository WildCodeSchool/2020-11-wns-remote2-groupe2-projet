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
			maxW="100vw"
			minHeight="100vh"
			backgroundColor="#39414f"
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
		>
			<ApolloProvider>
				<AuthProvider>
					<MessageProvider>
						<BrowserRouter>
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
						</BrowserRouter>
					</MessageProvider>
				</AuthProvider>
			</ApolloProvider>
		</Container>
	);
}

export default App;
