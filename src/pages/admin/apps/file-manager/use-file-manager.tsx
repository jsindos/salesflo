import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { arrayHelper, fileHelper } from "@/helpers";
import { createHookedContext } from "@/hooks/create-hooked-context";
import { IFileManagerData, IFileManagerFile } from "@/types/apps/file-manager";

type IFileManagerInformationType = "detail" | "activity";
type IFileManagerFilterViewType = "grid" | "list";

const useHook = ({ data }: { data: IFileManagerData }) => {
    const uploadModalRef = useRef<HTMLDialogElement>(null);
    const [fileInformationTab, setFileInformationTab] = useState<IFileManagerInformationType>("detail");
    const [filterViewType, setFilterViewType] = useState<IFileManagerFilterViewType>("list");
    const [showOverviewDrawer, setShowOverviewDrawer] = useState(false);
    const [selectedFileIds, setSelectedFileIds] = useState<IFileManagerFile["id"][]>([]);

    const fileSelectionStatus = useMemo(() => {
        if (selectedFileIds.length === 0) return "empty";

        if (data.files.length === selectedFileIds.length) return "all";

        return "intermediate";
    }, [selectedFileIds]);

    const handleSelectAllFile = () => {
        if (fileSelectionStatus === "all") {
            setSelectedFileIds([]);
        } else {
            setSelectedFileIds(data.files.map((file) => file.id));
        }
    };

    const handleSelectFile = (id: IFileManagerFile["id"]) => {
        setSelectedFileIds([...arrayHelper.toggleItem(selectedFileIds, id)]);
    };

    const { control: filterControl } = useForm({
        defaultValues: {
            fileType: "default",
            search: "",
        },
    });

    const showUploadModal = () => {
        uploadModalRef.current?.showModal();
    };

    return {
        data,
        showOverviewDrawer,
        setShowOverviewDrawer,
        fileInformationTab,
        setFileInformationTab,
        filterViewType,
        setFilterViewType,
        uploadModalRef,
        uploadFileProcess: fileHelper.dummyFileProcessHandler,
        showUploadModal,
        fileSelectionStatus,
        handleSelectFile,
        selectedFileIds,
        handleSelectAllFile,
        filterControl,
    };
};

const [useFileManager, FileManagerProvider] = createHookedContext(useHook);
export { useFileManager, FileManagerProvider };
