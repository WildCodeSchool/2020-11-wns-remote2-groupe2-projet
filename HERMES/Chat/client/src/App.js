import React from "react";
import { Container } from "@chakra-ui/react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
import ApolloProvider from "./ApolloProvider";
import { BrowserRouter, Switch } from "react-router-dom";
import Footer from "./pages/home/Footer";

import { AuthProvider } from "./context/auth";
import { MessageProvider } from "./context/message";
import DynamicRoute from "./util/DynamicRoute";
import { ContextProvider } from "./context/socketContext";
import page404 from "./pages/page404";
import page500 from "./pages/page500";

function App() {
	return (
		<Container
			maxW="100vw"
			minHeight="100vh"
			backgroundColor="#39414f"
			display="flex"
			justifyContent="center"
		>
			<ApolloProvider>
				<AuthProvider>
					<MessageProvider>
						<ContextProvider>
							<BrowserRouter>
								<Switch>
									<DynamicRoute exact path={"/"} component={Home} authenticated />
									<DynamicRoute path={"/login"} component={Login} guest />
									<DynamicRoute path={"/register"} component={Register} guest />
									<DynamicRoute path={"*"} component={page404} guest />
									<DynamicRoute path={"/page500"} component={page500} guest />
								</Switch>
							</BrowserRouter>
						</ContextProvider>
					</MessageProvider>
				</AuthProvider>
			</ApolloProvider>
			<Footer />
		</Container >
	);
}

export default App;
