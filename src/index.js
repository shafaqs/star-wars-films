import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

// Find the root element in the HTML
const container = document.getElementById('root');


const root = createRoot(container);


root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
