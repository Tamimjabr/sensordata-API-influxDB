import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { saveSensorData } from '../../respository/sensor-repository';



export class SensorController {


  async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      await saveSensorData()
      res.status(200).send({
        status: 'success',
      })
    } catch (error: any) {
      if (error.code === 'ENOTFOUND') {
        error = createError(404, 'Not Found')
      }
      next(error)
    }
  }

}