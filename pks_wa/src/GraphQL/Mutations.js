import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
mutation clu_postUser( 
      $name: String!
      $email: String!
      $password: String!
      $age: Int!
      $phoneNumber:Int!
    ){
        clu_postUser( user:{     
            name: $name
            email: $email
            password: $password
            age: $age
            phoneNumber: $phoneNumber
        }){
            userId
        }
    }
     
`;