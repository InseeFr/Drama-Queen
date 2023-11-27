import { assert } from "tsafe/assert";
import type { Thunks } from "core/bootstrap";

export const name = "userAuthentication";

export const reducer = null;

export const thunks = {
  getIsUserLoggedIn:
    () =>
    (...args): boolean => {
      const [, , { oidc }] = args;
      return oidc.isUserLoggedIn;
    },
  login:
    () =>
    (...args): Promise<never> => {
      const [, , { oidc }] = args;

      assert(!oidc.isUserLoggedIn);

      return oidc.login({ doesCurrentHrefRequiresAuth: true });
    },
} satisfies Thunks;
