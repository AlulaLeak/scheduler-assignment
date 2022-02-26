describe("Navigation", () => {
  it("should reset db", () => {
    cy.request("GET", "http://localhost:8001/api/debug/reset");
  });

  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.contains("li", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
  it("should book an interview", () => {
    cy.visit("/");
    cy.contains("Monday");
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
  });
  it("should see booked appointment", () => {
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
});
