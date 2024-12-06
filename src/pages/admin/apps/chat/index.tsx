import { useEffect, useState } from "react";

import { getChatData } from "@/api/apps/chat";
import { PageMetaData } from "@/components/PageMetaData";
import { IChatData } from "@/types/apps/chat";

import { ChatApp } from "./ChatApp";
import { ChatProvider } from "./use-chat";

const ChatPage = () => {
    const [chats, setChats] = useState<IChatData | null>(null);

    useEffect(() => {
        getChatData().then((rData) => {
            if (rData.status === "success") {
                setChats(rData.data);
            }
        });
    }, []);

    return (
        <>
            <PageMetaData title={"Chat App"} />

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-9">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Chat</h3>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                {chats && (
                    <ChatProvider data={chats}>
                        <ChatApp />
                    </ChatProvider>
                )}
            </div>
        </>
    );
};

export default ChatPage;
