import StatisticsService from "@services/statistics.service";
import { NextFunction, Request, Response } from "express";

export default class StatisticsController {
  private statisticsService = new StatisticsService();
  async listLogs(req: Request, res: Response, next: NextFunction) {
    try {
      let limit = Number(req.query.limit || 10);
      let page = Number(req.query.page || 1);

      let data = await this.statisticsService.listLogs({
        paginate: { page, limit },
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }
}
