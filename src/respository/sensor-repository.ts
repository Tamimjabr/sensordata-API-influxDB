import { Point } from '@influxdata/influxdb-client';
import influxDB from "../config/influxDB"

const client = influxDB.getInstance()
const org = process.env.INFLUXDB_ORG
const bucket = `MotionSensor`

export const saveSensorData = async (deviceToken: string, signal: string, payload: string) => {
  let writeClient = await client.getWriteApi(org, bucket, 'ns')
  let point = new Point('motion')
    .tag('sensor_id', deviceToken).floatField('value', signal).stringField('payload', payload)

  await writeClient.writePoint(point)
  await writeClient.flush()
}


export const getSensorData = async () => {
  const queryApi = client.getQueryApi(org)

  const query = `option v = {timeRangeStart: -30d, timeRangeStop: now()}
  
  from(bucket: "MotionSensor")
	|> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "motion")
  |> filter(fn: (r) => r["_field"] == "value")
  |> filter(fn: (r) => r["sensor_id"] == "a54e105d-4c8e-4e2a-9ce8-bf31b6299aab")`

  return await queryApi.collectRows(query)
}