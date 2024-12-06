import { lazy } from "react";
import { RouteProps } from "react-router-dom";

export type RoutesProps = {
  path: RouteProps["path"];
  name?: string;
  element?: RouteProps["element"];
  children?: RoutesProps[];
};

// Component Wrapper
const cw = (Component: any) => {
  return <Component />;
};

const dashboardRoutes: RoutesProps[] = [
  {
    path: "/dashboards/ecommerce",
    name: "dashboard",
    element: cw(lazy(() => import("@/pages/admin/dashboards/ecommerce"))),
  },
];

const appRoutes: RoutesProps[] = [
  {
    path: "/apps/xero",
    name: "xero.index",
    element: cw(lazy(() => import("@/pages/admin/apps/xero"))),
  },
  {
    path: "/apps/xero/create",
    name: "xero.apps.create",
    element: cw(lazy(() => import("@/pages/admin/apps/xero/apps/create"))),
  },
  {
    path: "/apps/xero/tenancies",
    name: "xero.apps.tenancies",
    element: cw(lazy(() => import("@/pages/admin/apps/xero/apps/tenancies"))),
  },
  {
    path: "/apps/xero/purchase-orders/test",
    name: "xero.purchase-orders.test",
    element: cw(lazy(() => import("@/pages/admin/apps/xero/purchaseOrders/test"))),
  },
  {
    path: "/apps/xero/purchase-orders/create",
    name: "xero.purchase-orders.create",
    element: cw(lazy(() => import("@/pages/admin/apps/xero/purchaseOrders/create"))),
  },
  {
    path: "/apps/ecommerce/products",
    name: "ecommerce.products.index",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/products"))),
  },
  {
    path: "/apps/ecommerce/products/create",
    name: "ecommerce.products.create",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/products/create"))),
  },
  {
    path: "/apps/ecommerce/products/:id",
    name: "ecommerce.products.edit",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/products/edit"))),
  },
  {
    path: "/apps/ecommerce/orders",
    name: "ecommerce.orders.index",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/orders"))),
  },
  {
    path: "/apps/ecommerce/orders/:id",
    name: "ecommerce.orders.show",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/orders/edit"))),
  },
  {
    path: "/apps/ecommerce/sellers",
    name: "ecommerce.sellers.index",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/sellers"))),
  },
  {
    path: "/apps/ecommerce/sellers/create",
    name: "ecommerce.sellers.create",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/sellers/create"))),
  },
  {
    path: "/apps/ecommerce/sellers/:id",
    name: "ecommerce.sellers.edit",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/sellers/edit"))),
  },
  {
    path: "/apps/ecommerce/customers",
    name: "ecommerce.customers.index",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/customers"))),
  },
  {
    path: "/apps/ecommerce/customers/create",
    name: "ecommerce.customers.create",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/customers/create"))),
  },
  {
    path: "/apps/ecommerce/customers/:id",
    name: "ecommerce.customers.edit",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/customers/edit"))),
  },
  {
    path: "/apps/ecommerce/shops",
    name: "ecommerce.shops.index",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/shops"))),
  },
  {
    path: "/apps/ecommerce/shops/create",
    name: "ecommerce.shops.create",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/shops/create"))),
  },
  {
    path: "/apps/ecommerce/shops/:id",
    name: "ecommerce.shops.edit",
    element: cw(lazy(() => import("@/pages/admin/apps/ecommerce/shops/edit"))),
  },
  {
    path: "/apps/file-manager",
    name: "files.index",
    element: cw(lazy(() => import("@/pages/admin/apps/file-manager"))),
  },
  {
    path: "/apps/chat",
    name: "chats.index",
    element: cw(lazy(() => import("@/pages/admin/apps/chat"))),
  },
];

