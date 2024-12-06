import { DB } from "~/db";

const { AuthenticationError } = require("apollo-server-core");

export default class XeroController {
  private db: DB;

  constructor(db) {
    this.db = db;
  }

  async uploadFiles(req, res) {
    if (!req.files) {
      return res.sendStatus(400);
    }
    res.sendStatus(201);
  }

  async getConnections(req, res) {
    if (!req.user) throw new AuthenticationError();
    const response = await this.db.services.XeroService.getConnections(req.user);
    return res.send(response);
  }

  async createPurchaseOrders(req, res) {
    if (!req.user) throw new AuthenticationError();

    const { isCreatingPurchaseOrders, reference, brandingThemeId } = req.body;

    // Set appropriate headers for text streaming
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    await this.db.services.XeroService.createPurchaseOrders(
      req.user,
      reference,
      isCreatingPurchaseOrders,
      brandingThemeId,
      res
    );
  }

  async createPurchaseOrdersTest(req, res) {
    if (!req.user) throw new AuthenticationError();

    const { isCreatingPurchaseOrders, reference, brandingThemeId } = req.body;

    // Set appropriate headers for text streaming
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    await this.db.services.XeroService.createPurchaseOrdersTest(
      req.user,
      reference,
      isCreatingPurchaseOrders,
      brandingThemeId,
      res
    );
  }

  async getContacts(req, res) {
    if (!req.user) throw new AuthenticationError();
    const response = await this.db.services.XeroService.getContacts(req.user);
    return res.send(response);
  }

  async getBrandingThemes(req, res) {
    if (!req.user) throw new AuthenticationError();
    const response = await this.db.services.XeroService.getBrandingThemes(req.user);
    return res.send(response);
  }

  async createItem(req, res) {
    if (!req.user) throw new AuthenticationError();
    const response = await this.db.services.XeroService.createTestItem(req.user);
    return res.send(response);
  }

  async getItems(req, res) {
    if (!req.user) throw new AuthenticationError();
    const response = await this.db.services.XeroService.getItems(req.user);
    return res.send(response);
  }
}
