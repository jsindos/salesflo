import arrowUpFromLineIcon from "@iconify/icons-lucide/arrow-up-from-line";
import checkIcon from "@iconify/icons-lucide/check";
import xIcon from "@iconify/icons-lucide/x";

import React from "react";

import { Button, Card, CardBody, CardTitle, FormLabel } from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { FileUploader, FormInput, FormInputPassword, FormRadio, FormToggle } from "@/components/forms";
import { FormError } from "@/components/forms/FormError";

import { useEditEcommerceSeller } from "./use-edit-seller";

const EditEcommerceSeller = () => {
    const {
        control,
        sellerImage,
        changePasswordControl,
        onSubmitChangePassword,
        isChangePasswordLoading,
        onSubmit,
        isLoading,
        handleChangeImage,
        handleCancel,
    } = useEditEcommerceSeller();

    return (
        <div>
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                <Card className="bg-base-100">
                    <CardBody className="gap-0">
                        <CardTitle>Basic Information</CardTitle>
                        <div className="mt-1 grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
                            <div>
                                <FormLabel title={"Name"} htmlFor="name" />
                                <FormInput
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    size="sm"
                                    id="name"
                                    name={"name"}
                                    placeholder="Name"
                                />
                            </div>
                            <div>
                                <FormLabel title={"Email"} htmlFor="email" />
                                <FormInput
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    size="sm"
                                    id="email"
                                    name={"email"}
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <FormLabel title={"Mobile"} htmlFor="mobile" />
                                <FormInput
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    size="sm"
                                    id="mobile"
                                    name={"mobileNumber"}
                                    placeholder="Mobile"
                                />
                            </div>
                            <div>
                                <FormLabel title={"DOB"} htmlFor="dob" />
                                <FormInput
                                    type="date"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    size="sm"
                                    id="dob"
                                    name={"dob"}
                                />
                            </div>
                            <div className="mt-2 flex items-start gap-4">
                                <FormLabel className="pt-0" title="Verified" htmlFor="verified" />
                                <FormToggle id="verified" name={"verified"} size="sm" control={control} />
                            </div>
                            <div>
                                <label className="label label-text">Gender</label>
                                <div className="flex">
                                    <div className="flex items-center gap-1">
                                        <FormRadio name={"gender"} control={control} id="male" value="male" />
                                        <FormLabel title="Male" htmlFor="male" />
                                    </div>
                                    <div className="ml-6 flex items-center gap-1">
                                        <FormRadio name={"gender"} control={control} id="female" value="female" />
                                        <FormLabel title="Female" htmlFor="female" />
                                    </div>
                                </div>
                                <FormError control={control} name={"gender"} className="mt-1" />
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="bg-base-100">
                    <CardBody>
                        <CardTitle>Upload Profile Image</CardTitle>
                        <div className="mt-1">
                            <div className="filepond-file-upload">
                                <FileUploader
                                    files={[...(sellerImage ? [sellerImage] : [])]}
                                    onupdatefiles={handleChangeImage}
                                    labelIdle={`<div>Drag and Drop your files or <span style="text-decoration: underline">Browse</span></div>`}
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="bg-base-100">
                    <CardBody className="gap-0">
                        <CardTitle>Change Password</CardTitle>
                        <form className="mt-1 grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
                            <div>
                                <FormLabel title="Password" htmlFor="password" />
                                <FormInputPassword
                                    className="w-full border-0 focus:outline-0"
                                    control={changePasswordControl}
                                    size="sm"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="on"
                                />
                            </div>
                            <div>
                                <FormLabel title="Confirm Password" htmlFor="confirm_password" />
                                <FormInputPassword
                                    className="w-full border-0 focus:outline-0"
                                    control={changePasswordControl}
                                    size="sm"
                                    id="confirm_password"
                                    name={"confirmPassword"}
                                    placeholder="Confirm Password"
                                    autoComplete="on"
                                />
                            </div>
                        </form>
                        <div className="mt-5 flex justify-end">
                            <Button
                                color="primary"
                                size="sm"
                                onClick={onSubmitChangePassword}
                                startIcon={<Icon icon={checkIcon} fontSize={18} />}
                                loading={isChangePasswordLoading}>
                                Change
                            </Button>
                        </div>
                    </CardBody>
                </Card>
                <Card className="bg-base-100">
                    <CardBody className="gap-0">
                        <CardTitle>Address</CardTitle>
                        <div className="mt-1 grid gap-5">
                            <div className="grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
                                <div>
                                    <FormLabel title={"Street Address"} htmlFor="street_address"></FormLabel>
                                    <FormInput
                                        className="w-full border-0 focus:outline-0"
                                        control={control}
                                        size="sm"
                                        id="street_address"
                                        name="address"
                                        placeholder="Street Address"
                                    />
                                </div>
                                <div>
                                    <FormLabel title={"City"} htmlFor="city"></FormLabel>
                                    <FormInput
                                        className="w-full border-0 focus:outline-0"
                                        control={control}
                                        size="sm"
                                        id="city"
                                        name="city"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <FormLabel title={"State"} htmlFor="state"></FormLabel>
                                    <FormInput
                                        className="w-full border-0 focus:outline-0"
                                        control={control}
                                        size="sm"
                                        id="state"
                                        name="state"
                                        placeholder="State"
                                    />
                                </div>
                                <div>
                                    <FormLabel title={"Postal Code"} htmlFor="postal_code"></FormLabel>
                                    <FormInput
                                        className="w-full border-0 focus:outline-0"
                                        control={control}
                                        size="sm"
                                        id="postal_code"
                                        name={"postalCode"}
                                        placeholder="Postal Code"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="mt-6 flex justify-end gap-6">
                <Button
                    color="ghost"
                    size="sm"
                    className="bg-base-content/10"
                    onClick={handleCancel}
                    startIcon={<Icon icon={xIcon} fontSize={18} />}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    size="sm"
                    onClick={onSubmit}
                    startIcon={<Icon icon={arrowUpFromLineIcon} fontSize={18} />}
                    loading={isLoading}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export { EditEcommerceSeller };
