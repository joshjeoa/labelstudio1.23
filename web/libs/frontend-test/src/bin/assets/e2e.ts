import { CURRENT_FLAGS } from "../../feature-flags";
import "@heartex/ls-test/cypress/support/e2e";

before(() => {
  cy.window().then((win) => {
    Object.assign(win, {
      APP_SETTINGS: {
        ...(win.APP_SETTINGS ?? {}),
        feature_flags: CURRENT_FLAGS,
      },
    });
    cy.log("默认功能标志设置为");
    cy.log(JSON.stringify(win.APP_SETTINGS.feature_flags, null, "  "));
  });
});
