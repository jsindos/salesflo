import { ChatList } from "./components/ChatList";
import { MessageList } from "./components/MessageList";

const ChatApp = () => {
    return (
        <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-3">
                <ChatList />
            </div>
            <div className="lg:col-span-7 xl:col-span-8 2xl:col-span-9">
                <MessageList />
            </div>
        </div>
    );
};

export { ChatApp };
