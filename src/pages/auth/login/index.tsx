import googleMiniImage from "@/assets/images/brand-logo/google-mini.svg";

import keyRoundIcon from "@iconify/icons-lucide/key-round";
import logInIcon from "@iconify/icons-lucide/log-in";
import mailIcon from "@iconify/icons-lucide/mail";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button, Checkbox, FormLabel, Loading } from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { PageMetaData } from "@/components/PageMetaData";
import { FormInput, FormInputPassword } from "@/components/forms";
import { routes } from "@/lib/routes";

import { AuthThemeToggle } from "../components/ThemeToggle";
import { useLogin } from "./use-login";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { mutations, queries } from "@/queries";

const LoginPage = () => {
  const { isLoading, control, onSubmit } = useLogin();

  const location = useLocation();

  const exchangeAttempted = useRef(false);

  const [createUserMutation] = useMutation(mutations.createUser);

  const { data: { session } = {} } = useQuery(queries.Session);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code && !exchangeAttempted.current) {
      exchangeAttempted.current = true;
      exchangeCodeForToken(code);
    }
  }, []);
  const [isLoadingOAuth, setIsLoadingOAuth] = useState(false);
  const navigate = useNavigate();

  const exchangeCodeForToken = async (code: string) => {
    setIsLoadingOAuth(true);
    try {
      const startTime = Date.now();
      await createUserMutation({ variables: { user: { code, accountType: "google" } } });
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 1000) {
        await new Promise((resolve) => setTimeout(resolve, 1000 - elapsedTime));
      }
      navigate("/dashboards/ecommerce");
    } catch (error) {
      console.error("error exchanging code for token:", error);
    } finally {
      setIsLoadingOAuth(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      const scope = "openid email";

      // additional parameters to make work in local https://stackoverflow.com/a/71327990/3171685
      const authorizationUrl = `${authUrl}?response_type=code&client_id=783282927655-71ejbrp17gss8lppdnef3pljta6cs0tf.apps.googleusercontent.com&redirect_uri=${encodeURIComponent(session.constants.GOOGLE_OAUTH_REDIRECT_URI)}&scope=${encodeURIComponent(scope)}&state=YOUR_STATE&ack_oob_shutdown=2022-10-03&ack_loopback_shutdown=2022-08-31`;

      window.location.href = authorizationUrl;

      // The rest of the OAuth flow will be handled in the callback route
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <>
      <PageMetaData title={"Login"} />
      <div className="flex flex-col items-stretch p-8 lg:p-16">
        <div className="flex items-center justify-between">
          <Logo />
          <AuthThemeToggle />
        </div>
        <h3 className="mt-12 text-center text-xl font-semibold lg:mt-24">Login</h3>
        <h3 className="mt-2 text-center text-sm text-base-content/70">
          Seamless Access, Secure Connection: Your Gateway to a Personalized Experience.
        </h3>
        <div className="mt-10">
          {isLoadingOAuth ? (
            <div className="text-center">
              <Loading color="primary" />
            </div>
          ) : (
            <>
              <div>
                <div className="form-control">
                  <FormLabel title={"Email Address"} htmlFor="email" />
                  <FormInput
                    size="sm"
                    startIcon={<Icon icon={mailIcon} className="text-base-content/80" fontSize={18} />}
                    control={control}
                    name={"email"}
                    id="email"
                    placeholder="Email Address"
                    className="w-full focus:border-transparent focus:outline-0"
                    bordered={false}
                    borderOffset={false}
                  ></FormInput>
                </div>
                <div className="form-control mt-3">
                  <FormLabel title={"Password"} htmlFor="password" />
                  <FormInputPassword
                    size="sm"
                    startIcon={<Icon icon={keyRoundIcon} className="text-base-content/80" fontSize={18} />}
                    control={control}
                    name={"password"}
                    id="password"
                    placeholder="Password"
                    className="w-full focus:border-transparent focus:outline-0"
                    bordered={false}
                    borderOffset={false}
                  ></FormInputPassword>

                  <label className="label">
                    <span className="label-text"></span>
                    <Link className="label-text text-xs text-base-content/80" to={routes.auth.forgotPassword}>
                      Forgot Password?
                    </Link>
                  </label>
                </div>
                <div className="mt-4 flex items-center gap-3 md:mt-6">
                  <Checkbox name="agreement" id="agreement" size="xs" color="primary" />
                  <label htmlFor="agreement">
                    I agree with <span className="cursor-pointer text-primary underline">terms and conditions</span>
                  </label>
                </div>
              </div>
              <div className="mt-4 md:mt-6">
                <Button
                  color="primary"
                  loading={isLoading}
                  onClick={onSubmit}
                  className="gap-3 text-base"
                  fullWidth
                  startIcon={<Icon icon={logInIcon} fontSize={16} />}
                >
                  Login
                </Button>
              </div>
              <div className="mt-4">
                <Button
                  onClick={handleSubmit}
                  size={"md"}
                  fullWidth
                  className="flex items-center gap-3 border-base-content/10 !text-base-content hover:border-transparent hover:bg-base-content/10"
                  variant={"outline"}
                >
                  <img src={googleMiniImage} className="size-6" alt="" />
                  <span className="text-base">Login with Google</span>
                </Button>
              </div>
              <p className="mt-4 text-center text-sm text-base-content/80 md:mt-6">
                Haven&apos;t account{" "}
                <Link className="text-primary hover:underline" to={routes.auth.register}>
                  Create One
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
