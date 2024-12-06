import product1Img from "@/assets/images/apps/ecommerce/products/1.jpg";
import product2Img from "@/assets/images/apps/ecommerce/products/2.jpg";
import product3Img from "@/assets/images/apps/ecommerce/products/3.jpg";
import product4Img from "@/assets/images/apps/ecommerce/products/4.jpg";
import product5Img from "@/assets/images/apps/ecommerce/products/5.jpg";
import product6Img from "@/assets/images/apps/ecommerce/products/6.jpg";
import product7Img from "@/assets/images/apps/ecommerce/products/7.jpg";
import product8Img from "@/assets/images/apps/ecommerce/products/8.jpg";
import product9Img from "@/assets/images/apps/ecommerce/products/9.jpg";
import product10Img from "@/assets/images/apps/ecommerce/products/10.jpg";
import product11Img from "@/assets/images/apps/ecommerce/products/11.jpg";

import { dateHelper } from "@/helpers";
import { IEcommerceProduct, IEcommerceProductCategory } from "@/types/apps/ecommerce";

export const _getEcommerceProducts = (): IEcommerceProduct[] => {
    return [
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
        },
        {
            id: 1004,
            name: "Ladies's shoes",
            image: product4Img,
            date: dateHelper.minusDays(3),
            category: "Fashion",
            price: 32,
            stock: 0,
            orders: 10,
            ratings: 2.9,
            ratingsCount: 861,
            sku: "LASHOES",
        },
        {
            id: 1005,
            name: "Gamepad",
            image: product5Img,
            date: dateHelper.minusDays(6),
            category: "Electronics",
            price: 59,
            stock: 48,
            orders: 42,
            ratings: 4.1,
            ratingsCount: 96,
            sku: "GAMEPAD",
        },
        {
            id: 1006,
            name: "Blue & Pink Clothes",
            image: product6Img,
            date: dateHelper.minusDays(4),
            category: "Fashion",
            price: 27,
            stock: 36,
            orders: 31,
            ratings: 4.24,
            ratingsCount: 72,
            sku: "BPCloth",
        },
        {
            id: 1007,
            name: "Ladies's shorts wear",
            image: product7Img,
            date: dateHelper.minusDays(3),
            category: "Fashion",
            price: 24,
            stock: 21,
            orders: 42,
            ratings: 3.5,
            ratingsCount: 48,
            sku: "LSWEAR",
        },
        {
            id: 1008,
            name: "Kitchen's Fruits & Vegetable",
            image: product8Img,
            date: dateHelper.minusDays(1),
            category: "Food",
            price: 45,
            stock: 12,
            orders: 36,
            ratings: 2.7,
            ratingsCount: 54,
            sku: "KFVEGE",
        },
        {
            id: 1009,
            name: "Quokka Lemon Water",
            image: product9Img,
            date: dateHelper.minusDays(7),
            category: "Food",
            price: 7,
            stock: 35,
            orders: 27,
            ratings: 4.1,
            ratingsCount: 64,
            sku: "QUOKKA",
        },
        {
            id: 1010,
            name: "White & Brown Candy",
            image: product10Img,
            date: dateHelper.minusDays(9),
            category: "Food",
            price: 14,
            stock: 0,
            orders: 42,
            ratings: 3.6,
            ratingsCount: 84,
            sku: "CANDY",
        },
        {
            id: 1011,
            name: "Yellow Ice cream",
            image: product11Img,
            date: dateHelper.minusDays(5),
            category: "Food",
            price: 15,
            stock: 26,
            orders: 31,
            ratings: 4.9,
            ratingsCount: 52,
            sku: "ICECREAM",
        },
    ];
};
export const _getEcommerceProductCategories = (): IEcommerceProductCategory[] => {
    return [
        { title: "Fashion", id: "Fashion" },
        { title: "Daily Need", id: "Daily Need" },
        { title: "Cosmetic", id: "Cosmetic" },
        { title: "Electronics", id: "Electronics" },
        { title: "Food", id: "Food" },
    ];
};

export const _getEcommerceProductById = (id: IEcommerceProduct["id"]) => {
    return _getEcommerceProducts().find((p) => p.id === id);
};
