import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import { Theme } from "@/components/daisyui";

import { AuthContextProvider } from "@/contexts/auth";
import { GlobalContextProvider } from "@/contexts/global";
import { Router } from "@/lib/routes/Router";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const BASE = import.meta.env.BASE_URL;
export const BASE_URL = BASE;

loadDevMessages();
loadErrorMessages();
const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Session: {
        keyFields: [],
      },
    },
  }),
  credentials: "include",
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <HelmetProvider>
          <Theme>
            <GlobalContextProvider>
              <AuthContextProvider>
                <Router />
                <Toaster richColors />
              </AuthContextProvider>
            </GlobalContextProvider>
          </Theme>
        </HelmetProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
