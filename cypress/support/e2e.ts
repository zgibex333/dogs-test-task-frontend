import * as empty from '../fixtures/emptyDogs.json';
import * as spitz from '../fixtures/spitz.json';
import * as retriever from '../fixtures/retriever.json';

// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { CyHttpMessages } from 'cypress/types/net-stubbing';
import './commands';

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

const isCI = Cypress.env('ci') === 'y';

const DogsFixtures = {
  'incorrect query': empty,
  'golden retriever': retriever,
  spitz,
};

export const hasOperationName = (
  req: CyHttpMessages.IncomingHttpRequest<any, any>,
  operationName: string
) => {
  const { body } = req;
  return (
    Object.prototype.hasOwnProperty.call(body, 'operationName') &&
    body.operationName === operationName
  );
};

// Alias query if operationName matches
export const aliasQuery = (
  req: CyHttpMessages.IncomingHttpRequest<any, any>,
  operationName: string
) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
  }
};

// Alias mutation if operationName matches
export const aliasMutation = (
  req: CyHttpMessages.IncomingHttpRequest<any, any>,
  operationName: string
) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`;
  }
};

beforeEach(() => {
  isCI &&
    cy.intercept('POST', '/graphql**', (req) => {
      const isDogsQuery = hasOperationName(req, 'GetDogs');

      if (isDogsQuery) {
        req.reply({
          statusCode: 200,
          body: DogsFixtures[req.body.variables.name],
        });
      }
    });
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
