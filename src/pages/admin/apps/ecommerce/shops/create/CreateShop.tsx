import checkIcon from "@iconify/icons-lucide/check";
import xIcon from "@iconify/icons-lucide/x";

import React from "react";

import { Button, Card, CardBody, CardTitle, FormLabel } from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { FormInput, FormSelect, FormTextarea, FormToggle } from "@/components/forms";

import { useCreateEcommerceShop } from "./use-create-shop";

const CreateEcommerceShop = () => {
    const { control, sellers, handleCancel, onSubmit, isLoading } = useCreateEcommerceShop();

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
                                    name="name"
                                    placeholder="Name"
                                />
                            </div>
                            <div>
                                <FormLabel title={"Seller"} htmlFor="seller_id" />
                                <FormSelect
                                    className="w-full border-0 focus:outline-0"
                                    options={sellers.map((seller) => ({
                                        label: seller.name,
                                        value: seller.id,
                                    }))}
                                    control={control}
                                    name={"sellerId"}
                                    instanceId="seller_id"
                                    size="sm"
                                    id="seller_id"
                                    placeholder="Select Seller"
                                />
                            </div>
                            <div>
                                <FormLabel title={"Email"} htmlFor="email" />
                                <FormInput
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    size="sm"
                                    id="email"
                                    name="email"
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
                        </div>
                        <div className="mt-5">
                            <FormLabel title={"Description"} htmlFor="description" />
                            <FormTextarea
                                className="w-full border-0 px-0 focus:outline-0"
                                control={control}
                                size="sm"
                                id="description"
                                name="description"
                                placeholder="Description"
                            />
                        </div>
                    </CardBody>
                </Card>
                <div className="space-y-5">
                    <Card className="bg-base-100">
                        <CardBody className="gap-0">
                            <CardTitle>Address</CardTitle>
                            <div className="grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
                                <div>
                                    <FormLabel title={"Street Address"} htmlFor="street_address" />
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
                                    <FormLabel title={"City"} htmlFor="city" />
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
                                    <FormLabel title={"State"} htmlFor="state" />
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
                                    <FormLabel title={"Postal Code"} htmlFor="postal_code" />
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
                        </CardBody>
                    </Card>
                    <Card className="bg-base-100">
                        <CardBody className="gap-0">
                            <CardTitle>Status</CardTitle>
                            <div className="mt-1 flex items-center gap-4">
                                <FormLabel title="Verified" htmlFor="verified" />
                                <FormToggle id="verified" name="verified" size="sm" control={control} />
                            </div>
                        </CardBody>
                    </Card>
                </div>
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
                    startIcon={<Icon icon={checkIcon} fontSize={18} />}
                    loading={isLoading}>
                    Save
                </Button>
            </div>
        </div>
    );
};

export { CreateEcommerceShop };
