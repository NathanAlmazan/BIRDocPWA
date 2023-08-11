import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://birtracker.nat911.com/api/graphql',
    cache: new InMemoryCache(),
});

export default client;