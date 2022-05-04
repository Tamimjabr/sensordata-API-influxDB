import { Point } from '@influxdata/influxdb-client';
import influxDB from "../config/influxDB"

const client = influxDB.getInstance()

export const saveSensorData = async () => {
  let org = `tamimjabr1995@gmail.com`
  let bucket = `SensorData`

  let writeClient = await client.getWriteApi(org, bucket, 'ns')

  for (let i = 0; i < 5; i++) {
    let point = new Point('measurement2')
      .tag('tagname1' + i, 'tagvalue1')
      .intField('field1', i)

    await writeClient.writePoint(point)



    await writeClient.flush().then(() => {
      console.log('WRITE FINISHED')
    }).catch((err: any) => {

      console.log('WRITE ERROR', err)
      throw new Error('wtf')
    })

  }

}