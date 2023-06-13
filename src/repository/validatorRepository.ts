import { Request } from 'express'
import Joi from 'joi'

const CraftSchema = Joi.object({
  title: Joi.string().min(4).required(),
  description: Joi.string().min(6),
  category: Joi.string(),
  price: Joi.number().required(),
  imageUrl: Joi.string().required(),
  availableQuantity: Joi.number().required(),
})

const OrderSchema = Joi.object({
  customerName: Joi.string().required(),
  contact: Joi.string().required(),
  address: Joi.string().required(),
  orderItems: Joi.array()
    .items(
      Joi.object({
        craftId: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        title: Joi.string().min(4).required(),
        price: Joi.number().required(),
        imageUrl: Joi.string().required(),
      })
    )
    .required(),
})

export const validateCraftJoi = (payload: Request) =>
  CraftSchema.validate(payload, { abortEarly: false })

export const validateOrderJoi = (payload: Request) =>
  OrderSchema.validate(payload, { abortEarly: false })
