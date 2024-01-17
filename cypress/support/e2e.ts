import "@testing-library/cypress/add-commands";

// This is a workaround for a bug in Cypress: https://github.com/remix-run/remix/issues/2570#issuecomment-1259089527
Cypress.on("uncaught:exception", (err) => {
  // Cypress and React Hydrating the document don't get along
  // for some unknown reason. Hopefully we figure out why eventually
  // so we can remove this.
  if (
    /hydrat/i.test(err.message) ||
    /Minified React error #418/.test(err.message) ||
    /Minified React error #423/.test(err.message)
  ) {
    return false;
  }
});
