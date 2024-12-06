import { Button, Card, CardBody } from "@/components/daisyui";
import { PageMetaData } from "@/components/PageMetaData";
import { PageTitle } from "@/components/PageTitle";
import SelectedXeroTenancy from "@/pages/admin/dashboards/ecommerce/components/SelectedXeroTenancy";
import { useEffect, useState } from "react";
import TerminalCode from "../create/TerminalCode";
import axios from "axios";
import { BASE_URL } from "@/App";

export default () => {
  const [code, setCode] = useState<string[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [isLoadingThemes, setIsLoadingThemes] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [brandingThemes, setBrandingThemes] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [selectedBrandingTheme, setSelectedBrandingTheme] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [reference, setReference] = useState("");
  const [isCreatingPurchaseOrders, setIsCreatingPurchaseOrders] = useState(false);

  const getBrandingThemes = async () => {
    setIsLoadingThemes(true);
    try {
      const res = await axios.get(`${BASE_URL}/xero/branding_themes`, { withCredentials: true });
      setCode((prev) => [...prev, JSON.stringify(res.data, null, 2)]);
      setBrandingThemes(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingThemes(false);
    }
  };

  const getItems = async () => {
    setIsLoadingItems(true);
    try {
      const res = await axios.get(`${BASE_URL}/xero/items`, { withCredentials: true });
      setCode((prev) => [...prev, JSON.stringify(res.data, null, 2)]);
      setItems(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingItems(false);
    }
  };

  useEffect(() => {
    getBrandingThemes();
    getItems();
  }, []);

  const getContacts = async () => {
    setIsLoadingContacts(true);
    try {
      const res = await axios.get(`${BASE_URL}/xero/contacts`, { withCredentials: true });
      setCode((prev) => [...prev, JSON.stringify(res.data, null, 2)]);
    } catch (e) {
      console.error(e);
      setCode((prev) => [...prev, "Error fetching contacts: " + (e as Error).message]);
    } finally {
      setIsLoadingContacts(false);
    }
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCreatingPurchaseOrders(event.target.checked);
  };

  const createPurchaseOrders = async () => {
    if (!selectedBrandingTheme || !reference) return;

    setIsStreaming(true);
    fetch(`${BASE_URL}/xero/purchase_orders_test`, {
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
      <PageMetaData title={"Test Xero Purchase Orders"} />

      <PageTitle title={"Test Xero Purchase Orders"} />
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
              <div className="form-control max-w-lg">
                <label className="label">
                  <span className="label-text">Select an Item:</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  disabled={isLoadingItems}
                >
                  <option value="">Choose an item</option>
                  {items.map((item) => (
                    <option key={item.ItemID} value={item.ItemID}>
                      {item.Name} ({item.Code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full max-w-lg">
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
              <div className="form-control w-full max-w-lg">
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
              <Button className="max-w-xs w-full" color="neutral" onClick={getContacts} loading={isLoadingContacts}>
                Get Contacts
              </Button>
              <Button
                className="max-w-xs w-full"
                color="neutral"
                onClick={createPurchaseOrders}
                loading={isStreaming}
                disabled={!selectedBrandingTheme || !reference || isStreaming}
              >
                Create Purchase Order for Contact
              </Button>
            </CardBody>
          </Card>
          <TerminalCode clearLines={() => setCode([])} lines={code} />
        </div>
      </div>
    </div>
  );
};
