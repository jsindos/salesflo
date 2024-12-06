import checkIcon from "@iconify/icons-lucide/check";
import keyRoundIcon from "@iconify/icons-lucide/key-round";

import { Link } from "react-router-dom";

import { Button, Checkbox, FormLabel } from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { PageMetaData } from "@/components/PageMetaData";
import { FormInputPassword } from "@/components/forms";
import { routes } from "@/lib/routes";

import { AuthThemeToggle } from "../components/ThemeToggle";
import { useResetPassword } from "./use-reset-password";

const ResetPasswordPage = () => {
    const { isLoading, control, onSubmit } = useResetPassword();

    return (
        <>
            <PageMetaData title={"Reset Password"} />

            <div className="flex flex-col items-stretch p-8 lg:p-16">
                <div className="flex items-center justify-between">
                    <Logo />
                    <AuthThemeToggle />
                </div>
                <h3 className="mt-12 text-center text-xl font-semibold lg:mt-24">Reset Password</h3>
                <h3 className="mt-2 text-center text-sm text-base-content/70">
                    Seamless Access, Secure Connection: Your Gateway to a Personalized Experience.
                </h3>
                <div className="mt-10">
                    <div>
                        <div className="form-control">
                            <FormLabel title={"Password"} htmlFor="password" />
                            <FormInputPassword
                                size="sm"
                                startIcon={<Icon icon={keyRoundIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name={"password"}
                                placeholder="Password"
                                id="password"
                                className="w-full focus:border-transparent focus:outline-0"
                                bordered={false}
                                borderOffset={false}></FormInputPassword>
                        </div>
                        <div className="form-control mt-3">
                            <FormLabel title={"Confirm Password"} htmlFor="confirmPassword" />
                            <FormInputPassword
                                size="sm"
                                startIcon={<Icon icon={keyRoundIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name={"confirmPassword"}
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                className="w-full focus:border-transparent focus:outline-0"
                                bordered={false}
                                borderOffset={false}></FormInputPassword>
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
                            startIcon={<Icon icon={checkIcon} fontSize={16} />}>
                            Change Password
                        </Button>
                    </div>
                    <p className="mt-4 text-center text-sm text-base-content/80 md:mt-6">
                        Go to{" "}
                        <Link className="text-primary hover:underline" to={routes.auth.login}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default ResetPasswordPage;
