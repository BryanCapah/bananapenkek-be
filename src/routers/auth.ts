import express, { Request, Response, NextFunction, Router } from 'express'
import AuthController from '../controllers/AuthControllers'
import AuthValidator from '../middlewares/AuthValidator'

const router: Router = Router()

router.post('/', (req: Request, res: Response) => res.send('from root auth'))
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', AuthValidator.validateToken, AuthController.logout)

export default router
