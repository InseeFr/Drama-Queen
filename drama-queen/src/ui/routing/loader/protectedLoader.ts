import { prCore } from "bootstrap";
import { LoaderFunctionArgs } from "react-router-dom";

export async function protectedRouteLoader({ request }: LoaderFunctionArgs) {
  const {
    functions: { userAuthentication },
  } = await prCore;

  if (!userAuthentication.getIsUserLoggedIn()) {
    // Replace the href without reloading the page.
    // This is a way to make oidc-spa know where to redirect the user
    // if the authentication process is successful.
    history.pushState({}, "", request.url);

    await userAuthentication.login();

    // Never here, the login method redirects the user to the identity provider.
  }

  return null;
}
