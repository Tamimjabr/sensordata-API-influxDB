import express, { Request, Response, NextFunction } from 'express'
import { router as currencyRouter } from './sensor-router'

export const router = express.Router()

router.get('/', (req: Request, res: Response, next: NextFunction) =>
  res.json({
    message: 'Welcome to My API 🤗'
  })
)
router.use('/sensors', currencyRouter)
// router.use('/coins/planetwatch', currencyRouter)

