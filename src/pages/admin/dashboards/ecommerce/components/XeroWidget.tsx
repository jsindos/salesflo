import { Button, Card, CardBody, Loading } from "@/components/daisyui";

import { cn } from "@/helpers";

import xeroLogo from "@/assets/images/brand-logo/xero.svg";
import shieldCheckIcon from "@iconify/icons-lucide/shield-check";
import infoIcon from "@iconify/icons-lucide/info";

import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { mutations, queries } from "@/queries";
import SelectedXeroTenancy from "./SelectedXeroTenancy";
import InformationalWidget from "./InformationalWidget";

// repurposed from src/pages/admin/dashboards/ecommerce/components/CounterWidget.tsx
const AppWidget = ({
  title,
  route,
  isConnectedBadge,
  disabled = false,
  loading = false,
  transition = true,
  renderBody,
}: {
  title: string;
  route: string;
  isConnectedBadge?: boolean;
  disabled?: boolean;
  loading?: boolean;
  transition?: boolean;
  renderBody?: React.ReactNode; // Add this new prop type
}) => {
  const navigate = useNavigate();

  const [internalLoading, setInternalLoading] = useState(loading);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 1000) {
        setTimeout(() => {
          setInternalLoading(false);
        }, 1000 - elapsedTime);
      } else {
        setInternalLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const isLoading = loading || internalLoading;

  return (
    <Card
      className={cn(
        "bg-base-100 shadow",
        "transition-all duration-500 ease-out",
        !disabled && transition ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
      bordered={false}
    >
      <CardBody className="gap-4 relative flex justify-between">
        {(isLoading || disabled) && (
          <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
            {isLoading && <Loading color="primary" />}
          </div>
        )}
        <div className="flex items-start justify-between gap-2 text-sm">
          <div className="flex gap-4 items-center">
            <p className="font-medium text-base-content/70">{title}</p>
            <div
              className={cn(
                "inline rounded-badge border border-success/50 bg-success/5 px-3 py-1 text-xs font-medium text-success flex items-center gap-1",
                "transition-all duration-500 ease-out",
                isConnectedBadge && !isLoading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
            >
              <Icon icon={shieldCheckIcon} fontSize={18} />
              Connected
            </div>
          </div>
          <div className={cn(`bg-primary inline w-fit rounded bg-opacity-5 p-2`)}>
            <img src={xeroLogo} alt="Xero Logo" className="w-5 h-5" />
          </div>
        </div>
        {renderBody}
        <Button onClick={() => navigate(route)} disabled={disabled || isLoading}>
          {title}
        </Button>
      </CardBody>
    </Card>
  );
};

const XeroWidget = () => {
  const location = useLocation();

  const { data: { session: { authenticatedUser } } = { session: {} }, loading: isLoadingSession } = useQuery(
    queries.Session
  );
  const [createXeroAppMutation, { loading }] = useMutation(mutations.createXeroApp);
  const exchangeAttempted = useRef(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code && state && !exchangeAttempted.current) {
      exchangeAttempted.current = true;
      exchangeCodeForToken(code, state);
    }
  }, []);

  const exchangeCodeForToken = async (code: string, state: string) => {
    const decodedState = JSON.parse(state);
    const { clientId, clientSecret } = decodedState;
    try {
      await createXeroAppMutation({
        variables: { xeroApp: { code, clientId, clientSecret } },
      });
      window.history.replaceState({}, "", window.location.pathname);
    } catch (error) {
      console.error("Error exchanging code for token:", error);
    }
  };

  const [transition, setTransition] = useState(true);

  return (
    <>
      {/* <Button onClick={() => setTransition(true)} className="mb-4">
        Start Transition
      </Button> */}
      <AppWidget
        title="Setup Xero App"
        route="/apps/xero/create"
        isConnectedBadge={authenticatedUser?.xeroApp}
        loading={loading}
        renderBody={<InformationalWidget icon={infoIcon} content="Setup your Xero account" />}
      />
      <AppWidget
        title="Manage Xero Tenancies"
        route="/apps/xero/tenancies"
        disabled={isLoadingSession || !authenticatedUser?.xeroApp}
        renderBody={authenticatedUser?.xeroApp?.tenantName && <SelectedXeroTenancy />}
        transition={transition}
      />
      <AppWidget
        title="Test Purchase Orders"
        route="/apps/xero/purchase-orders/test"
        disabled={isLoadingSession || !authenticatedUser?.xeroApp?.tenantName}
        renderBody={authenticatedUser?.xeroApp?.tenantName && <SelectedXeroTenancy />}
        transition={transition}
      />
      <AppWidget
        title="Create Xero Purchase Orders"
        route="/apps/xero/purchase-orders/create"
        renderBody={
          <InformationalWidget icon={infoIcon} content="Create Xero purchase orders from a csv of your sales" />
        }
        disabled={isLoadingSession || !authenticatedUser?.xeroApp?.tenantName}
      />
    </>
  );
};

export { XeroWidget };
