import { dummyChatData } from "@/database/apps/chat";
import { IResponse } from "@/types/actions";
import { IChatData } from "@/types/apps/chat";

export const getChatData = async (): Promise<IResponse<IChatData>> => {
    return {
        status: "success",
        data: {
            chats: dummyChatData.chats(),
        },
        code: 200,
    };
};
