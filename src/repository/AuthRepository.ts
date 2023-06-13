import bcrypt from 'bcrypt'
import { User, IUser } from '../models/User'

class AuthRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec()
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hashedPassword })
    return user.save()
  }
}

export default new AuthRepository()
