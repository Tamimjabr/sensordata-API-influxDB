import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';

export const authorizeWebhook = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    next(createError(401, 'Unauthorized'))
    return
  }
  // base64 decode auth header
  const authHeaderDecoded = Buffer.from(authHeader.split(' ')[1], 'base64').toString()
  // split auth header into username and password
  const authHeaderSplit = authHeaderDecoded.split(':')
  // get username and password
  const username = authHeaderSplit[0]
  const password = authHeaderSplit[1]
  // check if username and password are correct
  if (username !== process.env.PYBYTES_WEBHOOK_USERNAME || password !== process.env.PYBYTES_WEBHOOK_PASSWORD) {
    next(createError(401, 'Unauthorized'))
    return
  }
  next()
}

