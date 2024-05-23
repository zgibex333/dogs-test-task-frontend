import { gql } from './__generated__/gql';

export const GET_DOGS_QUERY = gql(/* GraphQL */ `
  query GetDogs($name: String!) {
    dogs(name: $name) {
      name
    }
  }
`);
