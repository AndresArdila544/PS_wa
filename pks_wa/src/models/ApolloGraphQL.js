import {ApolloClient, InMemoryCache} from '@apollo/client';

 export const client = new ApolloClient({
    uri:"http://3.142.246.39:4000/graphql",
    cache: new InMemoryCache(),
});

