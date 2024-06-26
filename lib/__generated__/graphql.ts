/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Dog = {
  __typename?: 'Dog';
  good_with_other_dogs: Scalars['Int']['output'];
  good_with_strangers: Scalars['Int']['output'];
  image_link: Scalars['String']['output'];
  min_life_expectancy: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  dogs: Array<Dog>;
};

export type QueryDogsArgs = {
  name: Scalars['String']['input'];
};

export type GetDogsQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;

export type GetDogsQuery = {
  __typename?: 'Query';
  dogs: Array<{
    __typename?: 'Dog';
    dogName: string;
    imageLink: string;
    minLifeExpectancy: number;
    goodWithStrangers: number;
    goodWithOtherDogs: number;
  }>;
};

export const GetDogsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDogs' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dogs' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'name' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'name' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'dogName' },
                  name: { kind: 'Name', value: 'name' },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'imageLink' },
                  name: { kind: 'Name', value: 'image_link' },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'minLifeExpectancy' },
                  name: { kind: 'Name', value: 'min_life_expectancy' },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'goodWithStrangers' },
                  name: { kind: 'Name', value: 'good_with_strangers' },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'goodWithOtherDogs' },
                  name: { kind: 'Name', value: 'good_with_other_dogs' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetDogsQuery, GetDogsQueryVariables>;
