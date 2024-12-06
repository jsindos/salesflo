import { Suspense } from "react";
import {
  Navigate,
  Route,
  RouteProps,
  Routes,
  useLocation,
} from "react-router-dom";

import { useAuthContext } from "@/contexts/auth";
import { routes } from "@/lib/routes";
import { AdminLayoutWrapper } from "@/pages/admin/layout";
import { AuthLayoutWrapper } from "@/pages/auth/layout";

import { registerRoutes } from "./register";

const Router = (props: RouteProps) => {
  const { isLoggedIn } = useAuthContext();
  const location = useLocation();

  return (
    <Routes>
      <Route>
        {registerRoutes.admin.map((route, index) => (
          <Route
            key={"admin-" + index}
            path={route.path}
            element={
              isLoggedIn() ? (
                <AdminLayoutWrapper {...props}>
                  <Suspense>{route.element}</Suspense>
                </AdminLayoutWrapper>
              ) : (
                <Navigate
                  to={routes.auth.login + `?redirectTo=${location.pathname}`}
                  replace
                />
              )
            }
          />
        ))}
      </Route>
      <Route>
        {registerRoutes.auth.map((route, index) => (
          <Route
            key={"auth-" + index}
            path={route.path}
            element={
              <AuthLayoutWrapper {...props}>
                <Suspense>{route.element}</Suspense>
              </AuthLayoutWrapper>
            }
          />
        ))}
      </Route>
      <Route>
        {registerRoutes.other.map((route, index) => (
          <Route
            key={"other-" + index}
            path={route.path}
            element={<Suspense>{route.element}</Suspense>}
          />
        ))}
      </Route>
    </Routes>
  );
};

export { Router };
