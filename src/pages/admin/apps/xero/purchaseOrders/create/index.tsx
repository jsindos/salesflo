import { Button, Card, CardBody, FileInput, Loading } from "@/components/daisyui";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import TerminalCode from "./TerminalCode";
import { useEffect, useState } from "react";
import checkIcon from "@iconify/icons-lucide/check";
import { Icon } from "@/components/Icon";
import { cn } from "@/helpers";
import { BASE_URL } from "@/App";
import axios from "axios";
import SelectedXeroTenancy from "@/pages/admin/dashboards/ecommerce/components/SelectedXeroTenancy";

export default () => {
  const [code, setCode] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const [uploadInitiated1, setUploadInitiated1] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [uploadInitiated2, setUploadInitiated2] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoadingTestConnection, setIsLoadingTestConnection] = useState(false);
  const [isLoadingThemes, setIsLoadingThemes] = useState(false);
  const [brandingThemes, setBrandingThemes] = useState<any[]>([]);
  const [selectedBrandingTheme, setSelectedBrandingTheme] = useState("");

  const getBrandingThemes = async () => {
    setIsLoadingThemes(true);
    try {
      const res = await axios.get(`${BASE_URL}/xero/branding_themes`, { withCredentials: true });
      setCode((prev) => [...prev, `Found ${res.data.length} Branding Themes`]);
      setBrandingThemes(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingThemes(false);
    }
  };

  useEffect(() => {
    getBrandingThemes();
  }, []);

  const uploadFile = async (formData: FormData, inputName: string): Promise<void> => {
    try {
      await axios.post(`${BASE_URL}/xero/upload/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const inputName = event.target.name;
    if (file) {
      const formData = new FormData();
      if (inputName === "thisweeksquare") {
        formData.append("thisweeksquare", file);
        setUploadInitiated1(true);
        setIsLoading1(true);
        await uploadFile(formData, inputName);
        setIsLoading1(false);
      } else if (inputName === "contacts") {
        formData.append("contacts", file);
        setUploadInitiated2(true);
        setIsLoading2(true);
        await uploadFile(formData, inputName);
        setIsLoading2(false);
      }
    }
  };

  const testConnection = async () => {
    setIsLoadingTestConnection(true);
    const res = await axios.get(`${BASE_URL}/xero/connections`, { withCredentials: true });
    setCode((prev) => [...prev, JSON.stringify(res.data, null, 2)]);
    setIsLoadingTestConnection(false);
  };

  const fileUploadSuccess1 = !isLoading1 && uploadInitiated1;
  const fileUploadSuccess2 = !isLoading2 && uploadInitiated2;
  const [reference, setReference] = useState("");

  // const allSuccessful = fileUploadSuccess1 && fileUploadSuccess2 && reference;
  const allSuccessful = reference && selectedBrandingTheme;

  const [isCreatingPurchaseOrders, setIsCreatingPurchaseOrders] = useState(false);

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCreatingPurchaseOrders(event.target.checked);
  };

  const createPurchaseOrders = async () => {
    setIsStreaming(true);
    fetch(`${BASE_URL}/xero/purchase_orders`, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        isCreatingPurchaseOrders,
        reference,
        brandingThemeId: selectedBrandingTheme,
      }),
    })
      .then((response) => {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");

        return reader?.read().then(function processResult(result): Promise<void> {
          if (result.done) {
            setIsStreaming(false);
            return Promise.resolve();
          }
          setCode((prev) => [...prev, decoder.decode(result.value)]);
          return reader.read().then(processResult);
        });
      })
      .catch((e) => {
        console.log(e);
        setIsStreaming(false);
      });
  };

  return (
    <div>
      <PageMetaData title={"Run Xero Purchase Orders"} />

      <PageTitle title={"Run Xero Purchase Orders"} />
      <div className="mt-6">
        <div className="space-y-4">
          <Card className="bg-base-100 shadow">
            <CardBody className="space-y-8">
              <SelectedXeroTenancy showButton />
              <div className="form-control max-w-lg">
                <label className="label">
                  <span className="label-text">Select a Branding Theme:</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedBrandingTheme}
                  onChange={(e) => setSelectedBrandingTheme(e.target.value)}
                  disabled={isLoadingThemes}
                >
                  <option value="">Choose a branding theme</option>
                  {brandingThemes.map((theme) => (
                    <option key={theme.BrandingThemeID} value={theme.BrandingThemeID}>
                      {theme.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-4">
                <div className="form-control w-full max-w-64 sm:max-w-xs">
                  <label className="label">
                    <span className="label-text">Pick a file</span>
                    <span className="label-text-alt">thisweeksquare.csv</span>
                  </label>
                  <FileInput className="bg-base-200" name="thisweeksquare" onChange={handleFileUpload} accept=".csv" />
                  <label className="label">
                    <span className="label-text-alt">Required</span>
                    <span className="label-text-alt">Max 2 MB</span>
                  </label>
                </div>
                {isLoading1 && <Loading />}
                <div
                  className={cn(
                    "inline rounded-badge border border-success/50 bg-success/5 p-1 text-xs font-medium text-success flex items-center gap-1",
                    "transition-all duration-500 ease-out",
                    fileUploadSuccess1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  )}
                >
                  <Icon icon={checkIcon} fontSize={16} />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="form-control w-full max-w-64 sm:max-w-xs">
                  <label className="label">
                    <span className="label-text">Pick a file</span>
                    <span className="label-text-alt">contacts.csv</span>
                  </label>
                  <FileInput className="bg-base-200" name="contacts" onChange={handleFileUpload} accept=".csv" />
                  <label className="label">
                    <span className="label-text-alt">Required</span>
                    <span className="label-text-alt">Max 2 MB</span>
                  </label>
                </div>
                {isLoading2 && <Loading />}
                <div
                  className={cn(
                    "inline rounded-badge border border-success/50 bg-success/5 p-1 text-xs font-medium text-success flex items-center gap-1",
                    "transition-all duration-500 ease-out",
                    fileUploadSuccess2 && !isLoading2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  )}
                >
                  <Icon icon={checkIcon} fontSize={16} />
                </div>
              </div>
              <div className="form-control w-full max-w-64 sm:max-w-xs">
                <label className="label">
                  <span className="label-text">Reference</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={reference}
                  placeholder="September 27 to October 10"
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
              <div className="form-control w-full max-w-64 sm:max-w-xs">
                <label className="label cursor-pointer">
                  <span className="label-text">Create Purchase Orders</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={isCreatingPurchaseOrders}
                    onChange={handleToggleChange}
                  />
                </label>
              </div>
              <Button
                className="max-w-xs w-full"
                color="neutral"
                disabled={!allSuccessful || isStreaming}
                onClick={createPurchaseOrders}
                loading={isStreaming}
              >
                Create Purchase Orders
              </Button>
              <Button
                loading={isLoadingTestConnection}
                onClick={() => testConnection()}
                className="max-w-xs w-full"
                color="neutral"
              >
                Test Connection
              </Button>
            </CardBody>
          </Card>
          <TerminalCode clearLines={() => setCode([])} isLoading={isStreaming || isLoadingThemes} lines={code} />
        </div>
      </div>
    </div>
  );
};
