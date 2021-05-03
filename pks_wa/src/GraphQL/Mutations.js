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

export const LOGIN_MUTATION = gql`
    mutation ath_loginWA(
        $email: String!
        $password: String!
    ){
        ath_loginWA(
            email: $email
            password: $password
        ){
            id
            email
            owner
        }
    }
`;

export const CREATE_PARKING_MUTATION = gql`
mutation par_createNewParkingLoc(
    $idplu: Int!
    $name: String!
    $pricePerMinute: Int!
    $totalSpaces: Int!
    $usedSpaces: Int!
    $OM:String
    $CM:String
    $OT:String
    $CT:String
    $OW:String
    $CW:String
    $OTH:String
    $CTH:String
    $OF:String
    $CF:String
    $OS:String
    $CS:String
    $OSU:String
    $CSU:String
    $latitude:Float!
    $longitude:Float!
    $address:String!
    ){
        par_createNewParkingLoc(parking:{
        idplu:$idplu,
        name: $name
        pricePerMinute: $pricePerMinute
        totalSpaces: $totalSpaces
        usedSpaces: $usedSpaces
        openHours:[
            {
            opening:$OM
            closing:$CM
            },
            {
            opening:$OT
            closing:$CT
            },
            {
            opening:$OW
            closing:$CW
            },
            {
            opening:$OTH
            closing:$CTH
            },
            {
            opening:$OF
            closing:$CF
            },
            {
            opening:$OS
            closing:$CS
            },
            {
            opening:$OSU
            closing:$CSU
            }
        ]
        latitude: $latitude
        longitude: $longitude
        address: $address
        }){
      id
      name
      pricePerMinute
      totalSpaces
      usedSpaces
      openHours{
        opening
        closing
      }
      idLocation
      address
    }
  
}

`;

export const SIGN_UP_MUTATION_OWNER = gql`
mutation plu_postParkinglotuser(
      $username: String    
      $name: String
      $email: String
      $password: String!
      $phone:String
    ){
        plu_postParkinglotuser( parkinglotuser:{
            username: $username     
            name: $name
            email: $email
            password: $password
            phone: $phone
        }){
            userId
        }
    }
`;