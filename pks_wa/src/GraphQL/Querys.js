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


export const GET_PARKINGS_BY_HOME_OWNER_ID = gql`
  query par_getParkingByIdPluLoc($id:Int!){
    par_getParkingByIdPluLoc(id:$id){
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

export const GET_PARKING_BY_ID = gql`
  query par_getParkingByIdLoc(
    $id: Int!
  ){
      par_getParkingByIdLoc(
        id: $id
      ){
        id
    name
    pricePerMinute
    totalSpaces
    openHours{
      opening
      closing
    }
    address
    location{
      latitude
      longitude
    }
    
    
      }
  }
    
  
`;

