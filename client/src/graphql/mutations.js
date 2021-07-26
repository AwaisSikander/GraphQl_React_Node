import {USER_INFO} from "./fragments"
import {gql} from "@apollo/client"


export const USER_CREATE = gql`
  mutation {
    userCreate {
      username
      email
    }
  }
`;

export const USER_UPDATE = gql`
    mutation userUpdate($input:UserUpdateInput){
        userUpdate(input:$input){
        ...userInfo
        }
    }
    ${USER_INFO}
`;
