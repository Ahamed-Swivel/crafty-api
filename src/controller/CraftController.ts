import { Request, Response } from 'express'

import logger from '../logger'
import CraftRepository from '../repository/CraftRepository'

class CraftController {
  public async createCraft(req: Request, res: Response): Promise<void> {
    try {
      const craft = await new CraftRepository().createCraft(req.body)
      res.status(201).send(craft)
    } catch (error) {
      logger.error(error)
      res.status(400).send(error)
    }
  }

  public async getCrafts(req: Request, res: Response): Promise<void> {
    try {
      const crafts = await new CraftRepository().getCrafts()
      res.status(200).send(crafts)
    } catch (error) {
      logger.error(error)
      res.status(500).send(error)
    }
  }

  public async getCraftById(req: Request, res: Response): Promise<void> {
    try {
      const { itemId } = req.params
      const craft = await new CraftRepository().getCraftById(itemId)

      if (!craft) {
        res.status(404).send('Craft not found')
      } else {
        res.status(200).send(craft)
      }
    } catch (error) {
      logger.error(error)
      res.status(500).send(error)
    }
  }

  public async disableCraft(req: Request, res: Response): Promise<void> {
    try {
      const { itemId } = req.params
      const craft = await new CraftRepository().disableCraft(itemId)

      if (!craft) {
        res.status(404).send('Craft not found')
      } else {
        res.status(200).send(craft)
      }
    } catch (error) {
      logger.error(error)
      res.status(500).send(error)
    }
  }

  public async updateCraftId(req: Request, res: Response): Promise<void> {
    try {
      const { itemId } = req.params
      const craft = await new CraftRepository().updateCraftById(
        itemId,
        req.body
      )

      if (!craft) {
        res.status(404).json({ message: 'Craft not found' })
      } else {
        res.status(200).json(craft)
      }
    } catch (error) {
      logger.error(error)
      res.status(500).send(error)
    }
  }
}

export default new CraftController()
