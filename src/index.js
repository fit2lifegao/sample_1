import Raven from 'raven-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';
import { split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { setContext } from 'apollo-link-context';
import { getMainDefinition, toIdValue } from 'apollo-utilities';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { initializeIcons } from 'office-ui-fabric-react/lib-commonjs/Icons';

import App from './App';
import app from './modules/app';
import ConversationStream from './modules/sms/conversationStream';
import MessageStream from './modules/sms/messageStream';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { isProduction, SENTRY_DSN, URL as appURL } from './constants';
import register, { unregister } from './registerServiceWorker';
import { getUrlParameter } from './utils';

const supportsHistory = 'pushState' in window.history;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
const conversationsStream = new ConversationStream(store);
const messageStream = new MessageStream(store);

// Initialize fabric icons
initializeIcons();

sagaMiddleware.run(rootSaga);

conversationsStream.start();
messageStream.start();

if (isProduction) {
  Raven.config(SENTRY_DSN).install();
}
const persistedStore = persistStore(store);

// Initialize App
function initialize() {
  // Extract JWT argument in url, useful for impersonation
  const token = getUrlParameter('jwt');

  store.dispatch(app.actions.initialize(token));
}

// Apollo Client
const httpLink = createHttpLink({
  uri: appURL.marketGraph,
});

// Websockets
const webSocketLink = new WebSocketLink({
  uri: appURL.marketGraphWS,
  options: {
    reconnect: true,
    connectionParams: () => ({
      authToken: store.getState()['market-mobile/app'].token,
    }),
  },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local state
  const { token } = store.getState()['market-mobile/app'];
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  webSocketLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    cacheRedirects: {
      Query: {
        opportunity: (_, args) =>
          toIdValue(
            defaultDataIdFromObject({
              __typename: 'Opportunity',
              id: args.id,
            }),
          ),
      },
    },
    dataIdFromObject: object => {
      switch (object.__typename) {
        case 'Auction':
        case 'AuctionItem':
        case 'AuctionSubscription':
        case 'Bid':
        case 'BlindBid':
        case 'InventoryVehicle':
        case 'ProxyBid':
        case 'Vehicle':
        case 'WeeklyAuction':
          return `${object.__typename}${object.id}`;
        default:
          return defaultDataIdFromObject(object);
      }
    },
  }),
});

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <PersistGate
        loading={<div />}
        persistor={persistedStore}
        onBeforeLift={initialize}
      >
        <Router forceRefresh={!supportsHistory}>
          <App />
        </Router>
      </PersistGate>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);
unregister();
