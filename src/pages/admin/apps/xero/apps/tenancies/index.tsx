import { BASE_URL } from "@/App";
import { Card, CardBody, Loading, Button } from "@/components/daisyui";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TerminalCode from "../../purchaseOrders/create/TerminalCode";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { mutations, queries } from "@/queries";
import { useMutation, useQuery } from "@apollo/client";
import { cn } from "@/helpers";
import { Icon } from "@/components/Icon";
import checkIcon from "@iconify/icons-lucide/check";

const tenancySchema = z.object({
  tenantId: z.string().min(1, "Please select a tenancy"),
});

type TenancySchemaType = z.infer<typeof tenancySchema>;

export default () => {
  const [code, setCode] = useState<string[]>(["Loading Xero tenancies..."]);
  const [isLoadingConnections, setIsLoadingConnections] = useState(false);
  const [connections, setConnections] = useState<any[]>([]);
  const { data: { session: { authenticatedUser } } = { session: {} } } = useQuery(queries.Session);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TenancySchemaType>({
    resolver: zodResolver(tenancySchema),
    defaultValues: {
      tenantId: "",
    },
  });

  const getConnections = async () => {
    setIsLoadingConnections(true);
    try {
      const res = await axios.get(`${BASE_URL}/xero/connections`, { withCredentials: true });
      setCode((prev) => [...prev, JSON.stringify(res.data, null, 2)]);
      setConnections(res.data);
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setIsLoadingConnections(false);
    }
  };

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      getConnections();
      effectRan.current = true;
    }

    if (authenticatedUser?.xeroApp?.tenantId) {
      setValue("tenantId", authenticatedUser.xeroApp.tenantId);
    }
  }, [authenticatedUser]);

  const [updateXeroAppMutation, { loading }] = useMutation(mutations.updateXeroApp);

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const { tenantId } = data;
    const selectedConnection = connections.find((connection) => connection.tenantId === tenantId);
    const tenantName = selectedConnection ? selectedConnection.tenantName : "";
    await updateXeroAppMutation({ variables: { xeroApp: { tenantId, tenantName } } });
    setUpdateSuccess(true);
  });

  return (
    <div>
      <PageMetaData title={"Manage Xero Tenancies"} />

      <PageTitle title={"Manage Xero Tenancies"} />
      <div className="mt-6">
        <div className="space-y-4">
          <Card className="bg-base-100 shadow">
            <CardBody className="space-y-4">
              <div className="flex flex-col items-start gap-4">
                {isLoadingConnections ? (
                  <div className="flex items-center">
                    <Loading />
                    <span className="ml-2">Loading Xero tenancies...</span>
                  </div>
                ) : connections.length > 0 ? (
                  <form onSubmit={onSubmit} className="w-full">
                    <div className="form-control max-w-lg mb-4">
                      <label className="label">
                        <span className="label-text">Select a Xero Tenancy:</span>
                      </label>
                      <Controller
                        name="tenantId"
                        control={control}
                        render={({ field }) => (
                          <select className="select select-bordered w-full" {...field}>
                            <option value="">Choose a tenancy</option>
                            {connections.map((connection) => (
                              <option key={connection.id} value={connection.tenantId}>
                                {connection.tenantName}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.tenantId && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.tenantId.message}</span>
                        </label>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <Button loading={loading} type="submit" className="w-full max-w-xs">
                        Update
                      </Button>
                      <div
                        className={cn(
                          "inline rounded-badge border border-success/50 bg-success/5 p-1 text-xs font-medium text-success flex items-center gap-1",
                          "transition-all duration-500 ease-out",
                          updateSuccess ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        )}
                      >
                        <Icon icon={checkIcon} fontSize={16} />
                      </div>
                    </div>
                  </form>
                ) : (
                  <p>No connections available.</p>
                )}
              </div>
            </CardBody>
          </Card>
          <TerminalCode clearLines={() => setCode([])} lines={code} />
        </div>
      </div>
    </div>
  );
};