const componentRoutes: RoutesProps[] = [
  {
    path: "/ui/components/accordion",
    name: "Accordion",
    element: cw(lazy(() => import("@/pages/admin/ui/components/accordion"))),
  },
  {
    path: "/ui/components/avatar",
    name: "Avatar",
    element: cw(lazy(() => import("@/pages/admin/ui/components/avatar"))),
  },
  {
    path: "/ui/components/badge",
    name: "Badge",
    element: cw(lazy(() => import("@/pages/admin/ui/components/badge"))),
  },

  {
    path: "/ui/components/breadcrumb",
    name: "Breadcrumb",
    element: cw(lazy(() => import("@/pages/admin/ui/components/breadcrumb"))),
  },

  {
    path: "/ui/components/button",
    name: "Button",
    element: cw(lazy(() => import("@/pages/admin/ui/components/button"))),
  },
  {
    path: "/ui/components/countdown",
    name: "Countdown",
    element: cw(lazy(() => import("@/pages/admin/ui/components/countdown"))),
  },
  {
    path: "/ui/components/menu",
    name: "Menu",
    element: cw(lazy(() => import("@/pages/admin/ui/components/menu"))),
  },
  {
    path: "/ui/components/pagination",
    name: "Pagination",
    element: cw(lazy(() => import("@/pages/admin/ui/components/pagination"))),
  },
  {
    path: "/ui/components/step",
    name: "Step",
    element: cw(lazy(() => import("@/pages/admin/ui/components/step"))),
  },
  {
    path: "/ui/components/tab",
    name: "Tab",
    element: cw(lazy(() => import("@/pages/admin/ui/components/tab"))),
  },
  {
    path: "/ui/components/alert",
    name: "Alert",
    element: cw(lazy(() => import("@/pages/admin/ui/components/alert"))),
  },
  {
    path: "/ui/components/loading",
    name: "Loading",
    element: cw(lazy(() => import("@/pages/admin/ui/components/loading"))),
  },
  {
    path: "/ui/components/progress",
    name: "Progress",
    element: cw(lazy(() => import("@/pages/admin/ui/components/progress"))),
  },
  {
    path: "/ui/components/tooltip",
    name: "Tooltip",
    element: cw(lazy(() => import("@/pages/admin/ui/components/tooltip"))),
  },
  {
    path: "/ui/components/modal",
    name: "Modal",
    element: cw(lazy(() => import("@/pages/admin/ui/components/modal"))),
  },
  {
    path: "/ui/components/dropdown",
    name: "Dropdown",
    element: cw(lazy(() => import("@/pages/admin/ui/components/dropdown"))),
  },
  {
    path: "/ui/components/timeline",
    name: "Timeline",
    element: cw(lazy(() => import("@/pages/admin/ui/components/timeline"))),
  },
  {
    path: "/ui/components/toast",
    name: "Toast",
    element: cw(lazy(() => import("@/pages/admin/ui/components/toast"))),
  },
  {
    path: "/ui/components/drawer",
    name: "Drawer",
    element: cw(lazy(() => import("@/pages/admin/ui/components/drawer"))),
  },
];

const formRoutes: RoutesProps[] = [
  {
    path: "/ui/forms/checkbox",
    name: "Checkbox",
    element: cw(lazy(() => import("@/pages/admin/ui/forms/checkbox"))),
  },
  {
    path: "/ui/forms/file",
    name: "File",
    element: cw(lazy(() => import("@/pages/admin/ui/forms/file"))),
  },
  {
    path: "/ui/forms/input",
    name: "Input",
    element: cw(lazy(() => import("@/pages/admin/ui/forms/input"))),
  },
  {
    path: "/ui/forms/radio",
    name: "Radio",
    element: cw(lazy(() => import("@/pages/admin/ui/forms/radio"))),
  },
  {
    path: "/ui/forms/range",
    name: "Range",
    element: cw(lazy(() => import("@/pages/admin/ui/forms/range"))),
  },
  {
    path: "/ui/forms/rating",
    name: "Rating",
    element: cw(lazy(() => import("@/pages/admin/ui/forms/rating"))),
  },
  {
    path: "/ui/forms/toggle",
    name: "Toggle",
    element: cw(lazy(() => import("@/pages/admin/ui/forms/toggle"))),
  },
];

const chartsRoutes: RoutesProps[] = [
  {
    path: "/ui/charts/apex/area",
    name: "Apex Area",
    element: cw(lazy(() => import("@/pages/admin/ui/charts/apex/area"))),
  },
  {
    path: "/ui/charts/apex/bar",
    name: "Apex Bar",
    element: cw(lazy(() => import("@/pages/admin/ui/charts/apex/bar"))),
  },
  {
    path: "/ui/charts/apex/column",
    name: "Apex Column",
    element: cw(lazy(() => import("@/pages/admin/ui/charts/apex/column"))),
  },
  {
    path: "/ui/charts/apex/line",
    name: "Apex Line",
    element: cw(lazy(() => import("@/pages/admin/ui/charts/apex/line"))),
  },
  {
    path: "/ui/charts/apex/pie",
    name: "Apex Pie",
    element: cw(lazy(() => import("@/pages/admin/ui/charts/apex/pie"))),
  },
];

const authRoutes: RoutesProps[] = [
  {
    path: "/auth/login",
    name: "auth.login",
    element: cw(lazy(() => import("@/pages/auth/login"))),
  },
  {
    path: "/auth/register",
    name: "auth.register",
    element: cw(lazy(() => import("@/pages/auth/register"))),
  },
  {
    path: "/auth/forgot-password",
    name: "auth.forgot-password",
    element: cw(lazy(() => import("@/pages/auth/forgot-password"))),
  },
  {
    path: "/auth/reset-password",
    name: "auth.reset-password",
    element: cw(lazy(() => import("@/pages/auth/reset-password"))),
  },
];

const otherRoutes: RoutesProps[] = [
  {
    path: "/",
    name: "Landing",
    element: cw(lazy(() => import("@/pages/landing"))),
  },
  {
    path: "/landing",
    name: "Landing",
    element: cw(lazy(() => import("@/pages/landing"))),
  },
  {
    path: "/:path",
    name: "Not Found",
    element: cw(lazy(() => import("@/pages/not-found"))),
  },
];

const registerRoutes = {
  admin: [...dashboardRoutes, ...appRoutes, ...componentRoutes, ...formRoutes, ...chartsRoutes],
  auth: authRoutes,
  other: otherRoutes,
};

export { registerRoutes };
