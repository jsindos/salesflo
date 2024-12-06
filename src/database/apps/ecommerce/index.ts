import { _getEcommerceCustomerById, _getEcommerceCustomers } from "./customer";
import { _getEcommerceFullOrder, _getEcommerceOrders } from "./order";
import { _getEcommerceProductById, _getEcommerceProductCategories, _getEcommerceProducts } from "./product";
import { _getEcommerceSellerById, _getEcommerceSellers } from "./seller";
import { _getEcommerceShopById, _getEcommerceShops } from "./shop";

export const dummyEcommerceData = {
    getProducts: _getEcommerceProducts,
    getProductById: _getEcommerceProductById,
    getProductCategories: _getEcommerceProductCategories,
    getSellers: _getEcommerceSellers,
    getSellerById: _getEcommerceSellerById,
    getShops: _getEcommerceShops,
    getShopById: _getEcommerceShopById,
    getCustomers: _getEcommerceCustomers,
    getCustomerById: _getEcommerceCustomerById,
    getOrders: _getEcommerceOrders,
    getFullOrder: _getEcommerceFullOrder,
};
