import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import AuthRepository from '../repository/AuthRepository'
import config from '../config'
import logger from '../logger'

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    try {
      // Find admin user by email
      const admin = await AuthRepository.findByEmail(email)

      if (!admin) {
        res.status(401).json({ message: 'Invalid email or password' })
        return
      }

      // Compare passwords
      const isPasswordValid = await AuthRepository.comparePasswords(
        password,
        admin.password
      )

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid email or password' })
        return
      }

      // Generate JWT token
      const token = jwt.sign({ email: admin.email }, config.jwtSecret)

      res.status(200).json({
        token,
        name: admin.name,
        email: admin.email,
      })
    } catch (error) {
      logger.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  async signup(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body

    try {
      // Check if user already exists
      const existingUser = await AuthRepository.findByEmail(email.toString())

      if (existingUser) {
        res.status(409).json({ message: 'User already exists' })
        return
      }

      // Create new user
      const newUser = await AuthRepository.createUser(name, email, password)

      res.status(201).json({
        message: 'User registered successfully',
        user: newUser,
      })
    } catch (error) {
      logger.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

export default new AuthController()
