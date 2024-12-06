import arrowUpFromLineIcon from "@iconify/icons-lucide/arrow-up-from-line";
import xIcon from "@iconify/icons-lucide/x";

import { Button, Card, CardBody, CardTitle, FormLabel } from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { FileUploader, FormInput, FormSelect, FormTextarea, FormToggle } from "@/components/forms";
import { currencyHelper } from "@/helpers";

import { useEditEcommerceProduct } from "./use-edit-product";

const EditEcommerceProduct = () => {
    const { control, productImage, productCategories, handleCancel, onSubmit, isLoading, handleChangeImage } =
        useEditEcommerceProduct();

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Card className="bg-base-100">
                    <CardBody className="gap-0">
                        <CardTitle>Basic Information</CardTitle>
                        <div className="mt-1 grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
                            <div>
                                <FormLabel title={"Name"} htmlFor="product_name"></FormLabel>
                                <FormInput
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    size="sm"
                                    id="product_name"
                                    name="name"
                                    placeholder="Name"
                                />
                            </div>
                            <div>
                                <FormLabel title={"Category"} htmlFor="product_category"></FormLabel>
                                <FormSelect
                                    size="sm"
                                    control={control}
                                    name={"category"}
                                    id="product_category"
                                    instanceId="product_category"
                                    className="w-full border-0"
                                    options={productCategories.map((category) => ({
                                        label: category.title,
                                        value: category.id,
                                    }))}
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <FormLabel title={"Description"} htmlFor="description"></FormLabel>
                                <FormTextarea
                                    className="w-full border-0 px-0 focus:outline-0"
                                    control={control}
                                    size={"sm"}
                                    id="description"
                                    name={"description"}
                                    placeholder="Description"
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="bg-base-100">
                    <CardBody>
                        <CardTitle>Upload Image</CardTitle>
                        <div className="mt-1">
                            <div className="filepond-file-upload">
                                <FileUploader
                                    files={productImage ? [productImage] : []}
                                    onupdatefiles={handleChangeImage}
                                    labelIdle={`<div>Drag and Drop your files or <span style="text-decoration: underline">Browse</span></div>`}
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="bg-base-100">
                    <CardBody className="gap-0">
                        <CardTitle>Pricing</CardTitle>
                        <div className="mt-1 grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
                            <div>
                                <FormLabel title="Cost Price" htmlFor="cost_price" />
                                <FormInput
                                    type="number"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    size="sm"
                                    min={0}
                                    id="cost_price"
                                    name={"costPrice"}
                                    placeholder="Cost Price"
                                    startIcon={<div className="text-base-content/70">{currencyHelper.sign}</div>}
                                />
                            </div>
                            <div>
                                <FormLabel title="Sale Price" htmlFor="sale_price" />
                                <FormInput
                                    size="sm"
                                    type="number"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    min={0}
                                    id="sale_price"
                                    name={"salePrice"}
                                    placeholder="Sale Price"
                                    startIcon={<div className="text-base-content/70">{currencyHelper.sign}</div>}
                                />
                            </div>
                            <div>
                                <FormLabel title="Discount" htmlFor="discount_percentage" />
                                <FormInput
                                    size="sm"
                                    type="number"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    min={0}
                                    max={100}
                                    id="discount_percentage"
                                    name={"discountPercentage"}
                                    placeholder="Discount"
                                    endIcon={<div className="ms-2 text-base-content/70">%</div>}
                                />
                            </div>
                            <div>
                                <FormLabel title="Discount Price" htmlFor="discount_price" />
                                <FormInput
                                    size="sm"
                                    type="number"
                                    className="w-full border-0 !bg-transparent focus:outline-0"
                                    control={control}
                                    id="discount_price"
                                    name={"discountPrice"}
                                    placeholder="Discount Price"
                                    disabled
                                />
                            </div>
                            <div>
                                <FormLabel title="Tax" htmlFor="tax_percentage" />
                                <FormInput
                                    size="sm"
                                    type="number"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    min={0}
                                    max={100}
                                    id="tax_percentage"
                                    name={"taxPercentage"}
                                    placeholder="Tax"
                                    endIcon={<div className="ms-2 text-base-content/70">%</div>}
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="bg-base-100">
                    <CardBody className="gap-0">
                        <CardTitle>Inventory</CardTitle>
                        <div className="mt-1 grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
                            <div className="col-span-1 md:col-span-2">
                                <FormLabel title="SKU" htmlFor="sku" />
                                <FormInput
                                    size="sm"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    id="sku"
                                    name="sku"
                                    placeholder="SKU (Stock Keeping Unit)"
                                />
                            </div>
                            <div>
                                <FormLabel title="Stock" htmlFor="stock" />
                                <FormInput
                                    size="sm"
                                    type="number"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    min={0}
                                    id="stock"
                                    name="stock"
                                    placeholder="Stock"
                                />
                            </div>
                            <div>
                                <FormLabel title="Stock Alert" htmlFor="stock_alert" />
                                <FormInput
                                    size="sm"
                                    type="number"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    min={0}
                                    id="stock_alert"
                                    name={"stockAlert"}
                                    placeholder="Stock Alert"
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <FormLabel title="In Stock" htmlFor="in_stock" />
                                <FormToggle control={control} size="sm" id="in_stock" name={"stockStatus"} />
                            </div>
                            <div className="flex items-center gap-5">
                                <FormLabel title="Display Avail" htmlFor="display_availability" />
                                <FormToggle
                                    control={control}
                                    size="sm"
                                    id="display_availability"
                                    name={"displayAvailability"}
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="bg-base-100">
                    <CardBody className="gap-0">
                        <CardTitle>SEO</CardTitle>
                        <div className="mt-1 grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
                            <div>
                                <FormLabel title="Slug" htmlFor="slug" />
                                <FormInput
                                    size="sm"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    id="slug"
                                    name="slug"
                                    placeholder="Slug"
                                />
                            </div>
                            <div>
                                <FormLabel title="Meta Title" htmlFor="meta_title" />
                                <FormInput
                                    size="sm"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    id="meta_title"
                                    name={"metaTitle"}
                                    placeholder="Meta Title"
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <FormLabel title="Meta Description" htmlFor="meta_description" />
                                <FormTextarea
                                    size="sm"
                                    className="w-full border-0 px-0 focus:outline-0"
                                    control={control}
                                    id="meta_description"
                                    name={"metaDescription"}
                                    placeholder="Meta Description"
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="bg-base-100">
                    <CardBody className="gap-0">
                        <CardTitle>Shipping</CardTitle>
                        <div className="mt-1 grid grid-cols-1 gap-5 gap-y-3 md:grid-cols-2">
                            <div>
                                <FormLabel title="Weight" htmlFor="weight" />
                                <FormInput
                                    size="sm"
                                    type="number"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    min={0}
                                    id="weight"
                                    name={"weight"}
                                    placeholder="Weight"
                                    endIcon={<div className="text-base-content/70">gm</div>}
                                />
                            </div>
                            <div>
                                <FormLabel title="Width" htmlFor="width" />
                                <FormInput
                                    size="sm"
                                    type="number"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    min={0}
                                    id="width"
                                    name={"width"}
                                    placeholder="Width"
                                    endIcon={<div className="text-base-content/70">In</div>}
                                />
                            </div>
                            <div>
                                <FormLabel title="Height" htmlFor="height" />
                                <FormInput
                                    size="sm"
                                    type="number"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    min={0}
                                    id="height"
                                    name={"height"}
                                    placeholder="Height"
                                    endIcon={<div className="text-base-content/70">In</div>}
                                />
                            </div>
                            <div>
                                <FormLabel title="Depth" htmlFor="depth" />
                                <FormInput
                                    size="sm"
                                    type="number"
                                    className="w-full border-0 focus:outline-0"
                                    control={control}
                                    min={0}
                                    id="depth"
                                    name={"depth"}
                                    placeholder="Depth"
                                    endIcon={<div className="text-base-content/70">In</div>}
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <FormLabel title="Free Shipping" htmlFor="free_shipping" />
                                <FormToggle control={control} id="free_shipping" name={"freeShipping"} size="sm" />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="mt-5 flex justify-end gap-4">
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
                    Update
                </Button>
            </div>
        </div>
    );
};

export { EditEcommerceProduct };
