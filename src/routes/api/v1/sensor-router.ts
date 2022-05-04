import express, { Request, Response, NextFunction } from 'express'
import { SensorController } from '../../../controllers/api/sensor-controller'

export const router = express.Router()

const controller = new SensorController()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  controller.getAll(req, res, next)
})