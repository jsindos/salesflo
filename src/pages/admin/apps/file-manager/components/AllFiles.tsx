import eyeIcon from "@iconify/icons-lucide/eye";
import fileSpreadsheetIcon from "@iconify/icons-lucide/file-spreadsheet";
import fileTextIcon from "@iconify/icons-lucide/file-text";
import fileUpIcon from "@iconify/icons-lucide/file-up";
import folderIcon from "@iconify/icons-lucide/folder";
import folderGit2Icon from "@iconify/icons-lucide/folder-git-2";
import folderUpIcon from "@iconify/icons-lucide/folder-up";
import globeIcon from "@iconify/icons-lucide/globe";
import grid2X2Icon from "@iconify/icons-lucide/grid-2x2";
import listIcon from "@iconify/icons-lucide/list";
import plusIcon from "@iconify/icons-lucide/plus";
import searchIcon from "@iconify/icons-lucide/search";
import shieldIcon from "@iconify/icons-lucide/shield";

import {
    Button,
    Card,
    CardBody,
    Checkbox,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Join,
    Table,
    TableBody,
    TableHead,
    TableRow,
} from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { FormInput, FormSelect } from "@/components/forms";
import { dateHelper, stringHelper } from "@/helpers";
import { IFileManagerFile } from "@/types/apps/file-manager";

import { useFileManager } from "../use-file-manager";

const StorageFileRow = ({ file }: { file: IFileManagerFile }) => {
    const { handleSelectFile, selectedFileIds } = useFileManager();
    const { id, name, size, owner_name, lastModifiedAt, shared_with, icon } = file;

    return (
        <>
            <TableRow className="cursor-pointer hover:bg-base-200/40" onClick={() => handleSelectFile(id)}>
                <Checkbox
                    size={"xs"}
                    checked={selectedFileIds.includes(id)}
                    onChange={() => {}}
                    aria-label="Single check"
                />
                <div className="flex items-center space-x-3 truncate">
                    <div className={`rounded bg-base-content/5 p-1.5 text-base-content/80`}>
                        <Icon icon={icon} fontSize={20} />
                    </div>
                    <div className="text-sm font-medium">{name}</div>
                </div>
                {/*<div className="font-medium">{order.category}</div>*/}
                <div>
                    <div className="text-sm">{stringHelper.convertToStorageUnits(size)}</div>
                </div>
                <div className="text-sm">{dateHelper.formatted(lastModifiedAt)}</div>
                <div>{owner_name}</div>
                <div>
                    {shared_with === "private" ? (
                        <span className="flex items-center gap-2 text-error">
                            <Icon icon={shieldIcon} fontSize={15} />
                            Private
                        </span>
                    ) : shared_with === "public" ? (
                        <span className="flex items-center gap-2 text-success">
                            <Icon icon={globeIcon} fontSize={15} />
                            Public
                        </span>
                    ) : (
                        <span className="text-base-content/60">{shared_with} members</span>
                    )}
                </div>
                <div>
                    <Button color="ghost" size="sm" shape={"square"} aria-label="Show file">
                        <Icon icon={eyeIcon} className="text-base-content/70" fontSize={16} />
                    </Button>
                </div>
            </TableRow>
        </>
    );
};

