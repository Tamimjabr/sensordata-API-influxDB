import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { getSensorData, saveSensorData } from '../../respository/sensor-repository';



export class SensorController {

  async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      // await saveSensorData()
      const data = await getSensorData()
      console.log('inside controller')
      res.status(200).send({
        status: 'success',
        data
      })
    } catch (error: any) {
      if (error.code === 'ENOTFOUND') {
        error = createError(404, 'Not Found')
      }
      next(error)
    }
  }

  async receiveWebhook (req: Request, res: Response, next: NextFunction) {
    try {
      console.log('got sensor data webhook')
      console.log(req.body)
      const { deviceToken, signal, payload } = req.body
      await saveSensorData(
        deviceToken,
        signal,
        payload
      )

      res.status(200).send({
        status: 'success webhook',
      })
    } catch (error: any) {
      if (error.code === 'ENOTFOUND') {
        error = createError(404, 'Not Found')
      }
      next(error)
    }
  }
}