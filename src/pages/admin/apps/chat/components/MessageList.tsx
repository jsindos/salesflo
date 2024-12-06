import avatar1 from "@/assets/images/avatars/1.png";

import archiveIcon from "@iconify/icons-lucide/archive";
import bellDotIcon from "@iconify/icons-lucide/bell-dot";
import moreVerticalIcon from "@iconify/icons-lucide/more-vertical";
import paperclipIcon from "@iconify/icons-lucide/paperclip";
import phoneIcon from "@iconify/icons-lucide/phone";
import pinIcon from "@iconify/icons-lucide/pin";
import sendHorizonalIcon from "@iconify/icons-lucide/send-horizonal";
import trashIcon from "@iconify/icons-lucide/trash";
import squareUserIcon from "@iconify/icons-lucide/user";
import userPlusIcon from "@iconify/icons-lucide/user-plus";
import videoIcon from "@iconify/icons-lucide/video";

import { useEffect, useRef } from "react";
import SimpleBarCore from "simplebar-core";
import SimpleBar from "simplebar-react";

import {
    Button,
    Card,
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
    ChatBubbleTime,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Tooltip,
} from "@/components/daisyui";

import { Icon } from "@/components/Icon";
import { FormInput } from "@/components/forms";
import { cn, dateHelper } from "@/helpers";
import { IChat, IChatMessage } from "@/types/apps/chat";

import { useChat } from "../use-chat";
import CallModal from "./CallModal";

const SingleMessage = ({ chat, message }: { chat: IChat; message: IChatMessage }) => {
    return (
        <div>
            <ChatBubble end={message.fromMe}>
                <ChatBubbleAvatar
                    alt={chat.name}
                    src={message.fromMe ? avatar1 : chat.image}
                    innerClassName={"bg-base-content/10 rounded-box p-0.5"}
                    shape={"square"}
                />
                <ChatBubbleMessage
                    className={cn("min-h-fit py-3 text-base/none", {
                        "bg-base-content/5 text-base-content": message.fromMe,
                        "bg-base-content/10 text-base-content": !message.fromMe,
                    })}>
                    {message.message}
                </ChatBubbleMessage>
                <ChatBubbleTime>{dateHelper.formatted(message.sendAt, { format: "hh:mm A" })}</ChatBubbleTime>
            </ChatBubble>
        </div>
    );
};

export const MessageInput = () => {
    const { control, onSubmit } = useChat();

    return (
        <form className="flex gap-3 bg-base-content/5 p-4" onSubmit={onSubmit}>
            <Button color={"ghost"} size={"sm"} shape={"circle"} type={"button"} aria-label="Attachment">
                <Icon icon={paperclipIcon} fontSize={18} className="text-base-content/80" />
            </Button>
            <div className="grow">
                <FormInput size={"sm"} className="w-full" control={control} name="message" aria-label="Input message" />
            </div>
            <Button color={"primary"} size={"sm"} type={"submit"} shape={"circle"} aria-label="Send message">
                <Icon icon={sendHorizonalIcon} fontSize={18} />
            </Button>
        </form>
    );
};

export const MessageList = () => {
    const ref = useRef<SimpleBarCore | null>(null);

    const { selectedChat: chat, startCall } = useChat();

    useEffect(() => {
        const scrollE = ref.current?.getScrollElement();
        if (scrollE) scrollE.scrollTo({ top: scrollE.scrollHeight, behavior: "smooth" });
    }, [chat, ref]);

    if (!chat) {
        return <></>;
    }
    return (
        <Card className="bg-base-100">
            <div className="flex items-center gap-3 p-3">
                <img src={chat.image} className="size-10" alt="" />
                <div className="grow">
                    <p className="text-base/none font-medium">{chat.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                        <div className="size-2 rounded-full bg-success"></div>
                        <p className="text-sm/none text-base-content/70">Active</p>
                    </div>
                </div>
                <div className="inline-flex items-center gap-3">
                    <Tooltip message="Audio Call">
                        <Button
                            onClick={startCall}
                            color={"ghost"}
                            aria-label="Phone"
                            size={"sm"}
                            className="border border-base-content/20 p-2"
                            startIcon={<Icon icon={phoneIcon} className="size-3.5" />}></Button>
                    </Tooltip>
                    <Tooltip message="Video Call" className="hidden sm:block">
                        <Button
                            onClick={startCall}
                            color={"ghost"}
                            size={"sm"}
                            aria-label="Video"
                            className="border border-base-content/20 p-2"
                            startIcon={<Icon icon={videoIcon} className="size-3.5" />}></Button>
                    </Tooltip>
                    <Tooltip message="Add to Friend">
                        <Button
                            color={"ghost"}
                            aria-label="Add user"
                            size={"sm"}
                            className="border border-base-content/20 p-2"
                            startIcon={<Icon icon={userPlusIcon} className="size-3.5" />}></Button>
                    </Tooltip>
                    <Dropdown end vertical={"bottom"}>
                        <DropdownToggle
                            button={false}
                            className="btn btn-ghost btn-sm border border-base-content/20 p-2">
                            <Icon icon={moreVerticalIcon} className="size-4" />
                        </DropdownToggle>
                        <DropdownMenu className="w-52 text-sm">
                            <DropdownItem anchor={false}>
                                <div>
                                    <Icon icon={squareUserIcon} fontSize={16} className="" />
                                    View Profile
                                </div>
                            </DropdownItem>

                            <DropdownItem anchor={false}>
                                <div>
                                    <Icon icon={pinIcon} fontSize={16} className="" />
                                    Pin
                                </div>
                            </DropdownItem>
                            <DropdownItem anchor={false}>
                                <div>
                                    <Icon icon={bellDotIcon} fontSize={16} className="" />
                                    Mute Notification
                                </div>
                            </DropdownItem>

                            <hr className="-mx-2 my-1 border-base-content/10" />
                            <DropdownItem anchor={false}>
                                <div>
                                    <Icon icon={archiveIcon} fontSize={16} className="" />
                                    Archive
                                </div>
                            </DropdownItem>
                            <DropdownItem className="text-error" anchor={false}>
                                <div>
                                    <Icon icon={trashIcon} fontSize={16} className="" />
                                    Delete Chat
                                </div>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <hr className="border-base-content/10" />
            <SimpleBar className="p-5" style={{ height: "calc(100vh - 312px)" }} ref={ref}>
                {chat.messages.map((message, index) => (
                    <SingleMessage chat={chat} message={message} key={index} />
                ))}
            </SimpleBar>
            <div className={"mt-3"}>
                <MessageInput />
            </div>
            <CallModal />
        </Card>
    );
};
