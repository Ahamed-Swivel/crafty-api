import { Request, Response, NextFunction } from 'express'
import {
  validateCraftJoi,
  validateOrderJoi,
} from '../repository/validatorRepository'

const validateCraft = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { error } = validateCraftJoi(req.body)

  if (error) {
    return res.status(400).send(error.details)
  }

  next()
}

const validateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { error } = validateOrderJoi(req.body)

  if (error) {
    return res.status(400).send(error.details)
  }

  next()
}

export { validateCraft, validateOrder }
