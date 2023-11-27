import { ReactNode } from "react";
import { useCore } from "core";


export function RequiresAuthentication(props:
  { children: ReactNode }) {

  const { children } = props
  const { userAuthentication } = useCore().functions;

  if (!userAuthentication.getIsUserLoggedIn()) {
    userAuthentication.login();
    return null;
  }

  return <>{children}</>
}