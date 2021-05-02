import { gql, useQuery } from '@apollo/client';

export const GET_PARKINGS = gql`
  query {
    par_getParkingsLocation{
        id
        name
        address
        location{
          latitude
          longitude
        }
      }
  }
`;

