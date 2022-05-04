import { Point } from '@influxdata/influxdb-client';
import influxDB from "../config/influxDB"

const client = influxDB.getInstance()
let org = `tamimjabr1995@gmail.com`
let bucket = `SensorData`

export const saveSensorData = async () => {

  let writeClient = await client.getWriteApi(org, bucket, 'ns')

  for (let i = 0; i < 5; i++) {
    let point = new Point('measurement2')
      .tag('tagname1' + i, 'tagvalue1')
      .intField('field1', i)

    await writeClient.writePoint(point)
    const response = await writeClient.flush()
  }

}
//  |> range(start: -30m)

export const getSensorData = async () => {
  const queryApi = client.getQueryApi(org)

  const query = `option v = {timeRangeStart: -1h, timeRangeStop: now()}
  
  from(bucket: "SensorData")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "measurement2")
  |> filter(fn: (r) => r["_field"] == "field1")
  |> filter(fn: (r) => r["tagname10"] == "tagvalue1")`

  return await queryApi.collectRows(query)
}