import { gql } from './__generated__/gql';

export const GET_DOGS_QUERY = gql(/* GraphQL */ `
  query GetDogs($name: String!) {
    dogs(name: $name) {
      dogName: name
      imageLink: image_link
      minLifeExpectancy: min_life_expectancy
      goodWithStrangers: good_with_strangers
      goodWithOtherDogs: good_with_other_dogs
    }
  }
`);
