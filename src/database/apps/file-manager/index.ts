import { _getFileManagerCategoryItemData } from "./category";
import { _getFileManagerFileData } from "./file";
import { _getFileManagerFolderData } from "./folder";
import { _getFileManagerProviderStatData } from "./stat";
import { _getFileManagerUploadProcessData } from "./upload";

export const dummyFileManagerData = {
    getFiles: _getFileManagerFileData,
    getFolders: _getFileManagerFolderData,
    uploadProcesses: _getFileManagerUploadProcessData,
    stats: _getFileManagerProviderStatData,
    categories: _getFileManagerCategoryItemData,
};
