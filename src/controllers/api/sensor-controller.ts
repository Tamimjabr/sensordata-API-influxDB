import { NextFunction, Request, Response } from 'express';


export class SensorController {


  async getAll (req: Request, res: Response, next: NextFunction) {
    try {

      res.send({
        status: 'success',
      })
    } catch (error) {
      next(error)
    }
  }

}