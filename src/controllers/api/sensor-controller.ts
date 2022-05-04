import { NextFunction, Request, Response } from 'express';
import { saveSensorData } from '../../respository/sensor-repository';



export class SensorController {


  async getAll (req: Request, res: Response, next: NextFunction) {
    try {

      await saveSensorData()

      res.status(200).send({
        status: 'success',
      })
    } catch (error) {
      console.log('hafdsfhoasdhfoiahsodfihasodfh &&&&&&&&&&&&&&&&&&&&&&&$$$$$$$$$$$$$$$$$$$')
      next(error)
    }
  }

}