import { Config } from '../config';

export function sessionLogin(username: string, password: string) {
  cy.request({
    method: 'POST',
    url: `${Config.BASE_API_URL}/auth/login`,
    body: {
      username: username,
      password: password,
    },
  }).then(res => {
    return `${res.body.accessToken}`;
  });
}

Cypress.Commands.add('sessionLogin', sessionLogin as any);
