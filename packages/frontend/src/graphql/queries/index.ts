import { gql } from '~/graphql/gen';

export const GET_HELLO_WORLD = gql(`
  query GetHelloWorld {
    helloWorld {
      message
    }
  }
`);

export const GET_FILM = gql(`
  query GetFilm($id: ID!) {
    film(id: $id) {
      id
      title
      originalTitle
      originalTitleRomanised
      image
      movieBanner
      description
      director
      producer
      releaseDate
      runningTime
      rtScore
    }
  }
`);
