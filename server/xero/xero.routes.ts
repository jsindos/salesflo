import { Router } from "express";
const router = Router();

import db from "../db";
import upload from "../uploadConfig";
import { enhanceClass } from "../utility";
import XeroController from "./xero.controller";

const controller = new XeroController(db);

enhanceClass(controller);

router.post(
  "/upload/files",
  upload.fields([
    { name: "thisweeksquare", maxCount: 1 },
    { name: "contacts", maxCount: 1 },
  ]),
  controller.uploadFiles
);

router.get("/connections", controller.getConnections);
router.post("/purchase_orders_test", controller.createPurchaseOrdersTest);
router.post("/purchase_orders", controller.createPurchaseOrders);
router.get("/contacts", controller.getContacts);
router.get("/branding_themes", controller.getBrandingThemes);
router.post("/items", controller.createItem);
router.get("/items", controller.getItems);

export default router;
