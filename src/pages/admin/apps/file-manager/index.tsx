import { useEffect, useState } from "react";

import { getFileManagerData } from "@/api/apps/file-manager";
import { PageMetaData } from "@/components/PageMetaData";
import { IFileManagerData } from "@/types/apps/file-manager";

import { FileManagerApp } from "./FileManagerApp";
import { FileManagerProvider } from "./use-file-manager";

const FileApp = () => {
    const [data, setData] = useState<IFileManagerData | null>(null);
    useEffect(() => {
        getFileManagerData().then((rData) => {
            if (rData.status === "success") {
                setData(rData.data);
            }
        });
    }, []);

    return (
        <>
            <PageMetaData title={"File Manager"} />

            {data && (
                <FileManagerProvider data={data}>
                    <FileManagerApp />
                </FileManagerProvider>
            )}
        </>
    );
};

export default FileApp;
