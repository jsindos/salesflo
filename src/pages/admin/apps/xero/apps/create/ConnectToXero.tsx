import { Button, Card, CardBody, FormLabel } from "@/components/daisyui";
import { FormInput, FormInputPassword } from "@/components/forms";
import { Icon } from "@/components/Icon";

import keyRoundIcon from "@iconify/icons-lucide/key-round";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import CopyButton from "@/components/CopyButton";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { queries } from "@/queries";

export default () => {
  const toaster = useToast();

  // Welcome to BizFlow: Your Xero-Integrated POS Automation Solution for Australian Consignment Sellers.

  const { data: { session } = {} } = useQuery(queries.Session);

  const xeroConnectSchema = z.object({
    clientId: z.string().min(1, "Client ID is required"),
    clientSecret: z.string().min(1, "Client Secret is required"),
  });

  type XeroConnectSchemaType = z.infer<typeof xeroConnectSchema>;

  const { control, handleSubmit } = useForm<XeroConnectSchemaType>({
    resolver: zodResolver(xeroConnectSchema),
    defaultValues: {
      clientId: "",
      clientSecret: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const { clientId, clientSecret } = data;
    try {
      // Step 1: Open Xero authorization page in a popup
      const authUrl = "https://login.xero.com/identity/connect/authorize";
      const scope =
        "offline_access accounting.transactions openid profile email accounting.contacts accounting.settings";

      const state = encodeURIComponent(JSON.stringify({ clientId, clientSecret }));
      const authorizationUrl = `${authUrl}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(session.constants.XERO_OAUTH_REDIRECT_URI)}&scope=${encodeURIComponent(scope)}&state=${state}`;

      window.location.href = authorizationUrl;

      // The rest of the OAuth flow will be handled in the callback route
    } catch (e) {
      toaster.error("Something wrong, check dev console");
      console.error(e);
    }
  });

  return (
    <>
      <Card className="bg-base-100 mb-6">
        <CardBody>
          <h2 className="text-2xl font-semibold mb-4">Setup</h2>
          <p className="mb-4">
            To connect ConsignFlow with your Xero account and streamline your purchase order creation process, follow
            the steps below.
          </p>
        </CardBody>
      </Card>
      <Collapsable title="1. Create a Xero OAuth2 app">
        <ol className="list-decimal list-inside mb-4 space-y-8">
          <li>
            Go to your{" "}
            <a href="https://developer.xero.com/app/manage" className="text-blue-600 hover:underline" target="_blank">
              Xero developer portal
            </a>{" "}
            and create an OAuth2 app.
          </li>
          <li>
            Use the following values when creating your app:
            <ul className="list-disc list-inside ml-4 space-y-4 pt-4">
              <li>
                App name – <strong>your choice, but it can't contain the word 'Xero'</strong>
              </li>
              <li>
                Company or application URL – <strong>can be any https address</strong>
              </li>
              <div className="relative bg-gray-50 rounded-lg dark:bg-gray-700 p-4 flex items-center gap-4 inline-flex my-4">
                <pre>
                  <code id="code-block" className="text-sm text-gray-500 dark:text-gray-400 whitespace-pre">
                    <strong>https://example.com/</strong>
                  </code>
                </pre>
                <CopyButton text="https://example.com/" />
              </div>
              <li>
                OAuth 2.0 redirect URI - <strong>use the below value:</strong>
              </li>
              <div className="relative bg-gray-50 rounded-lg dark:bg-gray-700 p-4 flex items-center gap-4 inline-flex my-4">
                <pre>
                  <code id="code-block" className="text-sm text-gray-500 dark:text-gray-400 whitespace-pre">
                    <strong>{session.constants.XERO_OAUTH_REDIRECT_URI}</strong>
                  </code>
                </pre>
                <CopyButton text={session.constants.XERO_OAUTH_REDIRECT_URI} />
              </div>
            </ul>
          </li>
          <li>Click "Create app"</li>
        </ol>
        <img
          src="https://developer.xero.com/static/images/documentation/postman__add_new_app1.5.png"
          alt="Xero New App Setup"
          className="mb-4 border border-gray-300 rounded-lg shadow-sm max-w-[600px] w-full"
        />
      </Collapsable>

      <Collapsable title="2. Generate credentials">
        <p className="mb-4">
          Go to your{" "}
          <a href="https://developer.xero.com/app/manage" className="text-blue-600 hover:underline" target="_blank">
            Xero developer portal
          </a>{" "}
          and find the new app from step 1, then:
        </p>
        <ol className="list-decimal list-inside mb-4 space-y-4">
          <li>Click "Configuration" from the left-hand side of the screen</li>
          <li>Click "Generate a secret"</li>
          <li>Keep the page open</li>
        </ol>
        <img
          src="https://developer.xero.com/static/images/documentation/postman2/Add_new_app_configuration.png"
          alt="Xero App Configuration"
          className="border border-gray-300 rounded-lg shadow-sm max-w-[600px] w-full"
        />
      </Collapsable>
      <Collapsable title="3. Paste and connect to Xero">
        <p className="mb-4">
          Copy the Client ID and Client Secret from step 2 and paste them into the fields below, then click "Connect to
          Xero"
        </p>
        <form onSubmit={onSubmit} className="mb-4 flex flex-col space-y-4">
          <div className="form-control max-w-lg">
            <FormLabel title={"Client ID"} htmlFor="clientId" />
            <FormInput
              size="sm"
              startIcon={<Icon icon={keyRoundIcon} className="text-base-content/80" fontSize={18} />}
              control={control}
              name="clientId"
              id="clientId"
              placeholder="Enter Client ID"
              className="w-full focus:border-transparent focus:outline-0"
              bordered={false}
              borderOffset={false}
            />
          </div>
          <div className="form-control max-w-lg">
            <FormLabel title={"Client Secret"} htmlFor="clientSecret" />
            <FormInputPassword
              size="sm"
              startIcon={<Icon icon={keyRoundIcon} className="text-base-content/80" fontSize={18} />}
              control={control}
              name="clientSecret"
              id="clientSecret"
              placeholder="Enter Client Secret"
              className="w-full focus:border-transparent focus:outline-0"
              bordered={false}
              borderOffset={false}
            />
          </div>
          <Button type="submit" className="max-w-xs w-full">
            Connect to Xero
          </Button>
        </form>
      </Collapsable>
    </>
  );
};

const Collapsable = ({
  children,
  title,
  isInitiallyChecked = false,
}: {
  children: React.ReactNode;
  title: string;
  isInitiallyChecked?: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(isInitiallyChecked);

  return (
    <div className="collapse collapse-plus bg-base-100">
      <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
      <div className="collapse-title text-xl font-medium py-8">{title}</div>
      <div className="collapse-content pl-12">{children}</div>
    </div>
  );
};
