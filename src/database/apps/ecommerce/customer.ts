import avatar1Img from "@/assets/images/avatars/1.png";
import avatar2Img from "@/assets/images/avatars/2.png";
import avatar3Img from "@/assets/images/avatars/3.png";
import avatar4Img from "@/assets/images/avatars/4.png";
import avatar5Img from "@/assets/images/avatars/5.png";
import avatar6Img from "@/assets/images/avatars/6.png";
import avatar7Img from "@/assets/images/avatars/7.png";
import avatar8Img from "@/assets/images/avatars/8.png";
import avatar9Img from "@/assets/images/avatars/9.png";
import avatar10Img from "@/assets/images/avatars/10.png";

import { dateHelper } from "@/helpers";
import { IEcommerceCustomer } from "@/types/apps/ecommerce";

export const _getEcommerceCustomers = (): IEcommerceCustomer[] => {
    return [
        {
            id: 1,
            name: "James S. Jackson",
            image: avatar1Img,
            email: "james.jack@mail.com",
            gender: "male",
            purchases: 24,
            spend: 405,
            date: dateHelper.minusMonths(3),
            verified: true,
            mobileNumber: "845-346-8004",
        },
        {
            id: 2,
            name: "Nancy J. Schlueter",
            image: avatar2Img,
            email: "nancy.schlueter@mail.com",
            gender: "female",
            purchases: 21,
            spend: 630,
            date: dateHelper.minusMonths(4),
            verified: true,
            mobileNumber: "703-776-8514",
        },
        {
            id: 3,
            name: "Anthony J. Lew",
            image: avatar3Img,
            email: "anthony_lew@mail.com",
            gender: "male",
            purchases: 68,
            spend: 1241,
            date: dateHelper.minusMonths(2),
            verified: false,
            mobileNumber: "864-215-2686",
        },
        {
            id: 4,
            name: "Amanda M. Kyle",
            image: avatar4Img,
            email: "amanda_kyle@mail.com",
            gender: "female",
            purchases: 43,
            spend: 648,
            date: dateHelper.minusMonths(1),
            verified: true,
            mobileNumber: "253-565-3114",
        },
        {
            id: 5,
            name: "Chad J. Pipkin",
            image: avatar5Img,
            email: "chadpip007@mail.com",
            gender: "male",
            purchases: 17,
            spend: 357,
            date: dateHelper.minusYears(2),
            verified: false,
            mobileNumber: "562-212-5847",
        },
        {
            id: 6,
            name: "Crystal P. Deberry",
            image: avatar6Img,
            email: "crystal_deberry@mail.com",
            gender: "female",
            purchases: 49,
            spend: 354,
            date: dateHelper.minusMonths(7),
            verified: true,
            mobileNumber: "520-398-7428",
        },
        {
            id: 7,
            name: "Herman K. Byard",
            image: avatar7Img,
            email: "herman_byard@mail.com",
            gender: "male",
            purchases: 47,
            spend: 358,
            date: dateHelper.minusMonths(8),
            verified: true,
            mobileNumber: "248-376-5482",
        },
        {
            id: 8,
            name: "Patricia T. Gandy",
            image: avatar8Img,
            email: "pat.gandy@mail.com",
            gender: "female",
            purchases: 78,
            spend: 1547,
            date: dateHelper.minusMonths(5),
            verified: true,
            mobileNumber: "707-237-9941",
        },
        {
            id: 9,
            name: "James J. Herron",
            image: avatar9Img,
            email: "james@mail.com",
            gender: "male",
            purchases: 54,
            spend: 1080,
            date: dateHelper.minusMonths(9),
            verified: true,
            mobileNumber: "262-726-6322",
        },
        {
            id: 10,
            name: "Gladys J. Tudor",
            image: avatar10Img,
            email: "tudor_jgladys@mail.com",
            gender: "female",
            purchases: 48,
            spend: 1280,
            date: dateHelper.minusMonths(7),
            verified: true,
            mobileNumber: "508-975-1756",
        },
    ];
};

export const _getEcommerceCustomerById = (id: IEcommerceCustomer["id"]) => {
    return _getEcommerceCustomers().find((p) => p.id === id);
};
