import { prCore } from "bootstrap";
import { LoaderFunctionArgs } from "react-router-dom";

export async function protectedRouteLoader({ request }: LoaderFunctionArgs) {
  const { userAuthentication } = (await prCore).functions;

  await userAuthentication.loginIfNotLoggedIn({
    redirectUri: request.url,
  });

  return null;
}
