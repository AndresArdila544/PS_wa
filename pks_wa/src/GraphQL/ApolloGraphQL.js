import {ApolloClient, InMemoryCache} from '@apollo/client';

 export const client = new ApolloClient({
    uri:"https://pks-proxy-1-gpvlioxixq-uc.a.run.app/graphql",
    cache: new InMemoryCache(),
});

