//@ts-nocheck
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client"
import { getMainDefinition } from "@apollo/client/utilities"
import { WebSocketLink } from "@apollo/link-ws"
const serverUrl = process.env.NODE_ENV == "development" ? "localhost:9000" : "ec2-13-235-79-1.ap-south-1.compute.amazonaws.com:9000"

const wsLink = new WebSocketLink({
    uri: `ws://${serverUrl}`,
    options: {
        reconnect: true,
        connectionParams: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    },
})

const httpLink = new HttpLink({
    uri: `http://${serverUrl}`,
    headers: {
        authorization: localStorage.getItem("authToken")
            ? `Bearer ${localStorage.getItem("authToken")}`
            : undefined,
    },
})

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === "OperationDefinition" && definition.operation === "subscription"
    },
    wsLink,
    httpLink
)

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            errorPolicy: "all",
        },
        mutate: {
            errorPolicy: "all",
        },
        watchQuery: {
            errorPolicy: "all",
        },
    },
    link: splitLink,
})
