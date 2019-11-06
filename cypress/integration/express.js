describe("express_based_game", () => {
  const checkTurn = (cy, num, sym, clean) => {
    cy.reload();
    cy.get('td').eq(num).click();
    cy.reload();

    if (!clean) {
      if (!!sym) {
        cy.get('td').eq(num).contains(new RegExp(sym,"i"));
      } else {
        cy.get('td').eq(num).should('not.have.value', new RegExp('x',"i")).should('not.have.value', new RegExp('o',"i"));
      }
    }
  }

  beforeEach(function () {
    cy.visit("/");
  });

  afterEach(function () {
    cy.get('input[type=submit]').click();
  });

  it("renders_container", () => {
    cy.get('table');
  });

  it("renders_table", () => {
    cy.get('td').should('have.length', 5*5);
  });

  it("reacts_on_click", () => {
      checkTurn(cy, 0, 'x');
      checkTurn(cy, 1, 'o');
  });

  it("win_condition_works_1", () => {
      for (let i = 0 ; i < 24 ; i+=6) {
        checkTurn(cy, i, 'x');
        cy.wait(1000);
        checkTurn(cy, i + 1, 'o');
        cy.wait(1000);
      }

      checkTurn(cy, 24, 'x');

      cy.on('window:alert', (str) => {
        expect(str).to.eq('Player 1 won!');
      });

      checkTurn(cy, 4);
  });

  it("win_condition_works_2", () => {
      for (let i = 0 ; i < 4 ; i++) {
        checkTurn(cy, i, 'x');
        cy.wait(1000);
        checkTurn(cy, i + 5, 'o');
        cy.wait(1000);
      }

      checkTurn(cy, 4, 'x');

      cy.on('window:alert', (str) => {
        expect(str).to.eq('Player 1 won!');
      });
  });

  it("win_condition_works_3", () => {
      for (let i = 0 ; i < 4 ; i++) {
        checkTurn(cy, i, 'x');
        cy.wait(1000);
        checkTurn(cy, i + 5, 'o');
        cy.wait(1000);
      }

      checkTurn(cy, 22, 'x');
      checkTurn(cy, 9, 'o');

      cy.on('window:alert', (str) => {
        expect(str).to.eq('Player 2 won!');
      });
  });
});
