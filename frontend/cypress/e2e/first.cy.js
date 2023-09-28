/* eslint-disable no-undef */
describe("React Component Test", () => {
  it(`should display home page with h1 in the second section contains (latest products)`, () => {
    cy.visit("http://localhost:3006/");
    cy.get(`[data-testid="latest-products-section-id"]`)
      .should(`exist`)
      .should(`have.text`, `Latest Products`);
  });

  it(`should displays the products with a (Buy Now) button .`, () => {
    // visit my web site
    cy.visit("http://localhost:3006/");
    // get all product cards and check if they have buy now buttons
    cy.get('[data-testid^="product-"]').each(($product) => {
      cy.wrap($product).find(".btn.btn-outline-dark").should("have.text", "Buy Now");
    });

  });
});
