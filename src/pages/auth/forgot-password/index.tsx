import mailIcon from "@iconify/icons-lucide/mail";
import mailPlusIcon from "@iconify/icons-lucide/mail-plus";

import { Link } from "react-router-dom";

import { Button, Checkbox, FormLabel } from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { PageMetaData } from "@/components/PageMetaData";
import { FormInput } from "@/components/forms";
import { routes } from "@/lib/routes";

import { AuthThemeToggle } from "../components/ThemeToggle";
import { useForgotPassword } from "./use-forgot-password";

const ForgotPasswordPage = () => {
    const { isLoading, control, onSubmit } = useForgotPassword();

    return (
        <>
            <PageMetaData title={"Forgot Password"} />
            <div className="flex flex-col items-stretch p-8 lg:p-16">
                <div className="flex items-center justify-between">
                    <Logo />
                    <AuthThemeToggle />
                </div>
                <h3 className="mt-12 text-center text-xl font-semibold lg:mt-24">Forgot Password</h3>
                <h3 className="mt-2 text-center text-sm text-base-content/70">
                    Seamless Access, Secure Connection: Your Gateway to a Personalized Experience.
                </h3>
                <div className="mt-10">
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
                                borderOffset={false}></FormInput>
                        </div>
                        <div className="mt-4 flex items-center gap-3 md:mt-6">
                            <Checkbox name="agreement" id="agreement" size="xs" color="primary" />
                            <label htmlFor="agreement">
                                I agree with{" "}
                                <span className="cursor-pointer text-primary underline">terms and conditions</span>
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
                            startIcon={<Icon icon={mailPlusIcon} fontSize={16} />}>
                            Send a reset link
                        </Button>
                    </div>
                    <p className="mt-4 text-center text-sm text-base-content/80 md:mt-6">
                        I have already to{" "}
                        <Link className="text-primary hover:underline" to={routes.auth.login}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default ForgotPasswordPage;
