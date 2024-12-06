import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SimpleBarCore from "simplebar-core";
import { z } from "zod";

import { createHookedContext } from "@/hooks/create-hooked-context";
import { IChat, IChatData } from "@/types/apps/chat";

const messageInputSchema = z.object({
    message: z.string().min(1, { message: "Please enter a message" }),
});

type MessageInputSchemaType = z.infer<typeof messageInputSchema>;

const useHook = ({ data }: { data: IChatData }) => {
    const { chats } = data;
    const [selectedChat, setSelectedChat] = useState<IChat | undefined>(undefined);
    const [hasOnCall, setHasOnCall] = useState<boolean>(false);
    const callModalRef = useRef<HTMLDialogElement | null>(null);
    const inputMessageRef = useRef<HTMLInputElement | null>(null);
    const messagesScrollbarRef = useRef<SimpleBarCore | null>(null);

    const { control, handleSubmit, setValue, setFocus } = useForm<MessageInputSchemaType>({
        resolver: zodResolver(messageInputSchema),
        defaultValues: {
            message: "",
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        const { message } = data;
        if (selectedChat) {
            selectedChat.messages.push({
                message,
                sendAt: new Date(),
                fromMe: true,
            });
            setSelectedChat({ ...selectedChat });
        }
        setValue("message", "");
        setFocus("message");
    });

    useEffect(() => {
        chats.length != 0 && setSelectedChat(chats[0]);
    }, []);

    useEffect(() => {
        const scrollE = messagesScrollbarRef.current?.getScrollElement();
        if (scrollE) scrollE.scrollTo({ top: scrollE.scrollHeight, behavior: "smooth" });
    }, [selectedChat, messagesScrollbarRef]);

    const startCall = () => {
        callModalRef.current?.showModal();
        setHasOnCall(true);
    };

    const endCall = () => {
        setHasOnCall(false);
    };

    return {
        chats,
        selectedChat,
        inputMessageRef,
        messagesScrollbarRef,
        control,
        hasOnCall,
        callModalRef,
        onSubmit,
        setSelectedChat,
        startCall,
        endCall,
    };
};

const [useChat, ChatProvider] = createHookedContext(useHook);
export { useChat, ChatProvider };
