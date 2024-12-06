import authImage from "@/assets/images/auth/auth-hero.png";
import testimonialPouyaLandingImg from "@/assets/images/landing/testimonial-pouya-avatar.png";

import starIcon from "@iconify/icons-lucide/star";

import { type ReactNode } from "react";

import { Card, CardBody, maskClassesFn } from "@/components/daisyui";

import { Icon } from "@/components/Icon";

const AuthLayoutWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="grid min-h-screen grid-cols-12 overflow-auto">
            <div className="relative hidden bg-[#FFE9D1] dark:bg-[#14181c] lg:col-span-7 lg:block xl:col-span-8 2xl:col-span-9">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src={authImage} className="object-cover" alt="Auth Image" />
                </div>
                <div className="animate-bounce-2 absolute bottom-[15%] right-[20%]">
                    <Card className="w-64 bg-base-100/80 backdrop-blur-lg">
                        <CardBody className="p-6">
                            <div className="flex flex-col items-center justify-center">
                                <img
                                    src={testimonialPouyaLandingImg}
                                    className={`size-11 bg-base-content/10 p-0.5 ${maskClassesFn({ variant: "squircle" })}`}
                                    alt=""
                                />
                                <div className="mt-2 flex items-center justify-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Icon
                                            icon={starIcon}
                                            key={index}
                                            className="size-3 text-orange-400 svg-path:fill-orange-400"
                                        />
                                    ))}
                                </div>
                                <p className="mt-2 text-sm font-medium">Pouya Saadeghi</p>
                                <p className="text-xs text-base-content/70">Creator of daisyUI</p>
                            </div>
                            <p className="text-center text-sm text-base-content/90">
                                This is the ultimate admin dashboard for any React project
                            </p>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-5 xl:col-span-4 2xl:col-span-3">{children}</div>
        </div>
    );
};

export { AuthLayoutWrapper };
