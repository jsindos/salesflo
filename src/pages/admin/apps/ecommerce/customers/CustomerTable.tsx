import badgeCheckIcon from "@iconify/icons-lucide/badge-check";
import badgeXIcon from "@iconify/icons-lucide/badge-x";
import chevronLeftIcon from "@iconify/icons-lucide/chevron-left";
import chevronRightIcon from "@iconify/icons-lucide/chevron-right";
import copyPlusIcon from "@iconify/icons-lucide/copy-plus";
import downloadCloudIcon from "@iconify/icons-lucide/download-cloud";
import eyeIcon from "@iconify/icons-lucide/eye";
import pencilIcon from "@iconify/icons-lucide/pencil";
import plusIcon from "@iconify/icons-lucide/plus";
import searchIcon from "@iconify/icons-lucide/search";
import settings2Icon from "@iconify/icons-lucide/settings-2";
import trashIcon from "@iconify/icons-lucide/trash";
import wandIcon from "@iconify/icons-lucide/wand";
import xIcon from "@iconify/icons-lucide/x";

import { Link } from "react-router-dom";

import {
    Button,
    Card,
    CardBody,
    Checkbox,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalActions,
    ModalBody,
    ModalHeader,
    Pagination,
    Table,
    TableBody,
    TableHead,
    TableRow,
    maskClassesFn,
} from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { FormInput, FormSelect } from "@/components/forms";
import { currencyHelper, dateHelper, stringHelper } from "@/helpers";
import { routes } from "@/lib/routes";
import { IEcommerceCustomer } from "@/types/apps/ecommerce";

import { useEcommerceCustomers } from "./use-customers";

const CustomerTableRow = ({ customer }: { customer: IEcommerceCustomer }) => {
    const { showDeleteCustomerConfirmation, handleSelectCustomer, selectedCustomerIds } = useEcommerceCustomers();
    const { id, name, date, image, email, gender, purchases, spend, verified, mobileNumber } = customer;

    return (
        <>
            <TableRow className="cursor-pointer hover:bg-base-200/40" onClick={() => handleSelectCustomer(id)}>
                <Checkbox
                    size={"xs"}
                    checked={selectedCustomerIds.includes(id)}
                    onChange={() => handleSelectCustomer(id)}
                    aria-label="Single check"
                />
                <div className="font-medium">{id}</div>
                <div className="flex items-center space-x-3 truncate">
                    <img
                        src={image}
                        height={40}
                        width={40}
                        className={`size-10 bg-base-content/10 ${maskClassesFn({ variant: "squircle" })}`}
                        alt="Product Image"
                    />
                    <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-xs font-medium capitalize text-base-content/70">{gender}</div>
                    </div>
                </div>
                <div>{email}</div>
                <div>{mobileNumber}</div>
                <div>{purchases}</div>
                <div className="text-sm font-medium">
                    {currencyHelper.sign}
                    {stringHelper.convertToCurrency(spend)}
                </div>
                <>
                    {verified ? (
                        <Icon icon={badgeCheckIcon} fontSize={18} className="text-success" />
                    ) : (
                        <Icon icon={badgeXIcon} fontSize={18} className="text-error" />
                    )}
                </>
                <div className="text-sm">{dateHelper.formatted(date)}</div>
                <div className="inline-flex w-fit">
                    <Link
                        to={routes.apps.ecommerce.customers.edit(id)}
                        aria-label={"Edit customer link"}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}>
                        <Button color="ghost" size="sm" shape={"square"} aria-label="Dummy edit customer">
                            <Icon icon={pencilIcon} className="text-base-content/70" fontSize={15} />
                        </Button>
                    </Link>
                    <Button color="ghost" size="sm" shape={"square"} aria-label="Dummy show customer">
                        <Icon icon={eyeIcon} className="text-base-content/70" fontSize={16} />
                    </Button>
                    <Button
                        color="ghost"
                        className="text-error/70 hover:bg-error/20"
                        size="sm"
                        shape={"square"}
                        aria-label="Dummy delete customer"
                        onClick={(event) => {
                            event.stopPropagation();
                            showDeleteCustomerConfirmation(id);
                        }}>
                        <Icon icon={trashIcon} fontSize={16} />
                    </Button>
                </div>
            </TableRow>
        </>
    );
};

