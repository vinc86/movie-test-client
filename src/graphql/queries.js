import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query getAllUsers {
      getAllUsers {
        id,
        username
      }
    }
`

export const GET_SELECTED_MOVIE = gql`
    query getSelectedMovie($id: String) {
      getSelectedMovie(id: $id) {
                id
                userId
                name
                releaseDate
                duration
                actors
                averageRating
                imageURL
                reactions {
                    userId
                    rating
                    comment
                }
            }
    }
`

export const GET_MOVIES = gql`
    query getMovies($sortBy: String) {
            getMovies(sortBy: $sortBy) {
                id
                userId
                name
                releaseDate
                duration
                actors
                averageRating
                imageURL
                reactions {
                    userId
                    rating
                    comment
                }
            }
    }
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token,
      id
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!, $confirmPassword: String!) {
    register(username: $username, password: $password, confirmPassword: $confirmPassword) {
      id
      username
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      username
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation addMovie($name: String!, $userId: String!, $releaseDate: Int!, $duration: Int!, $imageURL: String!, $actors: [String!]! ) {
      addMovie( name: $name, userId: $userId, releaseDate: $releaseDate, duration: $duration, imageURL: $imageURL, actors: $actors ) {
        id
        name
      }
  }

`
export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: String!){
      deleteMovie(id: $id)
  }

`

export const RATE_MOVIE = gql`
  mutation updateMovie($id: String!, $userId: String!, $rating: Int!){
    updateMovie(id:$id, userId:$userId, rating:$rating){
      id,
      name
    }
  }
`    
    

