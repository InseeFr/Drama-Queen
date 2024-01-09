import { Outlet } from "react-router-dom";
import { AppVersion } from "ui/components/appVersion";

export function Layout() {
  return (
    <>
      <Outlet />
      <AppVersion />
    </>
  );
}
