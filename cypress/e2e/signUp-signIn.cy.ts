describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/signUp');
    localStorage.clear();
  });
  it('Can Sign Up', () => {
    cy.intercept('POST', '/usuarios').as('signUpRequest');

    cy.get('[formControlName="nombre"]').type('Roberto');
    cy.get('[formControlName="apellido"]').type('Perez');
    cy.get('[formControlName="dni"]').type('22957526');
    cy.get('[formControlName="mail"]').type('robertitototo@gmail.com');
    cy.get('[formControlName="telefono"]').type('341642513');
    cy.get('[formControlName="contraseña"]').type('12345678');
    cy.get('[name="submit"]').click();

    // It can be 200 or 400
    // 200 if the user was created
    // 400 if the user already exists
    cy.wait('@signUpRequest')
      .its('response.statusCode')
      .should('be.oneOf', [200, 400]);
  });
});

describe('Sign In', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/signIn');
    localStorage.clear();
  });
  it('Can Sign In', () => {
    cy.intercept('POST', '/usuarios/loginUser').as('signInRequest');

    cy.get('[formControlName="mail"]').type('robertitototo@gmail.com');
    cy.get('[formControlName="contraseña"]').type('12345678');
    cy.get('[name="submit"]').click();

    cy.wait('@signInRequest').its('response.statusCode').should('eq', 200);
  });

  it('Can not Sign In - Wrong Password', () => {
    cy.intercept('POST', '/usuarios/loginUser').as('signInRequest');

    cy.get('[formControlName="mail"]').type('robertitototo@gmail.com');
    // Wrong password
    cy.get('[formControlName="contraseña"]').type('95929123');
    cy.get('[name="submit"]').click();

    cy.wait('@signInRequest').its('response.statusCode').should('eq', 400);
  });

  it('Can not Sign In - Wrong Email', () => {
    cy.intercept('POST', '/usuarios/loginUser').as('signInRequest');

    // Wrong Email
    cy.get('[formControlName="mail"]').type('robertitoto@gmail.com');
    cy.get('[formControlName="contraseña"]').type('12345678');
    cy.get('[name="submit"]').click();

    cy.wait('@signInRequest').its('response.statusCode').should('eq', 400);
  });
});
