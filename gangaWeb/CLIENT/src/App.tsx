import { ApolloProvider } from "@apollo/client"
import React from "react"
import { client } from "./contexts/apollo"
import MainRouter from "./modules/Main"
import { hot } from "react-hot-loader"

export default hot(module)(() => (
    <ApolloProvider client={client}>
        <MainRouter />
    </ApolloProvider>
))
