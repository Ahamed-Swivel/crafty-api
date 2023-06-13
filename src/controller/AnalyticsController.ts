import { Request, Response } from 'express'

import logger from '../logger'
import AnalyticRepository from '../repository/AnalyticRepository'

class AnalyticController {
  public async getAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const order = await new AnalyticRepository().getAnalytics()
      res.status(201).send(order)
    } catch (error) {
      logger.error(error)
      res.status(400).send(error)
    }
  }
}

export default new AnalyticController()
