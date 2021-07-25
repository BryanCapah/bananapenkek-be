import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { user } from '../controllers/AuthControllers'

class PasswordHash {
    public static hash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10)
    }

    public static compare = (password: string, hashed: string): Promise<boolean> => {
        return bcrypt.compare(password, hashed)
    }

    public static generateToken = (user: user): string => {
        const key: string = process.env.JWT_KEY || 'secret'
        const { id, username, password } = user
        const token: string = jwt.sign({ id, username, password }, key, {
            expiresIn: '1d'
        })
        return token
    }
}

export default PasswordHash