import avatar2Img from "@/assets/images/avatars/2.png";
import avatar3Img from "@/assets/images/avatars/3.png";
import avatar4Img from "@/assets/images/avatars/4.png";
import avatar5Img from "@/assets/images/avatars/5.png";
import avatar6Img from "@/assets/images/avatars/6.png";
import avatar7Img from "@/assets/images/avatars/7.png";
import avatar8Img from "@/assets/images/avatars/8.png";

import { dateHelper } from "@/helpers";
import { IChat } from "@/types/apps/chat";

const getChats = (): IChat[] => {
    return [
        {
            id: 1,
            image: avatar2Img,
            name: "Debra C. Glen",
            unreads: 2,
            messages: [
                {
                    message: "Conversation Started",
                    sendAt: dateHelper.minusMinutes(200),
                    fromMe: false,
                },
                {
                    message: "Hey, how's it going?",
                    sendAt: dateHelper.minusMinutes(140),
                    fromMe: false,
                },
                {
                    message: "I'm doing well, thanks! How about you?",
                    sendAt: dateHelper.minusMinutes(100),
                    fromMe: true,
                },
                {
                    message: "Just finished a great book. Have any recommendations?",
                    sendAt: dateHelper.minusMinutes(54),
                    fromMe: false,
                },
                {
                    message: "That's awesome! I'd recommend 'The Silent Observer.'",
                    sendAt: dateHelper.minusMinutes(40),
                    fromMe: true,
                },
                {
                    message: "Thanks! I'll check it out.",
                    sendAt: dateHelper.minusMinutes(35),
                    fromMe: false,
                },
                {
                    message: "Did you catch the latest movie? It's fantastic!",
                    sendAt: dateHelper.minusMinutes(25),
                    fromMe: true,
                },
                {
                    message: "No, I haven't. What's the title?",
                    sendAt: dateHelper.minusMinutes(15),
                    fromMe: false,
                },
                {
                    message: "It's called 'Dreamscape.' A must-watch!",
                    sendAt: dateHelper.minusMinutes(5),
                    fromMe: true,
                },
                {
                    message: "Sounds intriguing. I'll add it to my watchlist.",
                    sendAt: dateHelper.minusMinutes(2),
                    fromMe: false,
                },
                {
                    message: "Great! Let me know what you think after watching.",
                    sendAt: dateHelper.minusMinutes(0),
                    fromMe: true,
                },
            ],
        },
        {
            id: 2,

            image: avatar3Img,
            name: "Gary N. Roache",
            messages: [
                {
                    message: "I just finished a great workout!",
                    sendAt: dateHelper.minusMinutes(140),
                    fromMe: false,
                },
                {
                    message: "Has anyone seen my keys?",
                    sendAt: dateHelper.minusMinutes(100),
                    fromMe: true,
                },
                {
                    message: "What's for dinner tonight?",
                    sendAt: dateHelper.minusMinutes(54),
                    fromMe: false,
                },
                {
                    message: "I can't believe it's almost the weekend!",
                    sendAt: dateHelper.minusMinutes(40),
                    fromMe: true,
                },
                {
                    message: "Just got a new book. Excited to start reading.",
                    sendAt: dateHelper.minusMinutes(35),
                    fromMe: false,
                },
                {
                    message: "Looking forward to the upcoming vacation!",
                    sendAt: dateHelper.minusMinutes(25),
                    fromMe: true,
                },
                {
                    message: "Any recommendations for a good movie?",
                    sendAt: dateHelper.minusMinutes(15),
                    fromMe: false,
                },
                {
                    message: "Just adopted a cute puppy! Meet Max.",
                    sendAt: dateHelper.minusMinutes(5),
                    fromMe: true,
                },
                {
                    message: "Enjoying a quiet evening with some music.",
                    sendAt: dateHelper.minusMinutes(2),
                    fromMe: false,
                },
                {
                    message: "Yeah",
                    sendAt: dateHelper.minusMinutes(0),
                    fromMe: true,
                },
            ],
        },
        {
            id: 3,

            image: avatar4Img,
            name: "Roberta K. Simons",
            messages: [
                {
                    message: "Hey there!",
                    sendAt: dateHelper.minusMinutes(140),
                    fromMe: false,
                },
                {
                    message: "How's your day going?",
                    sendAt: dateHelper.minusMinutes(100),
                    fromMe: true,
                },
                {
                    message: "Did you catch the latest news?",
                    sendAt: dateHelper.minusMinutes(54),
                    fromMe: false,
                },
                {
                    message: "I'm planning a weekend getaway. Any suggestions?",
                    sendAt: dateHelper.minusMinutes(40),
                    fromMe: true,
                },
                {
                    message: "Just tried a new recipe. Turned out delicious!",
                    sendAt: dateHelper.minusMinutes(35),
                    fromMe: false,
                },
                {
                    message: "Looking forward to the weekend. Any exciting plans?",
                    sendAt: dateHelper.minusMinutes(25),
                    fromMe: true,
                },
                {
                    message: "Have you seen the new movie everyone is talking about?",
                    sendAt: dateHelper.minusMinutes(15),
                    fromMe: false,
                },
            ],
        },
        {
            id: 4,

            image: avatar5Img,
            name: "Michael S. Gillen",
            messages: [
                {
                    message: "Hey, what's up?",
                    sendAt: dateHelper.minusMinutes(140),
                    fromMe: false,
                },
                {
                    message: "Did you catch the game last night?",
                    sendAt: dateHelper.minusMinutes(100),
                    fromMe: true,
                },
                {
                    message: "Thinking of trying a new recipe for dinner.",
                    sendAt: dateHelper.minusMinutes(54),
                    fromMe: false,
                },
                {
                    message: "Just finished a great workout at the gym.",
                    sendAt: dateHelper.minusMinutes(40),
                    fromMe: true,
                },
                {
                    message: "Planning a weekend getaway. Any suggestions?",
                    sendAt: dateHelper.minusMinutes(35),
                    fromMe: false,
                },
                {
                    message: "Excited about the upcoming project at work.",
                    sendAt: dateHelper.minusMinutes(25),
                    fromMe: true,
                },
                {
                    message: "Looking forward to the weekend. Any fun plans?",
                    sendAt: dateHelper.minusMinutes(15),
                    fromMe: false,
                },
            ],
        },
        {
            id: 5,

            image: avatar6Img,
            name: "Pamela W. Boggess",
            messages: [
                {
                    message: "Hey there! How's your day going?",
                    sendAt: dateHelper.minusMinutes(140),
                    fromMe: false,
                },
                {
                    message: "Just wanted to say hi and catch up.",
                    sendAt: dateHelper.minusMinutes(100),
                    fromMe: true,
                },
                {
                    message: "Any exciting plans for the weekend?",
                    sendAt: dateHelper.minusMinutes(54),
                    fromMe: false,
                },
                {
                    message: "Have you tried the new restaurant downtown?",
                    sendAt: dateHelper.minusMinutes(40),
                    fromMe: true,
                },
                {
                    message: "Thinking of starting a new hobby. Any suggestions?",
                    sendAt: dateHelper.minusMinutes(35),
                    fromMe: false,
                },
                {
                    message: "Did you see that amazing sunset yesterday?",
                    sendAt: dateHelper.minusMinutes(25),
                    fromMe: true,
                },
                {
                    message: "Found a great podcast - 'Mindful Moments.' Highly recommend!",
                    sendAt: dateHelper.minusMinutes(15),
                    fromMe: false,
                },
            ],
        },
        {
            id: 6,

            image: avatar7Img,
            name: "Troy G. Ward",
            messages: [
                {
                    message: "How's your day going?",
                    sendAt: dateHelper.minusMinutes(140),
                    fromMe: false,
                },
                {
                    message: "Just finished a great workout!",
                    sendAt: dateHelper.minusMinutes(100),
                    fromMe: true,
                },
                {
                    message: "Any plans for the weekend?",
                    sendAt: dateHelper.minusMinutes(54),
                    fromMe: false,
                },
                {
                    message: "What's your favorite hobby?",
                    sendAt: dateHelper.minusMinutes(40),
                    fromMe: true,
                },
                {
                    message: "Excited for the upcoming holidays!",
                    sendAt: dateHelper.minusMinutes(35),
                    fromMe: false,
                },
                {
                    message: "Trying out a new recipe for dinner tonight.",
                    sendAt: dateHelper.minusMinutes(25),
                    fromMe: true,
                },
                {
                    message: "Any book recommendations",
                    sendAt: dateHelper.minusMinutes(15),
                    fromMe: false,
                },
            ],
        },
        {
            id: 7,

            image: avatar8Img,
            name: "Alicia W. Calvillo",
            messages: [
                {
                    message: "Hey, how's it going?",
                    sendAt: dateHelper.minusMinutes(140),
                    fromMe: false,
                },
                {
                    message: "I just finished a great workout!",
                    sendAt: dateHelper.minusMinutes(100),
                    fromMe: true,
                },
                {
                    message: "Did you watch the latest episode of that show?",
                    sendAt: dateHelper.minusMinutes(54),
                    fromMe: false,
                },
                {
                    message: "What's your favorite hobby?",
                    sendAt: dateHelper.minusMinutes(40),
                    fromMe: true,
                },
                {
                    message: "Excited for the weekend plans!",
                    sendAt: dateHelper.minusMinutes(35),
                    fromMe: false,
                },
                {
                    message: "Any good book recommendations?",
                    sendAt: dateHelper.minusMinutes(25),
                    fromMe: true,
                },
                {
                    message: "Just tried a new recipe. It turned out amazing!",
                    sendAt: dateHelper.minusMinutes(15),
                    fromMe: false,
                },
            ],
        },
    ];
};

export const dummyChatData = {
    chats: getChats,
};
