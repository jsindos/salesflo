import googleMiniImage from "@/assets/images/brand-logo/google-mini.svg";

import keyRoundIcon from "@iconify/icons-lucide/key-round";
import mailIcon from "@iconify/icons-lucide/mail";
import userIcon from "@iconify/icons-lucide/user";
import userPlusIcon from "@iconify/icons-lucide/user-plus";
import userSquareIcon from "@iconify/icons-lucide/user-square";

import { Link } from "react-router-dom";

import { Button, Checkbox, FormLabel } from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { PageMetaData } from "@/components/PageMetaData";
import { FormInput, FormInputPassword } from "@/components/forms";
import { routes } from "@/lib/routes";

import { AuthThemeToggle } from "../components/ThemeToggle";
import { useRegister } from "./use-register";

const RegisterPage = () => {
    const { isLoading, control, onSubmit } = useRegister();

    return (
        <>
            <PageMetaData title={"Register"} />
            <div className="flex flex-col items-stretch p-8 lg:p-16">
                <div className="flex items-center justify-between">
                    <Logo />
                    <AuthThemeToggle />
                </div>
                <h3 className="mt-12 text-center text-xl font-semibold lg:mt-24">Register</h3>
                <h3 className="mt-2 text-center text-sm text-base-content/70">
                    Seamless Access, Secure Connection: Your Gateway to a Personalized Experience.
                </h3>
                <div className="mt-10">
                    <div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div className="form-control">
                                <FormLabel title={"First Name"} htmlFor="firstName" />
                                <FormInput
                                    size="sm"
                                    startIcon={<Icon icon={userIcon} className="text-base-content/80" fontSize={18} />}
                                    control={control}
                                    id="firstName"
                                    name={"firstName"}
                                    placeholder="First Name"
                                    className="w-full focus:border-transparent focus:outline-0"
                                    bordered={false}
                                    borderOffset={false}></FormInput>
                            </div>
                            <div className="form-control">
                                <FormLabel title={"Last Name"} htmlFor="lastName" />
                                <FormInput
                                    size="sm"
                                    startIcon={<Icon icon={userIcon} className="text-base-content/80" fontSize={18} />}
                                    control={control}
                                    id="lastName"
                                    name={"lastName"}
                                    placeholder="Last Name"
                                    className="w-full focus:border-transparent focus:outline-0"
                                    bordered={false}
                                    borderOffset={false}></FormInput>
                            </div>
                        </div>
                        <div className="form-control mt-3">
                            <FormLabel title={"Username"} htmlFor="username" />
                            <FormInput
                                size="sm"
                                startIcon={
                                    <Icon icon={userSquareIcon} className="text-base-content/80" fontSize={18} />
                                }
                                control={control}
                                id="username"
                                name={"username"}
                                placeholder="Username"
                                className="w-full focus:border-transparent focus:outline-0"
                                bordered={false}
                                borderOffset={false}></FormInput>
                        </div>
                        <div className="form-control mt-3">
                            <FormLabel title={"Email Address"} htmlFor="email" />
                            <FormInput
                                size="sm"
                                startIcon={<Icon icon={mailIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name={"email"}
                                id={"email"}
                                placeholder="Email Address"
                                className="w-full focus:border-transparent focus:outline-0"
                                bordered={false}
                                borderOffset={false}></FormInput>
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <FormInputPassword
                                size="sm"
                                startIcon={<Icon icon={keyRoundIcon} className="text-base-content/80" fontSize={18} />}
                                control={control}
                                name={"password"}
                                placeholder="Password"
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
                            startIcon={<Icon icon={userPlusIcon} fontSize={16} />}>
                            Register
                        </Button>
                    </div>
                    <div className="mt-4">
                        <Button
                            size={"md"}
                            fullWidth
                            className="flex items-center gap-3 border-base-content/10 !text-base-content hover:border-transparent hover:bg-base-content/10"
                            variant={"outline"}>
                            <img src={googleMiniImage} className="size-6" alt="" />
                            <span className="text-base">Register with Google</span>
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

export default RegisterPage;
