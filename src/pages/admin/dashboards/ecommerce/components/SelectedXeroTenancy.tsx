import { Button } from "@/components/daisyui";
import { Icon } from "@/components/Icon";
import { useNavigate } from "react-router-dom";
import wandIcon from "@iconify/icons-lucide/wand";
import { queries } from "@/queries";
import { useQuery } from "@apollo/client";
import { cn } from "@/helpers";

// adapted from src/pages/admin/apps/file-manager/components/Overview.tsx
export default ({ showButton }: { showButton?: boolean }) => {
  const navigate = useNavigate();

  const { data: { session: { authenticatedUser } } = { session: {} } } = useQuery(queries.Session);

  return (
    <div className="rounded-box border border-base-content/10 p-3 py-2 max-w-lg">
      <div className="flex items-center gap-3">
        <div className={cn(`rounded bg-base-content/10 p-2 bg-success bg-opacity-5 text-success`)}>
          <Icon icon={wandIcon} fontSize={16} />
        </div>
        <div className="grow">
          <p className="text-sm font-medium">{authenticatedUser?.xeroApp?.tenantName}</p>
          <p className="text-xs text-base-content/80">Actions will be performed on this tenancy</p>
        </div>
        {showButton && (
          <Button className="ms-auto btn-xs" onClick={() => navigate("/apps/xero/tenancies")}>
            Update tenancy
          </Button>
        )}
        {/* <span className="font-semibold">{size}</span> */}
      </div>

      {/* <Progress className="h-1 bg-base-content/10" color={color} max={100} value={percent} /> */}
    </div>
  );
};
