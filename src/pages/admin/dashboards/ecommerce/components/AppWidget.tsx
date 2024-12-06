import { Button, Card, CardBody } from "@/components/daisyui";

import { cn } from "@/helpers";

import xeroLogo from "@/assets/images/brand-logo/xero.svg";

import { useNavigate } from "react-router-dom";

// repurposed from src/pages/admin/dashboards/ecommerce/components/CounterWidget.tsx
const AppWidget = () => {
  const navigate = useNavigate();
  return (
    <Card className="bg-base-100 shadow" bordered={false}>
      <CardBody className="gap-2">
        <div className="flex items-start justify-between gap-2 text-sm">
          <div>
            <p className="font-medium text-base-content/70">Xero Hub</p>
          </div>
          <div
            className={cn(`bg-primary inline w-fit rounded bg-opacity-5 p-2`)}
          >
            <img src={xeroLogo} alt="Xero Logo" className="w-5 h-5" />
          </div>
        </div>
        <Button onClick={() => navigate("/apps/xero")}>Go to Xero Hub</Button>
      </CardBody>
    </Card>
  );
};

const DashboardAppWidget = () => {
  return (
    <>
      <AppWidget />
    </>
  );
};

export { DashboardAppWidget };
