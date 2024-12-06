import product1Img from "@/assets/images/apps/ecommerce/products/1.jpg";
import product2Img from "@/assets/images/apps/ecommerce/products/2.jpg";
import product3Img from "@/assets/images/apps/ecommerce/products/3.jpg";
import avatar8Img from "@/assets/images/avatars/8.png";
import avatar9Img from "@/assets/images/avatars/9.png";

import { dateHelper } from "@/helpers";
import { IEcommerceFullOrder, IEcommerceOrder } from "@/types/apps/ecommerce";

export const _getEcommerceOrders = (): IEcommerceOrder[] => {
    return [
        {
            id: 21001,
            amount: 342,
            customer: "Emily Johnson",
            status: "ordered",
            itemsCount: 5,
            paymentStatus: "paid",
            date: dateHelper.minusMonths(1),
        },

        {
            id: 21002,
            amount: 578,
            customer: "Alex Thompson",
            status: "accepted",
            itemsCount: 3,
            paymentStatus: "paid",
            date: dateHelper.minusMonths(9),
        },

        {
            id: 21003,
            amount: 215,
            customer: "Sarah Davis",
            status: "on_the_way",
            itemsCount: 6,
            paymentStatus: "unpaid",
            date: dateHelper.minusMonths(5),
        },

        {
            id: 21004,
            amount: 769,
            customer: "Michael Wilson",
            status: "delivered",
            itemsCount: 2,
            paymentStatus: "unpaid",
            date: dateHelper.minusMonths(11),
        },

        {
            id: 21005,
            amount: 431,
            customer: "Jessica Miller",
            status: "accepted",
            itemsCount: 7,
            paymentStatus: "paid",
            date: dateHelper.minusMonths(2),
        },

        {
            id: 21006,
            amount: 622,
            customer: "Brian Anderson",
            status: "ordered",
            itemsCount: 1,
            paymentStatus: "paid",
            date: dateHelper.minusMonths(7),
        },

        {
            id: 21007,
            amount: 894,
            customer: "Olivia Smith",
            status: "on_the_way",
            itemsCount: 4,
            paymentStatus: "unpaid",
            date: dateHelper.minusMonths(3),
        },

        {
            id: 21008,
            amount: 156,
            customer: "Daniel Robinson",
            status: "delivered",
            itemsCount: 7,
            paymentStatus: "paid",
            date: dateHelper.minusMonths(8),
        },
        {
            id: 21009,
            amount: 497,
            customer: "Emma Garcia",
            status: "ordered",
            itemsCount: 1,
            paymentStatus: "unpaid",
            date: dateHelper.minusMonths(0),
        },
        {
            id: 21010,
            amount: 783,
            customer: "Christopher Baker",
            status: "accepted",
            itemsCount: 3,
            paymentStatus: "paid",
            date: dateHelper.minusMonths(6),
        },
    ];
};

export const _getEcommerceFullOrder = (): IEcommerceFullOrder => {
    return {
        id: 1002,
        date: new Date(),
        amount: 125,
        status: "ordered",
        paymentStatus: "paid",
        items: [
            {
                id: 1001,
                name: "Men's tracking shoes",
                image: product1Img,
                date: dateHelper.minusDays(1),
                category: "Fashion",
                price: 29,
                stock: 43,
                orders: 10,
                ratings: 4.7,
                ratingsCount: 130,
                sku: "SHOES",
                quantity: 3,
            },
            {
                id: 1002,
                name: "Cocooil body oil",
                image: product2Img,
                date: dateHelper.minusDays(4),
                category: "Daily Need",
                price: 16,
                stock: 35,
                orders: 15,
                ratings: 4.2,
                ratingsCount: 547,
                sku: "COCOOIL",
                quantity: 2,
            },
            {
                id: 1003,
                name: "Freeze air ",
                image: product3Img,
                date: dateHelper.minusDays(9),
                category: "Cosmetic",
                price: 32,
                stock: 43,
                orders: 25,
                ratings: 3.8,
                ratingsCount: 862,
                sku: "FREEAIR",
                quantity: 4,
            },
        ],
        customer: {
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
        payment: {
            status: "unpaid",
            expiryDate: dateHelper.addMonths(8),
            cardNumber: "2487",
        },
        deliveryPartner: {
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
        address: {
            address: "4239 Bloomfield Way",
            city: "Standish",
            country: "ME",
            postalCode: "047842",
        },
        subTotal: 247,
        tax: 44,
        discount: 60,
        total: 231,
    };
};