const CustomerTable = () => {
    const {
        customers,
        filterControl,
        customerDeleteConfirmationRef,
        customerToBeDelete,
        handleDeleteCustomer,
        customersSelectionStatus,
        handleSelectAllCustomer,
    } = useEcommerceCustomers();

    return (
        <>
            <Card className="bg-base-100">
                <CardBody className={"p-0"}>
                    <div className="flex items-center justify-between px-5 pt-5">
                        <div className="inline-flex items-center gap-3">
                            <FormInput
                                startIcon={<Icon icon={searchIcon} className="text-base-content/60" fontSize={15} />}
                                size="sm"
                                placeholder="Search along customers"
                                bordered={false}
                                control={filterControl}
                                name="search"
                                className="w-full focus:border-transparent focus:outline-0"
                            />
                            <div className="hidden sm:block">
                                <FormSelect
                                    control={filterControl}
                                    instanceId="verification_status"
                                    name={"verificationStatus"}
                                    size="sm"
                                    id="verification_status"
                                    className="w-full border-0 text-base"
                                    options={[
                                        { label: "Verified", value: "verified" },
                                        { label: "Unverified", value: "unverified" },
                                    ]}
                                    placeholder={"Verification Status"}
                                />
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-3">
                            <Link to={routes.apps.ecommerce.customers.create} aria-label={"Create customer link"}>
                                <Button color="primary" size="sm" className="hidden md:flex">
                                    <Icon icon={plusIcon} fontSize={16} />
                                    <span>New Customer</span>
                                </Button>
                            </Link>
                            <Dropdown horizontal="left" vertical="bottom">
                                <DropdownToggle
                                    button={false}
                                    className="btn btn-ghost btn-xs h-8 border border-base-content/20">
                                    <Icon icon={settings2Icon} fontSize={16} />
                                </DropdownToggle>
                                <DropdownMenu className="w-52 text-sm">
                                    <DropdownItem anchor={false}>
                                        <div>
                                            <Icon icon={wandIcon} fontSize={16} />
                                            Bulk Actions
                                        </div>
                                    </DropdownItem>
                                    <hr className="-mx-2 my-1 border-base-content/10" />
                                    <DropdownItem anchor={false}>
                                        <div>
                                            <Icon icon={downloadCloudIcon} fontSize={16} />
                                            Import from Store
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem anchor={false}>
                                        <div>
                                            <Icon icon={copyPlusIcon} fontSize={16} />
                                            Create from Existing
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="overflow-auto">
                        <Table className="mt-2 rounded-box">
                            <TableHead>
                                <Checkbox
                                    size={"xs"}
                                    indeterminate={customersSelectionStatus === "intermediate"}
                                    checked={customersSelectionStatus === "all"}
                                    onChange={() => handleSelectAllCustomer()}
                                    aria-label="Check all"
                                />
                                <span className="text-sm font-medium text-base-content/80">ID</span>
                                <span className="text-sm font-medium text-base-content/80">Name</span>
                                <span className="text-sm font-medium text-base-content/80">Email</span>
                                <span className="text-sm font-medium text-base-content/80">Mobile</span>
                                <span className="text-sm font-medium text-base-content/80">Sales</span>
                                <span className="text-sm font-medium text-base-content/80">Earning</span>
                                <span className="text-sm font-medium text-base-content/80">Verified</span>
                                <span className="text-sm font-medium text-base-content/80">Joined Date</span>
                                <span className="text-sm font-medium text-base-content/80">Action</span>
                            </TableHead>

                            <TableBody>
                                {customers.slice(0, 11).map((customer, index) => (
                                    <CustomerTableRow customer={customer} key={index} />
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end px-5 pb-5 pt-3">
                        <Pagination>
                            <Button
                                size="sm"
                                aria-label="pagination-prev"
                                className="join-item"
                                startIcon={<Icon icon={chevronLeftIcon} fontSize={16} />}></Button>
                            <Button size="sm" className="join-item" active color="primary" aria-label="pagination-1">
                                1
                            </Button>
                            <Button size="sm" className="join-item" aria-label="pagination-2">
                                2
                            </Button>
                            <Button
                                size="sm"
                                aria-label="pagination-next"
                                className="join-item"
                                startIcon={<Icon icon={chevronRightIcon} fontSize={16} />}></Button>
                        </Pagination>
                    </div>
                </CardBody>
            </Card>
            <Modal ref={customerDeleteConfirmationRef} backdrop>
                <form method="dialog">
                    <Button
                        size="sm"
                        color="ghost"
                        shape="circle"
                        className="absolute right-2 top-2"
                        aria-label="Close modal">
                        <Icon icon={xIcon} className="h-4" />
                    </Button>
                </form>
                <ModalHeader className="font-bold">Confirm Delete</ModalHeader>
                <ModalBody>
                    You are about to delete <b>{customerToBeDelete?.name}</b>. Would you like to proceed further ?
                </ModalBody>
                <ModalActions>
                    <form method="dialog">
                        <Button color="error" size="sm">
                            No
                        </Button>
                    </form>
                    <form method="dialog">
                        <Button color="primary" size="sm" onClick={() => handleDeleteCustomer()}>
                            Yes
                        </Button>
                    </form>
                </ModalActions>
            </Modal>
        </>
    );
};

export { CustomerTable };
