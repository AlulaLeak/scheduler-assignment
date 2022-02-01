it("should navigate to Tuesday", () => {
    cy.visit("/")
    cy.get("li").contains("Tuesday").click();
  });