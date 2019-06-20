import { Platform } from 'react-native';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

export function makeClient() {
  const cache = new InMemoryCache({
    dataIdFromObject: object => object.nodeId,
  });

  const logoutOn401ErrorLink = onError(({ networkError }) => {
    if (networkError.status === 401) {
      // Logout
    }
  });

  const csrfMiddlewareLink = new ApolloLink((operation, forward) => {
    if (typeof window.CSRF_TOKEN === "string") {
      operation.setContext({
        headers: {
          "X-Token": window.CSRF_TOKEN,
        },
      });
    }
    return forward(operation);
  });

  const httpLinkOpts = Platform.select({
    android: {
      uri: "http://192.168.0.18:5678/graphql",
      credentials: "same-origin",
    },
    ios: {
      uri: "http://192.168.0.18:5678/graphql",
      credentials: "same-origin",
    },
    web: {
      uri: "http://localhost:5678/graphql",
      credentials: "omit",
    }
  });

  const httpLink = new HttpLink(httpLinkOpts);
  const link = ApolloLink.from([
    logoutOn401ErrorLink,
    csrfMiddlewareLink,
    httpLink,
  ]);

  const resolvers = {
    Mutation: {
      // eslint-disable-next-line no-shadow
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        cache.writeData({ data: { isConnected } });
        return null;
      },
    },
  };

  return new ApolloClient({
    link,
    cache,
    resolvers,
  });
}
