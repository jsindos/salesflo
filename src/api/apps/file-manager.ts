import { dummyFileManagerData } from "@/database/apps/file-manager";
import { IResponse } from "@/types/actions";
import { IFileManagerData } from "@/types/apps/file-manager";

export const getFileManagerData = async (): Promise<IResponse<IFileManagerData>> => {
    return {
        status: "success",
        data: {
            files: dummyFileManagerData.getFiles(),
            folders: dummyFileManagerData.getFolders(),
            uploadProcesses: dummyFileManagerData.uploadProcesses(),
            stats: dummyFileManagerData.stats(),
            categories: dummyFileManagerData.categories(),
        },
        code: 200,
    };
};
