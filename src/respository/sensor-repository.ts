import { Point } from '@influxdata/influxdb-client';
import moment from 'moment';
import influxDB from "../config/influxDB"

const client = influxDB.getInstance()
let org = `tamimjabr1995@gmail.com`
let bucket = `MotionSensor`

export const saveSensorData = async (deviceToken: string, signal: string, payload: string) => {

  //todo add the sensor token
  let writeClient = await client.getWriteApi(org, bucket, 'ns')
  let point = new Point('motion')
    .tag('sensor_id', deviceToken).floatField('value', signal).stringField('payload', payload)

  await writeClient.writePoint(point)
  const response = await writeClient.flush()
}


export const getSensorData = async () => {
  const queryApi = client.getQueryApi(org)

  const query = `option v = {timeRangeStart: -30d, timeRangeStop: now()}
  
  from(bucket: "MotionSensor")
	|> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "motion")
  |> filter(fn: (r) => r["_field"] == "value")`

  return await queryApi.collectRows(query)
}