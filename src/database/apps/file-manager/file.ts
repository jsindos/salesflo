import figmaIcon from "@iconify/icons-lucide/figma";
import fileSpreadsheetIcon from "@iconify/icons-lucide/file-spreadsheet";
import fileTextIcon from "@iconify/icons-lucide/file-text";
import messageCircleDashedIcon from "@iconify/icons-lucide/message-circle";
import musicIcon from "@iconify/icons-lucide/music";
import videoIcon from "@iconify/icons-lucide/video";

import { dateHelper } from "@/helpers";
import { IFileManagerFile } from "@/types/apps/file-manager";

export const _getFileManagerFileData = (): IFileManagerFile[] => {
    return [
        {
            id: 1,
            name: "Latest Video",
            icon: videoIcon,
            size: 5478512354,
            lastModifiedAt: dateHelper.minusDays(1),
            owner_name: "Withden",
            shared_with: 3,
        },
        {
            id: 2,
            name: "Company Documents",
            icon: fileTextIcon,
            size: 8178510,
            lastModifiedAt: dateHelper.minusDays(2),
            owner_name: "Company",
            shared_with: "private",
        },
        {
            id: 3,
            name: "Figma Design",
            icon: figmaIcon,
            size: 1478510,
            lastModifiedAt: dateHelper.minusDays(4),
            owner_name: "Turkes Duis",
            shared_with: 7,
        },
        {
            id: 4,
            name: "Top Music",
            icon: musicIcon,
            size: 5047851,
            lastModifiedAt: dateHelper.minusDays(8),
            owner_name: "Me",
            shared_with: "public",
        },
        {
            id: 5,
            name: "Office Sheet",
            icon: fileSpreadsheetIcon,
            size: 57840,
            lastModifiedAt: dateHelper.minusDays(16),
            owner_name: "Mr. Boss",
            shared_with: 3,
        },
        {
            id: 6,
            name: "Chat Backup",
            icon: messageCircleDashedIcon,
            size: 257840,
            lastModifiedAt: dateHelper.minusDays(20),
            owner_name: "Withden",
            shared_with: "private",
        },
    ];
};