const AllFiles = () => {
    const { data, filterViewType, setFilterViewType, handleSelectAllFile, fileSelectionStatus, filterControl } =
        useFileManager();

    return (
        <Card className="bg-base-100">
            <CardBody className={"p-0"}>
                <div className="flex items-center justify-between gap-3 px-5 pt-5">
                    <div className="inline-flex items-center gap-3">
                        <Dropdown>
                            <DropdownToggle
                                button={false}
                                className="btn btn-ghost btn-xs h-8 border border-base-content/20">
                                <Icon icon={plusIcon} fontSize={16} />
                            </DropdownToggle>
                            <DropdownMenu className="w-52 text-sm">
                                <DropdownItem anchor={false}>
                                    <div>
                                        <Icon icon={folderIcon} fontSize={16} />
                                        New Folder
                                    </div>
                                </DropdownItem>
                                <hr className="-mx-2 my-1 border-base-content/10" />
                                <DropdownItem anchor={false}>
                                    <div>
                                        <Icon icon={folderUpIcon} fontSize={16} />
                                        Upload Folder
                                    </div>
                                </DropdownItem>
                                <DropdownItem anchor={false}>
                                    <div>
                                        <Icon icon={fileUpIcon} fontSize={16} />
                                        Upload File
                                    </div>
                                </DropdownItem>

                                <hr className="-mx-2 my-1 border-base-content/10" />
                                <DropdownItem anchor={false}>
                                    <div>
                                        <Icon icon={fileTextIcon} fontSize={16} />
                                        Create Document
                                    </div>
                                </DropdownItem>
                                <DropdownItem anchor={false}>
                                    <div>
                                        <Icon icon={fileSpreadsheetIcon} fontSize={16} />
                                        Create Sheet
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="ghost" size="sm" className="hidden border-base-content/20 sm:flex">
                            <Icon icon={folderGit2Icon} fontSize={16} />
                            <span>Organize</span>
                        </Button>
                    </div>

                    <div className="inline-flex items-center gap-3">
                        <FormInput
                            startIcon={<Icon icon={searchIcon} className="text-base-content/60" fontSize={15} />}
                            size="sm"
                            placeholder="Search along files"
                            bordered={false}
                            control={filterControl}
                            name="search"
                            className="w-full focus:border-transparent focus:outline-0"
                        />
                        <div className="hidden sm:block">
                            <FormSelect
                                control={filterControl}
                                instanceId="file_type"
                                name="fileType"
                                size="sm"
                                id="file_type"
                                className="w-full min-w-36 border-0 text-base"
                                options={[
                                    { label: "Images", value: "images" },
                                    { label: "Videos", value: "videos" },
                                    { label: "Documents", value: "documents" },
                                    { label: "Archives", value: "archives" },
                                    { label: "Other", value: "other" },
                                ]}
                                placeholder={"Type"}
                            />
                        </div>
                        <Join className="border border-base-content/20">
                            <Button
                                color={"ghost"}
                                size="sm"
                                aria-label="List view"
                                className={`join-item text-base-content/80 ${filterViewType == "list" && "bg-base-content/10 text-base-content"}`}
                                onClick={() => setFilterViewType("list")}>
                                <Icon icon={listIcon} fontSize={16} />
                            </Button>
                            <Button
                                color={"ghost"}
                                size="sm"
                                aria-label="Grid view"
                                className={`join-item text-base-content/80 ${filterViewType == "grid" && "bg-base-content/10 text-base-content"}`}
                                onClick={() => setFilterViewType("grid")}>
                                <Icon icon={grid2X2Icon} fontSize={16} />
                            </Button>
                        </Join>
                    </div>
                </div>
                <div className="overflow-auto">
                    <Table className="mt-2 rounded-box">
                        <TableHead>
                            <Checkbox
                                size={"xs"}
                                indeterminate={fileSelectionStatus === "intermediate"}
                                checked={fileSelectionStatus === "all"}
                                onChange={() => handleSelectAllFile()}
                                aria-label="Check all"
                            />
                            <span className="text-sm font-medium text-base-content/80">Name</span>
                            <span className="text-sm font-medium text-base-content/80">Size</span>
                            <span className="text-sm font-medium text-base-content/80">Created At</span>
                            <span className="text-sm font-medium text-base-content/80">Owner</span>
                            <span className="text-sm font-medium text-base-content/80">Shared With</span>
                            <span className="text-sm font-medium text-base-content/80">Action</span>
                        </TableHead>

                        <TableBody>
                            {data.files.map((file, index) => (
                                <StorageFileRow file={file} key={index} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardBody>
        </Card>
    );
};

export { AllFiles };
