import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

// project imports
import ThemeProvider from './theme'
import Router from './routes';
import store from "./redux/store";
import client from './api';


export default function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}
