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
import { IEcommerceSeller } from "@/types/apps/ecommerce";

export const _getEcommerceSellers = (): IEcommerceSeller[] => {
    return [
        {
            id: 1,
            name: "Anthony S. Amaya",
            image: avatar9Img,
            email: "antho.am@yahoo.com",
            gender: "male",
            sales: 20,
            earning: 350,
            date: dateHelper.minusMonths(3),
            verified: true,
            mobileNumber: "402-788-1602",
            shopName: "Urban Chic Boutique",
        },
        {
            id: 2,
            name: "Crystal R. Taylor",
            image: avatar10Img,
            email: "crystal_taylor@hotmail.com",
            gender: "female",
            sales: 24,
            earning: 360,
            date: dateHelper.minusMonths(2),
            verified: false,
            mobileNumber: "469-632-2611",
            shopName: "Whimsical Wares Emporium",
        },
        {
            id: 3,
            name: "Jeremy M. Simon",
            image: avatar7Img,
            email: "jer.sim@gmail.com",
            gender: "male",
            sales: 34,
            earning: 574,
            date: dateHelper.minusMonths(7),
            verified: true,
            mobileNumber: "207-538-1345",
            shopName: "Serene Styles Haven",
        },
        {
            id: 4,
            name: "Jane B. Bush",
            image: avatar8Img,
            email: "jane@bush.com",
            gender: "female",
            sales: 54,
            earning: 487,
            date: dateHelper.minusMonths(5),
            verified: true,
            mobileNumber: "612-326-9186",
            shopName: "Posh Picks Boutique",
        },
        {
            id: 5,
            name: "Francis A. Bisson",
            image: avatar5Img,
            email: "francis.biss@outlook.com",
            gender: "male",
            sales: 67,
            earning: 784,
            date: dateHelper.minusMonths(6),
            verified: true,
            mobileNumber: "317-949-1232",
            shopName: "Blissful Finds Co.",
        },
        {
            id: 6,
            name: "Lydia P. Barnett",
            image: avatar6Img,
            email: "lydia.p@mail.com",
            gender: "female",
            sales: 74,
            earning: 657,
            date: dateHelper.minusYears(1),
            verified: false,
            mobileNumber: "936-895-2100",
            shopName: "Trendy Threads Emporium",
        },
        {
            id: 7,
            name: "John B. Lopez",
            image: avatar3Img,
            email: "john@lopez.com",
            gender: "male",
            sales: 45,
            earning: 354,
            date: dateHelper.minusMonths(11),
            verified: true,
            mobileNumber: "262-849-4319",
            shopName: "Luxe Loft Creations",
        },
        {
            id: 8,
            name: "Detra M. Rogers",
            image: avatar4Img,
            email: "detra@rogers.com",
            gender: "female",
            sales: 21,
            earning: 352,
            date: dateHelper.minusMonths(6),
            verified: true,
            mobileNumber: "847-452-0238",
            shopName: "Vintage Vogue Hub",
        },
        {
            id: 9,
            name: "Antonio D. Goss",
            image: avatar1Img,
            email: "goss@ant.com",
            gender: "male",
            sales: 29,
            earning: 920,
            date: dateHelper.minusMonths(14),
            verified: false,
            mobileNumber: "203-250-6265",
            shopName: "Coastal Charm Marketplace",
        },
        {
            id: 10,
            name: "Brenda R. Holmes",
            image: avatar2Img,
            email: "brenda.holmes@mail.com",
            gender: "female",
            sales: 67,
            earning: 874,
            date: dateHelper.minusMonths(15),
            verified: true,
            mobileNumber: "325-480-1291",
            shopName: "Dapper Designs Depot",
        },
    ];
};

export const _getEcommerceSellerById = (id: IEcommerceSeller["id"]) => {
    return _getEcommerceSellers().find((s) => s.id === id);
};
